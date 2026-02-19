'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Shield } from 'lucide-react'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: window.location.origin.includes('localhost')
                    ? 'https://ai-interview-blue-eight.vercel.app/auth/callback'
                    : `${window.location.origin}/auth/callback`,
            }
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            router.push('/profile-setup')
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#000066]" />

            <div className="w-full max-w-md space-y-12">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2.5rem] bg-white border border-slate-100 shadow-2xl shadow-blue-900/10 mb-8 mx-auto">
                        <span className="text-[#000066] font-black text-3xl tracking-tighter">V</span>
                    </div>
                    <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">
                        Account <span className="text-[#000066]">Creation</span>
                    </h2>
                    <p className="mt-3 text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
                        Initialize your professional footprint
                    </p>
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100">
                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Identifier</label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-2xl border-slate-100 bg-slate-50 py-4 text-slate-900 font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-blue-50 focus:border-[#000066] transition-all"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Access Credential</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="block w-full rounded-2xl border-slate-100 bg-slate-50 py-4 text-slate-900 font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-blue-50 focus:border-[#000066] transition-all"
                                    placeholder="Secure characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 rounded-xl border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-wider text-center">{error}</div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full justify-center items-center gap-3 rounded-2xl bg-[#000066] px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-blue-900 transition-all shadow-xl shadow-blue-900/20 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Create Profile
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        <p className="mt-4 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            Check in the junk/spam too for confirmation
                        </p>

                        <div className="text-center">
                            <Link href="/login" className="text-[10px] font-black text-slate-400 hover:text-[#000066] uppercase tracking-widest transition-colors">
                                Already Registered? Authorize Access
                            </Link>
                        </div>
                    </form>
                </div>

                <p className="text-center text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]">
                    VANTAGE &copy; 2026
                </p>
            </div>
        </div>
    )
}
