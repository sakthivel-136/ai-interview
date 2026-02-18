'use client'

import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface AuthContextType {
    user: User | null
    session: Session | null
    isLoading: boolean
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Key stored in sessionStorage (cleared automatically when tab closes)
const TAB_KEY = 'vantage_tab_alive'

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const supabase = createClient()
    const didSignOutOnOpen = useRef(false)

    useEffect(() => {
        // ── Step 1: Check if this is a fresh tab open (not a page refresh) ──
        // sessionStorage is per-tab and is wiped when the tab is closed.
        // On a page refresh, sessionStorage survives, so TAB_KEY will be present.
        // On a brand-new tab open, sessionStorage is empty → TAB_KEY is absent.
        const isTabAlive = sessionStorage.getItem(TAB_KEY)

        if (!isTabAlive && !didSignOutOnOpen.current) {
            // Fresh tab open — clear any stale session from localStorage
            didSignOutOnOpen.current = true
            supabase.auth.signOut().then(() => {
                setUser(null)
                setSession(null)
                setIsLoading(false)
            })
        }

        // Mark this tab as alive — survives refreshes but not tab close
        sessionStorage.setItem(TAB_KEY, '1')
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        // ── Step 2: Subscribe to auth state changes ──
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, newSession) => {
                setSession(newSession)
                setUser(newSession?.user ?? null)
                setIsLoading(false)

                if (event === 'SIGNED_OUT') {
                    router.push('/login')
                }
            }
        )

        return () => subscription.unsubscribe()
    }, [router, supabase])

    const signOut = async () => {
        sessionStorage.removeItem(TAB_KEY)
        await supabase.auth.signOut()
        router.push('/login')
    }

    return (
        <AuthContext.Provider value={{ user, session, isLoading, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
