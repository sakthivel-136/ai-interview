'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { Code2, Terminal, Play, Shield, ArrowLeft, CheckCircle2, XCircle, Clock } from 'lucide-react'
import { codingProblems } from '@/data/coding'

interface Problem {
    id: string
    title: string
    description: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
    category: string
    starter_code?: string
}

export default function ProblemDetailPage() {
    const params = useParams()
    const rawId = params?.id
    const id = Array.isArray(rawId) ? rawId[0] : rawId ?? ''
    const router = useRouter()
    const { session } = useAuth()
    const [problem, setProblem] = useState<Problem | null>(() => {
        const found = codingProblems.find(p => p.id === id)
            ?? codingProblems.find(p =>
                id && p.id.toLowerCase().trim() === String(id).toLowerCase().trim()
            );
        return found as Problem | null;
    })
    const [code, setCode] = useState(() => {
        const found = codingProblems.find(p => p.id === id)
            ?? codingProblems.find(p =>
                id && p.id.toLowerCase().trim() === String(id).toLowerCase().trim()
            );
        return found?.starter_code ?? '# Write your solution here\n';
    })
    const [output, setOutput] = useState('')
    const [loading, setLoading] = useState(!problem)
    const [evaluating, setEvaluating] = useState(false)
    const [result, setResult] = useState<{ status: string, message: string } | null>(null)
    const [hasPassed, setHasPassed] = useState(false)
    const supabase = createClient()
    const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes
    const [supabaseProblemId, setSupabaseProblemId] = useState<string | null>(null)

    useEffect(() => {
        const fetchProblemStatus = async () => {
            try {
                if (!id || !problem) return;

                if (session?.user) {
                    // Step 1: Find the Supabase UUID for this problem by matching title
                    // (local IDs like "code-1" are not the same as Supabase UUIDs)
                    const { data: problemRow } = await supabase
                        .from('problems')
                        .select('id')
                        .eq('title', problem.title)
                        .maybeSingle();

                    if (problemRow?.id) {
                        setSupabaseProblemId(problemRow.id)

                        // Step 2: Check if user has a passing submission for this UUID
                        const { data: passData } = await supabase
                            .from('submissions')
                            .select('id')
                            .eq('user_id', session.user.id)
                            .eq('problem_id', problemRow.id)
                            .eq('status', 'Pass')
                            .maybeSingle();

                        if (passData) {
                            setHasPassed(true);
                            setResult({ status: 'Pass', message: 'MODULE ALREADY MASTERED. PROCEED TO NEXT CHALLENGE.' });
                        }
                    }
                }
            } catch (e) {
                console.error('Error fetching problem status:', e);
            } finally {
                setLoading(false);
            }
        };

        fetchProblemStatus();
    }, [id, problem, session, supabase]);

    useEffect(() => {
        if (timeLeft <= 0) {
            alert('Practice session expired. Returning to arena.')
            router.push('/practice')
            return
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
        return () => clearInterval(timer)
    }, [timeLeft, router])

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m}:${s < 10 ? '0' : ''}${s}`
    }

    const handleSubmit = async () => {
        if (hasPassed || !session?.access_token) return
        setEvaluating(true)
        setResult(null)
        setOutput('')

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/problems/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                },
                body: JSON.stringify({ problem_id: supabaseProblemId || id, code })
            })

            const data = await response.json()

            if (!response.ok) {
                setResult({ status: 'Error', message: data.detail || 'Execution failed' })
                setOutput(data.detail || 'System error')
                return
            }

            setResult(data)
            setOutput(data.message)

            if (data.status === 'Pass') {
                setHasPassed(true)
            }
        } catch (error) {
            console.error(error)
            setResult({ status: 'Error', message: 'Network error. Please try again.' })
        } finally {
            setEvaluating(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-blue-100 border-t-[#000066] rounded-full animate-spin" />
                    <p className="font-black text-[10px] uppercase tracking-widest text-slate-400">Loading Problem...</p>
                </div>
            </div>
        )
    }

    if (!problem) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-12 text-center">
                <XCircle className="w-12 h-12 text-red-500 mb-4" />
                <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">Problem Not Found</h1>
                <p className="text-slate-500 font-medium">
                    Could not find problem with ID: <span className="font-mono text-[#000066] font-bold">{id}</span>
                </p>
                <Link href="/practice" className="mt-8 px-6 py-3 bg-[#000066] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-900 transition-all">
                    Back to Practice Arena
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
            {/* Context Header (Relative to page) */}
            <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md w-full h-16 flex items-center shadow-sm">
                <div className="max-w-[1400px] mx-auto w-full px-6 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <Link href="/practice" className="p-2 hover:bg-slate-50 rounded-lg transition-colors group">
                            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-[#000066]" />
                        </Link>
                        <div className="h-6 w-px bg-slate-100" />
                        <div className="flex items-center gap-3">
                            <h1 className="text-sm font-black text-slate-900 uppercase tracking-tight">{problem.title}</h1>
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${problem.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                problem.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                    'bg-rose-50 text-rose-600 border-rose-100'
                                }`}>
                                {problem.difficulty}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-xl border transition-all ${timeLeft < 300 ? 'bg-red-50 border-red-100 text-red-600 animate-pulse' : 'bg-blue-50 border-blue-100 text-[#000066]'
                            }`}>
                            <Clock className="w-4 h-4" />
                            <span className="font-black text-lg tabular-nums tracking-tighter">{formatTime(timeLeft)}</span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                            <Shield className="w-3 h-3 text-[#000066]" />
                            <span className="text-[#000066] font-black text-[9px] uppercase tracking-widest">Secure Mode</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex flex-col md:flex-row max-w-[1400px] mx-auto w-full p-6 gap-6" style={{ minHeight: 'calc(100vh - 4rem)' }}>
                {/* Problem Description */}
                <div className="w-full md:w-1/3 bg-white rounded-[2rem] p-8 overflow-y-auto border border-slate-100 shadow-xl shadow-blue-900/5 relative flex-shrink-0">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#000066] rounded-t-[2rem]" />
                    <div className="flex items-center gap-2 mb-6 mt-2">
                        <Code2 className="w-4 h-4 text-[#000066]" />
                        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Problem Statement</h2>
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed text-sm whitespace-pre-wrap">
                        {problem.description}
                    </p>
                    <div className="mt-6 pt-6 border-t border-slate-100">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</span>
                        <p className="text-sm font-bold text-[#000066] mt-1">{problem.category}</p>
                    </div>
                </div>

                {/* Editor & Console */}
                <div className="w-full md:w-2/3 flex flex-col gap-4 min-h-0">
                    {/* Code Editor */}
                    <div className="flex-1 bg-[#0a0e14] rounded-[2rem] border border-slate-800 shadow-2xl flex flex-col overflow-hidden" style={{ minHeight: '400px' }}>
                        <div className="bg-[#111827] px-6 py-3 border-b border-slate-800/50 flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">solution.py</span>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/40" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                                <div className="w-3 h-3 rounded-full bg-green-500/40" />
                            </div>
                        </div>
                        <textarea
                            className="flex-1 w-full bg-transparent text-slate-300 p-6 font-mono text-sm resize-none focus:outline-none leading-relaxed"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            spellCheck={false}
                            disabled={hasPassed}
                            placeholder="# Write your solution here..."
                            style={{ minHeight: '300px' }}
                        />
                    </div>

                    {/* Output Console */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-xl shadow-blue-900/5 flex-shrink-0">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#000066]" />
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Output</h3>
                            </div>
                            <div className="flex items-center gap-3">
                                {result && (
                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${result.status === 'Pass' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                                        }`}>
                                        {result.status === 'Pass' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                        <span className="text-[9px] font-black uppercase tracking-widest">{result.status}</span>
                                    </div>
                                )}
                                <button
                                    onClick={handleSubmit}
                                    disabled={evaluating || hasPassed}
                                    className={`bg-[#000066] hover:bg-blue-900 text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95`}
                                >
                                    {evaluating ? (
                                        <>
                                            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Running...
                                        </>
                                    ) : hasPassed ? (
                                        <>
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            Mastered
                                        </>
                                    ) : (
                                        <>
                                            <Play className="w-3.5 h-3.5" fill="currentColor" />
                                            Run & Submit
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                        <pre className="font-mono text-xs text-slate-500 overflow-y-auto font-medium whitespace-pre-wrap max-h-32">
                            {output || '// Awaiting submission...'}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}
