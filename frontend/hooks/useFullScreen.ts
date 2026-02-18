import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export const useFullScreen = () => {
    const { session } = useAuth()
    const router = useRouter()
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [blocked, setBlocked] = useState(false)
    const [loading, setLoading] = useState(true)
    // Use a ref so the event handler always sees the latest value without stale closures
    const intentionalExitRef = useRef(false)

    const checkBlockStatus = useCallback(async () => {
        if (!session?.access_token) {
            setLoading(false)
            return
        }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/mock/check-block`, {
                headers: { 'Authorization': `Bearer ${session.access_token}` }
            })
            if (res.ok) {
                const data = await res.json()
                if (data.blocked) setBlocked(true)
            }
        } catch (e) {
            console.error('Failed to check block status:', e)
        } finally {
            setLoading(false)
        }
    }, [session])

    const enterFullScreen = useCallback(() => {
        intentionalExitRef.current = false
        const elem = document.documentElement
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(err => {
                console.error('Failed to enter fullscreen:', err)
            })
        }
    }, [])

    // Call this BEFORE submitting to prevent the exit from being flagged as a breach
    const exitGracefully = useCallback(async () => {
        intentionalExitRef.current = true
        if (document.fullscreenElement) {
            try {
                await document.exitFullscreen()
            } catch (e) {
                console.error('Failed to exit fullscreen:', e)
            }
        }
    }, [])

    const reportExit = useCallback(async () => {
        if (!session?.access_token) return
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/mock/exit-session`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${session.access_token}` }
            })
        } catch (e) {
            console.error('Failed to report exit:', e)
        }
        router.push('/dashboard?error=mock_exit')
    }, [session, router])

    useEffect(() => {
        checkBlockStatus()

        const handleFullScreenChange = () => {
            const isNowFullScreen = !!document.fullscreenElement
            setIsFullScreen(isNowFullScreen)

            if (!isNowFullScreen) {
                // Only penalize if this was NOT an intentional exit (e.g. submission)
                if (!intentionalExitRef.current) {
                    reportExit()
                }
                // Reset for next time
                intentionalExitRef.current = false
            }
        }

        document.addEventListener('fullscreenchange', handleFullScreenChange)
        return () => document.removeEventListener('fullscreenchange', handleFullScreenChange)
    }, [checkBlockStatus, reportExit])

    return { isFullScreen, enterFullScreen, exitGracefully, blocked, loading }
}
