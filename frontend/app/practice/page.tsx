'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Target, ChevronRight, Terminal } from 'lucide-react'
import { codingProblems } from '@/data/coding'

interface Problem {
    id: string
    title: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
    category: string
}

export default function PracticePage() {
    const [problems, setProblems] = useState<Problem[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        setProblems(codingProblems as Problem[])
        setLoading(false)
    }, [])

    const getDifficultyColor = (diff: string) => {
        switch (diff) {
            case 'Easy': return 'text-emerald-600 bg-emerald-50 border-emerald-100'
            case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-100'
            case 'Hard': return 'text-rose-600 bg-rose-50 border-rose-100'
            default: return 'text-slate-400 bg-slate-50 border-slate-100'
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8 pt-24">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-100 mb-4">
                            <Target className="w-3 h-3 text-[#000066]" />
                            <span className="text-[#000066] font-black text-[9px] uppercase tracking-widest">Skill Calibration</span>
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">
                            Practice <span className="text-[#000066]">Arena</span>
                        </h1>
                    </div>
                    <Link href="/dashboard" className="text-slate-400 hover:text-[#000066] font-black text-[10px] uppercase tracking-widest transition-all pb-2">
                        ← Dashboard
                    </Link>
                </div>

                <div className="grid gap-4">
                    {loading ? (
                        <div className="flex flex-col items-center gap-4 py-24">
                            <div className="w-10 h-10 border-4 border-blue-100 border-t-[#000066] rounded-full animate-spin"></div>
                            <p className="font-black text-[10px] uppercase tracking-widest text-slate-400">Loading Datasets...</p>
                        </div>
                    ) : problems.length === 0 ? (
                        <div className="bg-white p-16 rounded-[2.5rem] text-center border border-slate-100 shadow-2xl shadow-blue-900/5">
                            <p className="font-bold text-slate-400 uppercase tracking-widest text-sm">No challenges available.</p>
                        </div>
                    ) : (
                        problems.map((problem) => (
                            <Link key={problem.id} href={`/practice/${problem.id}`}>
                                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-[#000066]/20 hover:shadow-2xl hover:shadow-blue-900/10 transition-all flex justify-between items-center group relative overflow-hidden">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-[#000066] group-hover:border-[#000066] transition-all">
                                            <Terminal className="w-5 h-5 text-slate-400 group-hover:text-white transition-all" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-[#000066] transition-colors uppercase">
                                                {problem.title}
                                            </h3>
                                            <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest">{problem.category}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getDifficultyColor(problem.difficulty)}`}>
                                            {problem.difficulty}
                                        </span>
                                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#000066] transition-all" />
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
            <p className="text-center text-[10px] text-slate-300 font-black uppercase tracking-[0.3em] mt-24">
                VANTAGE Intelligence Platform &copy; 2026
            </p>
        </div>
    )
}
