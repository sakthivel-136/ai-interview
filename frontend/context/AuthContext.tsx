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
    const [isTabVerified, setIsTabVerified] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        // ── Step 1: Check if this is a fresh tab open vs. page refresh ──
        // sessionStorage is per-tab and wiped on close.
        // localStorage (Supabase) persists forever.
        // We only want to keep the session if it's a REFRESH (tab was already alive).

        const checkTabStatus = async () => {
            const isAlive = sessionStorage.getItem(TAB_KEY)

            if (!isAlive) {
                // Case A: Fresh Tab Open
                // Even if Supabase has a token in localStorage, we must kill it
                // because usage specs say "close tab = logout".

                // Force full cleanup to prevent any "Enter Dashboard" buttons from showing
                console.log("🔒 Security: Fresh tab detected. Wiping session.")

                // 1. Tell Supabase to sign out
                await supabase.auth.signOut()

                // 2. NUCLEAR OPTION: Clear localStorage manually to be 100% sure
                // This guarantees getSession() returns null in the next step
                if (typeof window !== 'undefined') {
                    window.localStorage.clear()
                }
            }

            // Case B: Page Refresh (isAlive exists) -> Keep session
            // Or we just finished ensuring logout.

            // Mark validation as done
            setIsTabVerified(true)

            // Mark this tab as alive for future refreshes
            sessionStorage.setItem(TAB_KEY, '1')
        }

        checkTabStatus()
    }, [supabase]) // Run once on mount

    useEffect(() => {
        // ── Step 2: Subscribe to auth state changes ONLY after verification ──
        if (!isTabVerified) return

        // Get initial session after verification
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setUser(session?.user ?? null)
            setIsLoading(false)
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, newSession) => {
                setSession(newSession)
                setUser(newSession?.user ?? null)
                setIsLoading(false)

                if (event === 'SIGNED_OUT') {
                    // Only redirect if we are verified (avoids redirect loops during initial load)
                    router.push('/login')
                }
            }
        )

        return () => subscription.unsubscribe()
    }, [isTabVerified, router, supabase])

    const signOut = async () => {
        sessionStorage.removeItem(TAB_KEY)
        await supabase.auth.signOut()
        if (typeof window !== 'undefined') {
            window.localStorage.clear()
        }
        setUser(null)
        setSession(null)
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
