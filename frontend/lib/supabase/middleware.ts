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
    await supabase.auth.getUser()

    const { data: { user } } = await supabase.auth.getUser()

    const pathname = request.nextUrl.pathname

    // ── Protected routes: redirect to login if not authenticated ──
    const protectedPaths = ['/dashboard', '/practice', '/mock', '/leaderboard', '/profile-setup']
    const isProtectedRoute = protectedPaths.some(path => pathname.startsWith(path))

    if (isProtectedRoute && !user) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    // NOTE: We do NOT redirect logged-in users away from '/', '/login', '/register'
    // at the middleware level. The client-side AuthContext handles sign-out on fresh
    // tab open, and the login page handles redirect to /dashboard after login.
    // Doing it here causes a race condition with the client-side sign-out.

    return response
}
