import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export const useFullScreen = () => {
    const { session } = useAuth()
    const router = useRouter()
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [blocked, setBlocked] = useState(false)
    const [loading, setLoading] = useState(true)
    const [sessionStarted, setSessionStarted] = useState(false)
    const [isEntering, setIsEntering] = useState(false)
    const [breach, setBreach] = useState(false)
    const gracePeriodRef = useRef<number | null>(null)
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

    const enterFullScreen = useCallback(async () => {
        intentionalExitRef.current = false
        setIsEntering(true)

        // Try to enter fullscreen — this MUST be called directly in the click handler
        // (no await before it) to preserve the user gesture requirement
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen()
            }
        } catch (err: any) {
            // Fullscreen denied or not supported — continue anyway
            // The session will still work, breach detection handles security
            console.warn('Fullscreen not available:', err?.message || err)
        }

        // Always mark session as started regardless of fullscreen result
        setSessionStarted(true)
        setBreach(false)
        setIsEntering(false)
        gracePeriodRef.current = Date.now() + 2000
    }, [])

    const exitGracefully = useCallback(async () => {
        intentionalExitRef.current = true
        setSessionStarted(false)
        setIsEntering(false)
        if (document.fullscreenElement) {
            try {
                await document.exitFullscreen()
            } catch (e) {
                console.error('Failed to exit fullscreen:', e)
            }
        }
    }, [])

    const reportExit = useCallback(async () => {
        if (!session?.access_token || !sessionStarted) return

        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/mock/exit-session`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${session.access_token}` }
            })
        } catch (e) {
            console.error('Failed to report exit:', e)
        }
        router.push('/dashboard')
    }, [session, router, sessionStarted])

    useEffect(() => {
        checkBlockStatus()

        const handleSecurityBreach = () => {
            if (intentionalExitRef.current || !sessionStarted) return
            if (gracePeriodRef.current && Date.now() < gracePeriodRef.current) return
            setBreach(true)
        }

        const handleFullScreenChange = () => {
            const isNowFullScreen = !!document.fullscreenElement
            setIsFullScreen(isNowFullScreen)

            if (!isNowFullScreen && sessionStarted && !intentionalExitRef.current) {
                handleSecurityBreach()
            }
        }

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden' && sessionStarted && !intentionalExitRef.current) {
                handleSecurityBreach()
            }
        }

        const handleBlur = () => {
            if (sessionStarted && !intentionalExitRef.current) {
                handleSecurityBreach()
            }
        }

        document.addEventListener('fullscreenchange', handleFullScreenChange)
        document.addEventListener('visibilitychange', handleVisibilityChange)
        window.addEventListener('blur', handleBlur)

        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange)
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            window.removeEventListener('blur', handleBlur)
        }
    }, [checkBlockStatus, reportExit, sessionStarted])

    return { isFullScreen, isEntering, enterFullScreen, exitGracefully, blocked, loading, breach, reportExit }
}
