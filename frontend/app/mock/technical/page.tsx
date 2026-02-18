'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Terminal, Award, ChevronRight, CheckCircle2, Cpu, Maximize2, AlertCircle, Clock } from 'lucide-react'
import { technicalPrompts } from '@/data/technical'
import Link from 'next/link'
import { useFullScreen } from '@/hooks/useFullScreen'

export default function TechnicalInterviewPage() {
    const { session } = useAuth()
    const router = useRouter()
    const [question, setQuestion] = useState("Initializing neural prompt...")
    const { isFullScreen, enterFullScreen, exitGracefully, blocked, loading: fsLoading } = useFullScreen()
    const [started, setStarted] = useState(false)
    const [timeLeft, setTimeLeft] = useState(900) // 15 minutes

    useEffect(() => {
        // Pick 1 random question from static data
        const randomQ = technicalPrompts[Math.floor(Math.random() * technicalPrompts.length)]
        setQuestion(randomQ.question)
    }, [])

    useEffect(() => {
        if (!started) return
        if (timeLeft <= 0) {
            alert("Session Expired: The 15-minute technical window has closed. Redirecting to dashboard.")
            router.push('/dashboard')
            return
        }
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [timeLeft, started, router])

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m}:${s < 10 ? '0' : ''}${s}`
    }

    const [answer, setAnswer] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [feedback, setFeedback] = useState<{ ai_score: number, feedback: string } | null>(null)

    const handleSubmit = async () => {
        setSubmitting(true)

        // Exit full-screen gracefully before submission to prevent termination
        await exitGracefully()
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/mock/technical/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.access_token}`
                },
                body: JSON.stringify({ question, answer })
            })
            const data = await res.json()
            setFeedback(data)

        } catch (e) {
            console.error(e)
            alert("Submission failed")
        } finally {
            setSubmitting(false)
        }
    }

    const handleFinish = () => {
        router.push('/dashboard')
    }

    if (fsLoading) return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-100 border-t-[#000066] rounded-full animate-spin" />
            <p className="text-[#000066] font-black uppercase tracking-widest text-xs">Synthesizing Final Phase...</p>
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
                    Multiple session disruptions detected. To maintain platform integrity, your access to high-stakes mock interviews has been suspended for 24 hours.
                </p>
                <Link href="/dashboard" className="px-12 py-4 bg-[#000066] text-white font-black rounded-2xl shadow-xl hover:bg-blue-900 transition-all">
                    Return to Dashboard
                </Link>
            </div>
        )
    }

    if (!isFullScreen || !started) {
        return (
            <div className="min-h-screen bg-[#000066] flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="max-w-2xl w-full bg-white rounded-[40px] p-12 shadow-2xl relative z-10 border border-white/20">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-8">
                            <Cpu className="w-10 h-10 text-[#000066]" />
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tight">Final Assessment</h2>
                        <p className="text-slate-500 mb-10 font-medium leading-relaxed">
                            Phase 04 represents the pinnacle of the technical track. This session must be conducted in <span className="text-[#000066] font-bold">Secure Full-Screen</span> mode.
                        </p>
                        <div className="grid grid-cols-2 gap-4 w-full mb-10">
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                <span className="block text-[10px] font-black text-[#000066] uppercase tracking-widest mb-2">Duration</span>
                                <span className="text-2xl font-black text-slate-800">15 Mins</span>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                <span className="block text-[10px] font-black text-[#000066] uppercase tracking-widest mb-2">Impact</span>
                                <span className="text-2xl font-black text-slate-800">Critical</span>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                enterFullScreen()
                                setStarted(true)
                            }}
                            className="w-full bg-[#000066] hover:bg-blue-900 text-white font-black py-6 rounded-2xl shadow-xl shadow-blue-900/20 text-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                        >
                            Establish Logical Direct <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col pt-16 select-none">
            {/* Full-Screen Enforcement Overlay */}
            {!isFullScreen && (
                <div className="fixed inset-0 bg-[#000066]/95 backdrop-blur-xl z-[100] flex items-center justify-center p-8">
                    <div className="max-w-md w-full text-center bg-white p-12 rounded-[40px] shadow-2xl border border-white/20 animate-in fade-in zoom-in duration-300">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <AlertCircle className="w-12 h-12 text-red-600" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight leading-none">Security Breach</h2>
                        <p className="text-slate-500 mb-10 font-medium leading-relaxed">
                            Full-screen protocol has been breached. Re-engage immediately to preserve your evaluation metrics.
                        </p>
                        <button
                            onClick={enterFullScreen}
                            className="w-full bg-[#000066] hover:bg-blue-900 text-white font-black py-6 rounded-2xl shadow-xl shadow-blue-900/40 text-lg transition-all active:scale-[0.95]"
                        >
                            Resume Secure Session
                        </button>
                    </div>
                </div>
            )}
            <div className="flex-1 max-w-5xl mx-auto w-full p-8 flex flex-col gap-10">
                <header className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div>
                            <span className="text-[#000066] font-black text-[10px] uppercase tracking-[0.2em] border-b-2 border-blue-100 pb-1">Final Phase</span>
                            <h1 className="text-3xl font-black text-slate-900 mt-3 tracking-tighter uppercase">Technical Excellence</h1>
                        </div>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all shadow-sm ${timeLeft < 60 ? 'bg-red-50 border-red-100 text-red-600 animate-pulse' : 'bg-blue-50 border-blue-100 text-[#000066]'}`}>
                            <Clock className="w-4 h-4" />
                            <span className="font-black text-xl tabular-nums tracking-tighter">
                                {formatTime(timeLeft)}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 text-[#000066] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 flex items-center gap-2">
                            <Cpu className="w-3 h-3 animate-pulse" />
                            Neural Synthesis Active
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 flex-1">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden h-full">
                            <div className="absolute top-0 left-0 w-2 h-full bg-[#000066]" />
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <Terminal className="w-4 h-4 text-[#000066]" />
                                </div>
                                <h2 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Interrogative Prompt</h2>
                            </div>
                            <div className="text-2xl font-black text-slate-800 leading-tight tracking-tight">
                                {question}
                            </div>

                            <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                                    <span className="font-black text-[#000066]">Protocol:</span> Results are weighted on technical precision, architectural depth, and core logic.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-3 flex flex-col gap-6">
                        <div className="flex-1 bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 flex flex-col focus-within:ring-4 focus-within:ring-blue-50/50 transition-all">
                            <h2 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-center">Formulate Analysis</h2>
                            <textarea
                                className="flex-1 bg-transparent resize-none focus:outline-none text-xl text-slate-700 placeholder:text-slate-200 font-mono font-bold leading-relaxed custom-scrollbar"
                                placeholder="INITIALIZE CORE TECHNICAL RESPONSE..."
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                disabled={!!feedback}
                            />
                        </div>

                        {feedback && (
                            <div className="bg-white border border-blue-100 p-10 rounded-[3rem] shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-700">
                                <div className="flex items-center justify-between mb-10">
                                    <div className="flex items-center gap-3">
                                        <Award className="w-6 h-6 text-[#000066]" />
                                        <h3 className="font-black text-[#000066] uppercase tracking-[0.3em] text-[10px]">Evaluation Quotient</h3>
                                    </div>
                                    <div className="text-5xl font-black text-[#000066] tracking-tighter">{feedback.ai_score}<span className="text-xl text-slate-200">/100</span></div>
                                </div>

                                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mb-10">
                                    <p className="text-slate-500 font-bold uppercase tracking-tight leading-relaxed text-xs">
                                        {feedback.feedback}
                                    </p>
                                </div>

                                <button
                                    onClick={handleFinish}
                                    className="w-full bg-[#000066] hover:bg-blue-900 text-white py-6 rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-2xl shadow-blue-900/20 active:scale-[0.98] flex items-center justify-center gap-3"
                                >
                                    Finalize Assessment & Exit <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        {!feedback && (
                            <button
                                onClick={handleSubmit}
                                disabled={submitting || !answer.trim()}
                                className="w-full bg-[#000066] hover:bg-blue-900 text-white font-black py-6 rounded-3xl shadow-2xl shadow-blue-900/20 text-[10px] uppercase tracking-[0.3em] disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-[0.99] flex items-center justify-center gap-3"
                            >
                                {submitting ? (
                                    <>
                                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                        Analyzing Complexity...
                                    </>
                                ) : (
                                    <>Commit Technical Data <CheckCircle2 className="w-4 h-4" /></>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
