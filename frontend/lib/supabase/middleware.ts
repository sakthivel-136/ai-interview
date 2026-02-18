import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({ name, value, ...options })
                    response = NextResponse.next({ request: { headers: request.headers } })
                    response.cookies.set({ name, value, ...options })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({ name, value: '', ...options })
                    response = NextResponse.next({ request: { headers: request.headers } })
                    response.cookies.set({ name, value: '', ...options })
                },
            },
        }
    )

    // Refresh the session cookie if it exists
    const { data: { user } } = await supabase.auth.getUser()

    const pathname = request.nextUrl.pathname

    // 1. Protected routes: redirect to login if not authenticated
    const protectedPaths = ['/dashboard', '/practice', '/mock', '/leaderboard', '/profile-setup']
    const isProtectedRoute = protectedPaths.some(path => pathname.startsWith(path))

    if (isProtectedRoute && !user) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    // 2. Auth routes: redirect to dashboard if ALREADY authenticated
    // This prevents "I am on login page but I am actually logged in" confusion.
    const authPaths = ['/login', '/register', '/']
    // Note: Landing page '/' is included here so logged-in users go straight to dashboard
    if (authPaths.includes(pathname) && user) {
        const url = request.nextUrl.clone()
        url.pathname = '/dashboard'
        return NextResponse.redirect(url)
    }

    return response
}
