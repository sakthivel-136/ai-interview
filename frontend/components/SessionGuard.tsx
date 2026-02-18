'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SessionGuard() {
    const router = useRouter()

    useEffect(() => {
        // Only run in browser
        if (typeof window === 'undefined') return

        const checkTabSession = async () => {
            const isTabActive = sessionStorage.getItem('vantage_tab_active')
            const supabase = createClient()

            // Check if we have a user (cookies might be present)
            const { data: { session } } = await supabase.auth.getSession()

            if (session && !isTabActive) {
                // We have a session (cookies) BUT this tab is new/clean
                // User wants "start from login page" if tab was closed/typed manually
                console.log("SessionGuard: New tab detected, clearing legacy session.")
                await supabase.auth.signOut()
                router.push('/login')
            }

            // Mark this tab as active
            sessionStorage.setItem('vantage_tab_active', 'true')
        }

        checkTabSession()
    }, [router])

    return null
}
