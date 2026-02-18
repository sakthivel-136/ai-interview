'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            router.push('/dashboard')
            router.refresh()
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <div className="bg-white p-10 rounded-2xl shadow-xl border border-blue-50 space-y-8">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-slate-50 border-4 border-white shadow-2xl shadow-blue-900/10 mb-6">
                            <span className="text-[#000066] font-black text-2xl tracking-tighter">V</span>
                        </div>
                        <h2 className="text-4xl font-black tracking-tight text-slate-900 uppercase">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                            Secure Professional Workspace
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-4 rounded-md">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1 ml-1">Email Address</label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#003399] focus:border-transparent transition-all"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1 ml-1">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#003399] focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium border border-red-100">
                                {error}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative flex w-full justify-center rounded-xl bg-[#003399] px-4 py-3.5 text-sm font-bold text-white hover:bg-[#002880] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003399] disabled:opacity-50 transition-all shadow-lg shadow-blue-900/10 active:scale-[0.98]"
                            >
                                {loading ? 'Establishing secure connection...' : 'Secure Sign In'}
                            </button>
                        </div>

                        <div className="text-center pt-2">
                            <Link href="/register" className="text-sm font-semibold text-[#003399] hover:text-[#002880] transition-colors">
                                Don't have an account? <span className="underline decoration-2 underline-offset-4">Register now</span>
                            </Link>
                        </div>
                    </form>
                </div>
                <p className="mt-8 text-center text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black">
                    VANTAGE &copy; 2026
                </p>
            </div>
        </div>
    )
}
