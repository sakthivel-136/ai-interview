'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/context/AuthContext'
import Navbar from '@/components/Navbar'
import { Code2, MessageSquare, ChevronLeft, ChevronRight, Save, Maximize2, AlertCircle, Clock } from 'lucide-react'
import { codingProblems } from '@/data/coding'
import Link from 'next/link'
import { useFullScreen } from '@/hooks/useFullScreen'

interface Problem {
    id: string
    title: string
    description: string
}

export default function MockCodingPage() {
    const { session } = useAuth()
    const router = useRouter()
    const [problems, setProblems] = useState<Problem[]>([])
    const [currentProblemIdx, setCurrentProblemIdx] = useState(0)
    const [showResult, setShowResult] = useState<{ score: number, passed: boolean, message: string } | null>(null)
    const [codeMap, setCodeMap] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const { isFullScreen, enterFullScreen, exitGracefully, blocked, loading: fsLoading, breach, reportExit } = useFullScreen()
    const [started, setStarted] = useState(false)
    const [timeLeft, setTimeLeft] = useState(1200) // 20 minutes
    const supabase = createClient()

    // Single stable useEffect for initialization
    useEffect(() => {
        if (!session?.access_token) return

        const fetchProblems = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/mock/coding/questions`, {
                    headers: {
                        'Authorization': `Bearer ${session.access_token}`
                    }
                })
                if (res.ok) {
                    const selected = await res.json()
                    setProblems(selected)

                    const initialCode: Record<string, string> = {}
                    selected.forEach((p: any) => {
                        initialCode[p.id] = p.starter_code || '# Write your code here\nprint("Hello")'
                    })
                    setCodeMap(initialCode)
                }
            } catch (e) {
                console.error("Error fetching problems:", e)
            } finally {
                setLoading(false)
            }
        }

        fetchProblems()
    }, [session?.access_token]) // Stable dependency

    useEffect(() => {
        if (!started) return
        if (timeLeft <= 0) {
            handleFinalSubmit() // Auto-submit on timeout
            return
        }
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [timeLeft, started])

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m}:${s < 10 ? '0' : ''}${s}`
    }

    const handleNext = () => {
        if (currentProblemIdx < problems.length - 1) {
            setCurrentProblemIdx(prev => prev + 1)
        }
    }

    const handlePrev = () => {
        if (currentProblemIdx > 0) {
            setCurrentProblemIdx(prev => prev - 1)
        }
    }

    const handleFinalSubmit = async () => {
        setSubmitting(true)

        // Exit full-screen gracefully before submission
        await exitGracefully()
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/mock/coding/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.access_token}`
                },
                body: JSON.stringify({ solutions: codeMap })
            })

            const data = await res.json()
            if (res.ok) {
                setShowResult(data)
            } else {
                alert("Error evaluating solutions. Please contact support.")
            }
        } catch (e) {
            console.error(e)
            alert("Network error. Please check your connection.")
        } finally {
            setSubmitting(false)
        }
    }

    if (loading || fsLoading) return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-100 border-t-[#000066] rounded-full animate-spin" />
            <p className="text-[#000066] font-black uppercase tracking-widest text-xs">Initializing Technical Session...</p>
        </div>
    )

    if (blocked) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-8">
                    <AlertCircle className="w-12 h-12 text-red-600" />
                </div>
                <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tight">Access Restricted</h1>
                <p className="text-slate-500 max-w-md mb-8 font-medium">
                    Our security systems have detected multiple session disruptions. To maintain platform integrity, your access to mock interviews has been suspended for 24 hours.
                </p>
                <Link href="/dashboard" className="px-12 py-4 bg-[#000066] text-white font-black rounded-2xl shadow-xl hover:bg-blue-900 transition-all">
                    Return to Dashboard
                </Link>
            </div>
        )
    }

    if (!started) {
        return (
            <div className="min-h-screen bg-[#000066] flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="max-w-2xl w-full bg-white rounded-[40px] p-12 shadow-2xl relative z-10 border border-white/20">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-8">
                            <Maximize2 className="w-10 h-10 text-[#000066]" />
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tight">Technical Assessment</h2>
                        <p className="text-slate-500 mb-10 font-medium leading-relaxed">
                            Phase 02 requires a secure development environment. The session will be locked in <span className="text-[#000066] font-bold">Full-Screen Mode</span>.
                        </p>
                        <div className="grid grid-cols-2 gap-4 w-full mb-10">
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                <span className="block text-[10px] font-black text-[#000066] uppercase tracking-widest mb-2">Duration</span>
                                <span className="text-2xl font-black text-slate-800">20 Mins</span>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                <span className="block text-[10px] font-black text-[#000066] uppercase tracking-widest mb-2">Status</span>
                                <span className="text-2xl font-black text-slate-800">Secure</span>
                            </div>
                        </div>
                        <button
                            onClick={async () => {
                                await enterFullScreen()
                                setStarted(true)
                            }}
                            className="w-full bg-[#000066] hover:bg-blue-900 text-white font-black py-6 rounded-2xl shadow-xl shadow-blue-900/20 text-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                        >
                            Initialize Secure Environment <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const currentProblem = problems[currentProblemIdx]

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white flex flex-col h-screen overflow-hidden select-none">
            {/* Security Breach Overlay */}
            {breach && !isFullScreen && (
                <div className="fixed inset-0 bg-[#000066]/95 backdrop-blur-xl z-[100] flex items-center justify-center p-8 text-slate-900 text-center">
                    <div className="max-w-md w-full bg-white p-12 rounded-[40px] shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <AlertCircle className="w-12 h-12 text-red-600" />
                        </div>
                        <h2 className="text-3xl font-black mb-4 uppercase tracking-tight">Security Breach</h2>
                        <p className="text-slate-500 mb-10 font-medium">
                            Assessment protocol has been breached. Re-engage immediate lock to prevent session termination.
                        </p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={enterFullScreen}
                                className="w-full bg-[#000066] text-white font-black py-6 rounded-2xl shadow-xl hover:bg-blue-900 transition-all"
                            >
                                Resume Secure Session
                            </button>
                            <button
                                onClick={reportExit}
                                className="w-full bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-all"
                            >
                                Terminate & Exit
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <nav className="bg-[#000066] border-b border-white/10 px-6 h-16 flex items-center justify-between shadow-xl sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <span className="bg-white/10 text-white px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest border border-white/10">Phase 02</span>
                    <h1 className="font-black text-lg text-white tracking-widest uppercase">Technical Evaluation</h1>
                </div>

                <div className="flex items-center gap-8">
                    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-lg border transition-all ${timeLeft < 60 ? 'bg-red-500/10 border-red-500/20 text-red-400 animate-pulse' : 'bg-white/5 border-white/10 text-white/80'}`}>
                        <Clock className="w-4 h-4" />
                        <span className="font-mono font-bold text-lg tabular-nums">
                            {formatTime(timeLeft)}
                        </span>
                    </div>

                    <div className="h-6 w-px bg-white/10" />
                    <button
                        onClick={handleFinalSubmit}
                        disabled={submitting}
                        className="bg-white text-[#000066] px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-black/20 active:scale-95 disabled:opacity-50"
                    >
                        {submitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Evaluating...
                            </>
                        ) : 'Finish & Submit'}
                    </button>
                </div>
            </nav>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Problem Description */}
                <div className="w-full md:w-1/3 bg-white border-r border-slate-100 flex flex-col overflow-hidden">
                    <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
                        <div className="mb-6">
                            <span className="text-[#000066] font-black text-[10px] uppercase tracking-[0.2em]">Assignment {currentProblemIdx + 1} of {problems.length}</span>
                            <h2 className="text-2xl font-black text-slate-900 mt-2 tracking-tight leading-tight uppercase">
                                {currentProblem?.title}
                            </h2>
                        </div>

                        <div className="prose prose-slate prose-sm max-w-none">
                            <p className="text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                                {currentProblem?.description}
                            </p>
                        </div>

                        <div className="mt-12 flex items-center justify-between border-t border-slate-50 pt-6">
                            <button
                                onClick={handlePrev}
                                disabled={currentProblemIdx === 0}
                                className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-[#000066] transition-colors disabled:opacity-0"
                            >
                                ← Restricted
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentProblemIdx === problems.length - 1}
                                className="flex items-center gap-2 text-[#000066] font-black text-[10px] uppercase tracking-widest hover:translate-x-1 transition-all disabled:opacity-0"
                            >
                                Proceed →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Editor Area */}
                <div className="w-full md:w-2/3 bg-[#0a0e14] flex flex-col relative">
                    <div className="bg-[#111827] px-6 py-3 border-b border-slate-800/50 flex items-center">
                        <div className="flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-blue-400" />
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">solution.py</span>
                        </div>
                    </div>

                    <div className="flex-1 flex overflow-hidden">
                        <div className="w-12 bg-[#0d1117] border-r border-slate-800/30 flex flex-col items-center pt-4 select-none">
                            {[...Array(20)].map((_, i) => (
                                <span key={i} className="text-[10px] font-mono text-slate-600 mb-1">{i + 1}</span>
                            ))}
                        </div>
                        <textarea
                            className="flex-1 bg-transparent text-slate-300 p-6 font-mono text-sm resize-none focus:outline-none leading-relaxed spellcheck-false"
                            value={codeMap[currentProblem?.id] || ''}
                            onChange={(e) => setCodeMap(prev => ({ ...prev, [currentProblem.id]: e.target.value }))}
                            placeholder="# Implement your solution here..."
                            spellCheck={false}
                        />
                    </div>

                    <div className="absolute bottom-6 right-8">
                        <div className="bg-slate-800/50 backdrop-blur-md px-4 py-2 rounded-lg border border-slate-700/50 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Auto-saving locally</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Result Modal */}
            {showResult && (
                <div className="fixed inset-0 bg-[#000066]/90 backdrop-blur-xl z-[200] flex items-center justify-center p-8">
                    <div className="max-w-2xl w-full bg-white rounded-[40px] p-12 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Save className="w-32 h-32 text-[#000066]" />
                        </div>

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 ${showResult.passed ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                {showResult.passed ? <Maximize2 className="w-12 h-12" /> : <AlertCircle className="w-12 h-12" />}
                            </div>

                            <h2 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tight">
                                {showResult.passed ? 'Phase 02 Cleared' : 'Evaluation Failed'}
                            </h2>
                            <p className="text-slate-500 font-medium mb-8">Performance Score: <span className="text-[#000066] font-bold">{showResult.score}%</span></p>

                            <div className="w-full bg-slate-50 rounded-3xl p-8 mb-10 text-left border border-slate-100">
                                <span className="block text-[10px] font-black text-[#000066] uppercase tracking-widest mb-4">AI Technical Feedback</span>
                                <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-wrap italic">
                                    "{showResult.message}"
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    if (showResult.passed) {
                                        router.push('/mock/round3-intro')
                                    } else {
                                        router.push('/dashboard')
                                    }
                                }}
                                className="w-full bg-[#000066] text-white font-black py-6 rounded-2xl shadow-xl shadow-blue-900/20 text-xl transition-all active:scale-[0.98]"
                            >
                                {showResult.passed ? 'Initiate Final Phase' : 'Return to Dashboard'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
