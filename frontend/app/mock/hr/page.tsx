'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/context/AuthContext'
import Navbar from '@/components/Navbar'
import { MessageSquare, Maximize2, AlertCircle, ChevronRight, CheckCircle2 } from 'lucide-react'
import { hrPrompts } from '@/data/hr'
import Link from 'next/link'
import { useFullScreen } from '@/hooks/useFullScreen'
import { aptitudeQuestions } from '@/data/aptitude'

export default function HRInterviewPage() {
    const { session } = useAuth()
    const router = useRouter()
    const [question, setQuestion] = useState("Loading your personalized question...")
    const { isFullScreen, enterFullScreen, blocked, loading: fsLoading } = useFullScreen()
    const [started, setStarted] = useState(false)

    useEffect(() => {
        // Pick 1 random question from the 50+ list
        const randomQ = hrPrompts[Math.floor(Math.random() * hrPrompts.length)]
        setQuestion(randomQ.question)
    }, [])
    const [answer, setAnswer] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [feedback, setFeedback] = useState<{ ai_score: number, sentiment: string } | null>(null)

    const handleSubmit = async () => {
        setSubmitting(true)
        if (document.fullscreenElement) {
            document.exitFullscreen()
        }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/mock/hr/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.access_token}`
                },
                body: JSON.stringify({ question, answer })
            })
            const data = await res.json()
            setFeedback(data)

            // Save round attempt as passed for now (Simulated)
            const supabase = createClient()
            await supabase.from("mock_attempts").insert({
                user_id: session?.user?.id,
                round: "HR",
                score: data.ai_score,
                passed: data.ai_score >= 70
            })

        } catch (e) {
            console.error(e)
            alert("Submission failed")
        } finally {
            setSubmitting(false)
        }
    }

    const handleNext = () => {
        // In a real app, fetch next question. Here we just redirect to finish or next round.
        router.push('/mock/round4-intro')
    }

    if (fsLoading) return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-100 border-t-[#000066] rounded-full animate-spin" />
            <p className="text-[#000066] font-black uppercase tracking-widest text-xs">Initializing Personality Profile...</p>
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
                            <MessageSquare className="w-10 h-10 text-[#000066]" />
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tight">Behavioral Round</h2>
                        <p className="text-slate-500 mb-10 font-medium leading-relaxed">
                            Phase 03 evaluates your professional alignment. This session requires <span className="text-[#000066] font-bold">Uninterrupted Full-Screen</span> mode.
                        </p>
                        <div className="grid grid-cols-2 gap-4 w-full mb-10">
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                <span className="block text-[10px] font-black text-[#000066] uppercase tracking-widest mb-2">Type</span>
                                <span className="text-2xl font-black text-slate-800">Behavioral</span>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                <span className="block text-[10px] font-black text-[#000066] uppercase tracking-widest mb-2">Focus</span>
                                <span className="text-2xl font-black text-slate-800">Culture Fit</span>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                enterFullScreen()
                                setStarted(true)
                            }}
                            className="w-full bg-[#000066] hover:bg-blue-900 text-white font-black py-6 rounded-2xl shadow-xl shadow-blue-900/20 text-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                        >
                            Open Secure Channel <ChevronRight className="w-6 h-6" />
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
                        <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight leading-none">Session Alert</h2>
                        <p className="text-slate-500 mb-10 font-medium leading-relaxed">
                            Protocol breach detected. Re-engage full-screen mode immediately to sustain the session record.
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
            <div className="flex-1 max-w-4xl mx-auto w-full p-8 flex flex-col gap-10">
                <header className="flex items-center justify-between">
                    <div>
                        <span className="text-[#000066] font-black text-[10px] uppercase tracking-[0.2em] border-b-2 border-blue-100 pb-1">Phase 03</span>
                        <h1 className="text-3xl font-black text-slate-900 mt-3 tracking-tighter uppercase">Behavioral Qualification</h1>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#000066] animate-pulse" />
                            <span className="text-[9px] font-black text-[#000066] uppercase tracking-[0.2em]">Neural Evaluation Active</span>
                        </div>
                    </div>
                </header>

                <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#000066]" />
                    <h2 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-center">Interrogative Prompt</h2>
                    <div className="text-3xl font-black text-slate-800 leading-tight text-center tracking-tight">
                        {question}
                    </div>
                </div>

                <div className="flex-1 bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 flex flex-col focus-within:ring-4 focus-within:ring-blue-50/50 transition-all">
                    <h2 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-center">Candidate Formulation</h2>
                    <textarea
                        className="flex-1 bg-transparent resize-none focus:outline-none text-2xl text-slate-700 placeholder:text-slate-200 font-bold tracking-tight leading-relaxed text-center"
                        placeholder="FORMULATE CORE RESPONSE..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        disabled={!!feedback}
                    />
                </div>

                {feedback && (
                    <div className="bg-white border border-blue-100 p-12 rounded-[3rem] shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-700">
                        <div className="flex items-center gap-2 mb-8 justify-center">
                            <h3 className="font-black text-[#000066] uppercase tracking-[0.4em] text-[10px]">Evaluation Report Generated</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-10">
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
                                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Performance Quotient</span>
                                <span className="text-5xl font-black text-[#000066] tracking-tighter">{feedback.ai_score}<span className="text-xl text-slate-300">/100</span></span>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
                                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Sentiment Matrix</span>
                                <span className="text-4xl font-black text-[#000066] uppercase tracking-tighter">{feedback.sentiment}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleNext}
                            className="w-full bg-[#000066] hover:bg-blue-900 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-2xl shadow-blue-900/20 active:scale-[0.98]"
                        >
                            Proceed to Phase 04 →
                        </button>
                    </div>
                )}

                {!feedback && (
                    <button
                        onClick={handleSubmit}
                        disabled={submitting || !answer.trim()}
                        className="w-full bg-[#000066] hover:bg-blue-900 text-white font-black py-6 rounded-3xl shadow-2xl shadow-blue-900/20 text-xs uppercase tracking-[0.3em] disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-[0.99]"
                    >
                        {submitting ? (
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                QUANTIFYING RESPONSE...
                            </div>
                        ) : 'Finalize & Quantify'}
                    </button>
                )}
            </div>
        </div>
    )
}
