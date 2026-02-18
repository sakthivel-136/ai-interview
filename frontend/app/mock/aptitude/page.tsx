'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Clock, CheckCircle2, AlertCircle, ChevronRight, Maximize2 } from 'lucide-react'
import { aptitudeQuestions } from '@/data/aptitude'
import Link from 'next/link'
import { useFullScreen } from '@/hooks/useFullScreen'

interface Question {
    id: string
    question: string
    options: string[]
    answer: string
}

export default function AptitudePage() {
    const { session } = useAuth()
    const router = useRouter()
    const [questions, setQuestions] = useState<Question[]>([])
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(true)
    const [timeLeft, setTimeLeft] = useState(600) // 10 minutes
    const [submitting, setSubmitting] = useState(false)
    const [started, setStarted] = useState(false)
    const { isFullScreen, enterFullScreen, exitGracefully, blocked, loading: fsLoading } = useFullScreen()

    useEffect(() => {
        const shuffled = [...aptitudeQuestions].sort(() => 0.5 - Math.random())
        setQuestions(shuffled.slice(0, 10) as Question[])
        setLoading(false)
    }, [])

    // Core submit logic — forceSubmit=true skips the "all answered" check (used on timeout)
    const handleSubmitInternal = useCallback(async (forceSubmit = false) => {
        if (submitting) return
        if (!forceSubmit && Object.keys(answers).length < questions.length) {
            alert('Please answer all questions before submitting.')
            return
        }

        setSubmitting(true)

        // Exit full-screen gracefully so it doesn't trigger the security breach handler
        await exitGracefully()

        // Calculate score locally
        let correctCount = 0
        questions.forEach(q => {
            if (answers[q.id] === q.answer) correctCount++
        })

        const percentage = questions.length > 0 ? (correctCount / questions.length) * 100 : 0
        const isPassed = percentage >= 70

        // Sync to backend (non-blocking)
        if (session?.access_token) {
            try {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/mock/aptitude/submit`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session.access_token}`
                    },
                    body: JSON.stringify({ answers })
                })
            } catch (error) {
                console.error('Failed to sync score to backend:', error)
            }
        }

        if (isPassed) {
            router.push('/mock/round2-intro')
        } else {
            alert(`You scored ${percentage.toFixed(1)}%. A minimum of 70% is required to proceed. Please try again.`)
            router.push('/dashboard')
        }
    }, [submitting, answers, questions, exitGracefully, session, router])

    // Timer — only runs after session starts
    useEffect(() => {
        if (!started) return
        if (timeLeft <= 0) {
            handleSubmitInternal(true)
            return
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
        return () => clearInterval(timer)
    }, [timeLeft, started, handleSubmitInternal])

    const handleSelect = (qId: string, option: string) => {
        setAnswers(prev => ({ ...prev, [qId]: option }))
    }

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m}:${s < 10 ? '0' : ''}${s}`
    }

    if (loading || fsLoading) return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-100 border-t-[#000066] rounded-full animate-spin" />
            <p className="text-[#000066] font-black uppercase tracking-widest text-xs">Initializing Session...</p>
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
                    Multiple session disruptions detected. Access to mock interviews has been suspended for 24 hours.
                </p>
                <Link href="/dashboard" className="px-12 py-4 bg-[#000066] text-white font-black rounded-2xl shadow-xl hover:bg-blue-900 transition-all">
                    Return to Dashboard
                </Link>
            </div>
        )
    }

    // Pre-session screen (not started or not in fullscreen)
    if (!started || !isFullScreen) {
        return (
            <div className="min-h-screen bg-[#000066] flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
                </div>
                <div className="max-w-2xl w-full bg-white rounded-[40px] p-12 shadow-2xl relative z-10">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-8">
                            <Maximize2 className="w-10 h-10 text-[#000066]" />
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tight">Ready to Begin?</h2>
                        <p className="text-slate-500 mb-10 font-medium leading-relaxed">
                            This is a secure assessment. The session runs in <span className="text-[#000066] font-bold">Full-Screen Mode</span>. Exiting full-screen will cancel your session.
                        </p>
                        <div className="grid grid-cols-2 gap-4 w-full mb-10">
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                <span className="block text-[10px] font-black text-[#000066] uppercase tracking-widest mb-2">Duration</span>
                                <span className="text-2xl font-black text-slate-800">10 Mins</span>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                <span className="block text-[10px] font-black text-[#000066] uppercase tracking-widest mb-2">Pass Threshold</span>
                                <span className="text-2xl font-black text-slate-800">70%</span>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setStarted(true)
                                enterFullScreen()
                            }}
                            className="w-full bg-[#000066] hover:bg-blue-900 text-white font-black py-6 rounded-2xl shadow-xl text-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                        >
                            Start Secure Session <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 select-none">
            {/* Header / Timer */}
            <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
                <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#000066] rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                            <span className="text-white font-black text-xl">1</span>
                        </div>
                        <div>
                            <span className="text-[#000066] font-bold text-[10px] uppercase tracking-widest">PHASE 01</span>
                            <h1 className="font-black text-slate-800 tracking-tight leading-none uppercase">Aptitude Assessment</h1>
                        </div>
                    </div>
                    <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border-2 transition-all shadow-sm ${timeLeft < 60 ? 'bg-red-50 border-red-100 text-red-600 animate-pulse' : 'bg-blue-50 border-blue-100 text-[#000066]'}`}>
                        <Clock className="w-5 h-5" />
                        <span className="font-black text-2xl tabular-nums tracking-tighter">{formatTime(timeLeft)}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto pt-32 px-8">
                <div className="mb-12">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-amber-50 rounded-xl">
                            <AlertCircle className="w-6 h-6 text-amber-500" />
                        </div>
                        <p className="text-sm text-slate-500 font-medium">
                            <span className="font-bold text-slate-800">Instructions:</span> Select the best answer for each question. You must score 70% or above to proceed to the next round.
                        </p>
                    </div>
                </div>

                <div className="space-y-10">
                    {questions.map((q, idx) => (
                        <div key={q.id} className="group bg-white p-10 rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100 transition-all hover:border-[#003399]/20">
                            <div className="flex gap-6">
                                <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-sm font-black text-slate-400 group-hover:bg-[#000066] group-hover:text-white transition-colors">
                                    {idx + 1}
                                </span>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-slate-800 mb-8 leading-tight">{q.question}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {q.options.map((opt) => {
                                            const isSelected = answers[q.id] === opt
                                            return (
                                                <label
                                                    key={opt}
                                                    className={`relative flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${isSelected ? 'border-[#000066] bg-blue-50/50 shadow-md ring-4 ring-blue-50' : 'border-slate-100 hover:border-blue-100 hover:bg-slate-50'}`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name={q.id}
                                                        value={opt}
                                                        checked={isSelected}
                                                        onChange={() => handleSelect(q.id, opt)}
                                                        className="hidden"
                                                    />
                                                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-4 flex items-center justify-center transition-all ${isSelected ? 'border-[#000066] bg-[#000066]' : 'border-slate-300'}`}>
                                                        {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                                    </div>
                                                    <span className={`text-base font-bold ${isSelected ? 'text-[#000066]' : 'text-slate-600'}`}>{opt}</span>
                                                </label>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <button
                        onClick={() => handleSubmitInternal(false)}
                        disabled={submitting}
                        className="w-full max-w-md bg-[#000066] hover:bg-blue-900 text-white font-black py-6 rounded-3xl shadow-2xl shadow-blue-900/20 text-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed group"
                    >
                        {submitting ? (
                            <>
                                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                Validating...
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="w-6 h-6" />
                                Submit Assessment <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
