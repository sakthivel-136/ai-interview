'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { MessageSquare, Maximize2, AlertCircle, ChevronRight, CheckCircle2, XCircle } from 'lucide-react'
import { hrPrompts } from '@/data/hr'
import Link from 'next/link'
import { useFullScreen } from '@/hooks/useFullScreen'

const TOTAL_QUESTIONS = 3

function pickRandomQuestions(count: number) {
    const shuffled = [...hrPrompts].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
}

export default function HRInterviewPage() {
    const { session } = useAuth()
    const router = useRouter()
    const { isFullScreen, isEntering, enterFullScreen, exitGracefully, blocked, breach, reportExit } = useFullScreen()
    const [started, setStarted] = useState(false)

    // Multi-question state
    const [questions] = useState(() => pickRandomQuestions(TOTAL_QUESTIONS))
    const [currentIdx, setCurrentIdx] = useState(0)
    const [answer, setAnswer] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [feedback, setFeedback] = useState<{ ai_score: number, sentiment: string } | null>(null)
    const [scores, setScores] = useState<number[]>([])
    const [allDone, setAllDone] = useState(false)

    const currentQuestion = questions[currentIdx]
    const isLastQuestion = currentIdx === TOTAL_QUESTIONS - 1

    const handleSubmit = async () => {
        if (!answer.trim() || submitting) return
        setSubmitting(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/mock/hr/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.access_token}`
                },
                body: JSON.stringify({ question: currentQuestion.question, answer })
            })
            const data = await res.json()
            setFeedback(data)
            setScores(prev => [...prev, data.ai_score ?? 0])
        } catch (e) {
            console.error(e)
            alert('Submission failed')
        } finally {
            setSubmitting(false)
        }
    }

    const handleNext = () => {
        if (isLastQuestion) {
            setAllDone(true)
        } else {
            setCurrentIdx(prev => prev + 1)
            setAnswer('')
            setFeedback(null)
        }
    }

    const handleFinish = async () => {
        await exitGracefully()
        router.push('/mock/round4-intro')
    }

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
                            <MessageSquare className="w-10 h-10 text-[#000066]" />
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tight">Behavioral Round</h2>
                        <p className="text-slate-500 mb-10 font-medium leading-relaxed">
                            Phase 03 evaluates your professional alignment. You will answer <span className="text-[#000066] font-bold">{TOTAL_QUESTIONS} behavioral questions</span> in <span className="text-[#000066] font-bold">Full-Screen Mode</span>.
                        </p>
                        <div className="grid grid-cols-2 gap-4 w-full mb-10">
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                <span className="block text-[10px] font-black text-[#000066] uppercase tracking-widest mb-2">Questions</span>
                                <span className="text-2xl font-black text-slate-800">{TOTAL_QUESTIONS} Total</span>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                <span className="block text-[10px] font-black text-[#000066] uppercase tracking-widest mb-2">Focus</span>
                                <span className="text-2xl font-black text-slate-800">Culture Fit</span>
                            </div>
                        </div>
                        <button
                            onClick={async () => {
                                await enterFullScreen()
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

    // All done — show summary
    if (allDone) {
        const PASS_THRESHOLD = 60
        const passedCount = scores.filter(s => s >= PASS_THRESHOLD).length
        const avg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
        const overallPassed = passedCount === TOTAL_QUESTIONS

        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
                <div className="max-w-2xl w-full bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ${overallPassed ? 'bg-emerald-50' : 'bg-red-50'}`}>
                        {overallPassed
                            ? <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                            : <XCircle className="w-12 h-12 text-red-500" />
                        }
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tight text-center">Phase 03 Complete</h2>
                    <p className="text-slate-500 mb-8 font-medium text-center">
                        {overallPassed
                            ? `All ${TOTAL_QUESTIONS} behavioral questions passed!`
                            : `You passed ${passedCount} of ${TOTAL_QUESTIONS} questions. Keep practicing!`
                        }
                    </p>

                    {/* Per-question breakdown */}
                    <div className="space-y-3 mb-8">
                        {scores.map((score, i) => {
                            const passed = score >= PASS_THRESHOLD
                            return (
                                <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border ${passed ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                                    <div className="flex items-center gap-3">
                                        {passed
                                            ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                            : <XCircle className="w-4 h-4 text-red-500" />
                                        }
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                                            Q{i + 1} — Behavioral
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xl font-black ${passed ? 'text-emerald-600' : 'text-red-500'}`}>{score}</span>
                                        <span className="text-slate-300 text-sm font-black">/100</span>
                                        <span className={`ml-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${passed ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                                            {passed ? 'Pass' : 'Fail'}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-100 flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Average Score</span>
                        <span className="text-4xl font-black text-[#000066]">{avg}<span className="text-lg text-slate-300">/100</span></span>
                    </div>

                    <button
                        onClick={handleFinish}
                        className="w-full bg-[#000066] hover:bg-blue-900 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-2xl shadow-blue-900/20 active:scale-[0.98]"
                    >
                        Proceed to Phase 04 →
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col pt-16 select-none">
            {/* Full-Screen Enforcement Overlay */}
            {breach && !isFullScreen && !isEntering && !submitting && (
                <div className="fixed inset-0 bg-[#000066]/95 backdrop-blur-xl z-[100] flex items-center justify-center p-8">
                    <div className="max-w-md w-full text-center bg-white p-12 rounded-[40px] shadow-2xl border border-white/20 animate-in fade-in zoom-in duration-300">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <AlertCircle className="w-12 h-12 text-red-600" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight leading-none">Session Alert</h2>
                        <p className="text-slate-500 mb-10 font-medium leading-relaxed">
                            Protocol breach detected. Re-engage full-screen mode immediately.
                        </p>
                        <div className="flex flex-col gap-3">
                            <button onClick={enterFullScreen} className="w-full bg-[#000066] hover:bg-blue-900 text-white font-black py-6 rounded-2xl shadow-xl shadow-blue-900/40 text-lg transition-all active:scale-[0.95]">
                                Resume Secure Session
                            </button>
                            <button onClick={reportExit} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-2xl transition-all">
                                Terminate & Exit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-1 max-w-4xl mx-auto w-full p-8 flex flex-col gap-10">
                <header className="flex items-center justify-between">
                    <div>
                        <span className="text-[#000066] font-black text-[10px] uppercase tracking-[0.2em] border-b-2 border-blue-100 pb-1">Phase 03</span>
                        <h1 className="text-3xl font-black text-slate-900 mt-3 tracking-tighter uppercase">Behavioral Qualification</h1>
                    </div>
                    {/* Progress indicator */}
                    <div className="flex items-center gap-3">
                        {questions.map((_, i) => (
                            <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all ${i < currentIdx ? 'bg-emerald-500 border-emerald-500 text-white' :
                                i === currentIdx ? 'bg-[#000066] border-[#000066] text-white' :
                                    'bg-white border-slate-200 text-slate-400'
                                }`}>
                                {i < currentIdx ? '✓' : i + 1}
                            </div>
                        ))}
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                            {currentIdx + 1} / {TOTAL_QUESTIONS}
                        </span>
                    </div>
                </header>

                <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#000066]" />
                    <h2 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-center">Question {currentIdx + 1} of {TOTAL_QUESTIONS}</h2>
                    <div className="text-3xl font-black text-slate-800 leading-tight text-center tracking-tight">
                        {currentQuestion.question}
                    </div>
                </div>

                <div className="flex-1 bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 flex flex-col focus-within:ring-4 focus-within:ring-blue-50/50 transition-all">
                    <h2 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-center">Your Response</h2>
                    <textarea
                        className="flex-1 bg-transparent resize-none focus:outline-none text-2xl text-slate-700 placeholder:text-slate-200 font-bold tracking-tight leading-relaxed text-center min-h-[150px]"
                        placeholder="FORMULATE CORE RESPONSE..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        disabled={!!feedback}
                    />
                </div>

                {feedback && (
                    <div className="bg-white border border-blue-100 p-12 rounded-[3rem] shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-700">
                        <div className="flex items-center gap-2 mb-8 justify-center">
                            <h3 className="font-black text-[#000066] uppercase tracking-[0.4em] text-[10px]">Evaluation Report</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-8 mb-10">
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
                                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Score</span>
                                <span className="text-5xl font-black text-[#000066] tracking-tighter">{feedback.ai_score}<span className="text-xl text-slate-300">/100</span></span>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
                                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Sentiment</span>
                                <span className="text-4xl font-black text-[#000066] uppercase tracking-tighter">{feedback.sentiment}</span>
                            </div>
                        </div>
                        <button
                            onClick={handleNext}
                            className="w-full bg-[#000066] hover:bg-blue-900 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-2xl shadow-blue-900/20 active:scale-[0.98]"
                        >
                            {isLastQuestion ? 'Complete Phase 03 →' : `Next Question (${currentIdx + 2}/${TOTAL_QUESTIONS}) →`}
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
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                QUANTIFYING RESPONSE...
                            </div>
                        ) : 'Finalize & Quantify'}
                    </button>
                )}
            </div>
        </div>
    )
}
