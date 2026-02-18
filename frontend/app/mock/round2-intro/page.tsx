'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/context/AuthContext'
import { Terminal, Lock, CheckCircle2, ChevronRight, Award } from 'lucide-react'

export default function Round2IntroPage() {
    const { session } = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [passedRound1, setPassedRound1] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        const checkStatus = async () => {
            if (!session?.user) return
            const { data } = await supabase
                .from('mock_attempts')
                .select('*')
                .eq('user_id', session.user.id)
                .eq('round', 'Aptitude')
                .eq('passed', true)
                .maybeSingle()

            if (data) {
                setPassedRound1(true)
            }
            setLoading(false)
        }
        checkStatus()
    }, [session, supabase])

    if (loading) return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-100 border-t-[#000066] rounded-full animate-spin" />
            <p className="text-[#000066] font-black uppercase tracking-widest text-xs">Verifying Credentials...</p>
        </div>
    )

    if (!passedRound1) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-8 text-center">
                <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mb-6 border border-red-100 shadow-xl shadow-red-900/5">
                    <Lock className="w-10 h-10 text-red-500" />
                </div>
                <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Phase Restricted</h1>
                <p className="text-slate-500 max-w-md mb-10 font-medium leading-relaxed">
                    You must achieve a minimum score of <span className="text-red-500 font-bold">70%</span> in the <span className="font-bold text-slate-800">Aptitude Assessment</span> to unlock this technical phase.
                </p>
                <button
                    onClick={() => router.push('/dashboard')}
                    className="bg-white hover:bg-slate-50 text-slate-900 px-8 py-4 rounded-2xl font-black shadow-lg border border-slate-100 transition-all active:scale-95"
                >
                    Return to Mission Control
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col pt-16">
            <div className="flex-1 max-w-4xl mx-auto w-full p-8 flex flex-col justify-center items-center">
                <div className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-100 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-100 via-[#000066] to-blue-100" />

                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100 mb-8 items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-[#000066]" />
                        <span className="text-[#000066] font-black text-[10px] uppercase tracking-widest">Aptitude Cleared</span>
                    </div>

                    <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight leading-none uppercase">
                        Phase 02: <span className="text-[#000066]">Technical Evaluation</span>
                    </h1>

                    <p className="text-xl text-slate-500 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
                        Excellence demonstrated in the previous phase. You are now authorized to proceed to the intensive coding round.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-12">
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 group transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-900/5">
                            <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center mb-4 group-hover:bg-[#000066] transition-colors">
                                <Terminal className="w-6 h-6 text-[#000066] group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-slate-900 font-black uppercase tracking-wider text-[10px] mb-2 tracking-[0.2em]">Infrastructure</h3>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">3 targeted algorithmic problems designed to test your core technical logic.</p>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 group transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-900/5">
                            <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center mb-4 group-hover:bg-[#000066] transition-colors">
                                <Award className="w-6 h-6 text-[#000066] group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-slate-900 font-black uppercase tracking-wider text-[10px] mb-2 tracking-[0.2em]">Requirement</h3>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">Achieve <span className="font-black text-[#000066]">70% cumulative efficiency</span> across all problems to survive the round.</p>
                        </div>
                    </div>

                    <button
                        onClick={() => router.push('/mock/coding')}
                        className="w-full bg-[#000066] hover:bg-blue-900 text-white font-black py-6 rounded-3xl text-xs uppercase tracking-[0.3em] shadow-2xl shadow-blue-900/20 transition-all flex items-center justify-center gap-4 group active:scale-[0.98]"
                    >
                        Initiate Phase 02 <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    )
}
