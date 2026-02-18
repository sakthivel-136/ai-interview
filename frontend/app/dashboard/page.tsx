'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { Trophy, Award, Zap, Activity, Code2, AlertCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import ResumeUpload from '@/components/ResumeUpload'
import Navbar from '@/components/Navbar'

interface Profile {
    full_name: string
    roll_number: string
    department: string
    year: number
    stats: {
        total_score: number
        rank: number
        aptitude_score: number
        coding_score: number
        hr_score: number
        technical_score: number
    }
}

export default function DashboardPage() {
    const { user, isLoading: authLoading } = useAuth()
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)
    const [recentActivity, setRecentActivity] = useState<any[]>([])
    const [stats, setStats] = useState({
        interviews: 0,
        streak: 0
    })
    const router = useRouter()
    const searchParams = useSearchParams()
    const exitError = searchParams.get('error') === 'mock_exit'
    const supabase = createClient()

    useEffect(() => {
        if (authLoading) return
        if (!user) {
            router.push('/login')
            return
        }

        const fetchData = async () => {
            // 1. Fetch Profile & Stats
            const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single()
            const { data: statsData } = await supabase.from('user_stats').select('*').eq('user_id', user.id).single()

            if (profileData) {
                setProfile({
                    ...profileData,
                    stats: statsData || { total_score: 0, rank: 0, aptitude_score: 0, coding_score: 0, hr_score: 0, technical_score: 0 }
                })
            }

            // 2. Fetch Interview Count
            const { count: interviewCount } = await supabase
                .from('mock_attempts')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', user.id)

            // 3. Fetch Recent Activity & Calculate Streak
            const { data: mockData } = await supabase
                .from('mock_attempts')
                .select('created_at, round, score, passed')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(10)

            const { data: subData } = await supabase
                .from('submissions')
                .select('created_at, status, score, problems(title)')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(10)

            const combined = [
                ...(mockData || []).map(m => ({ ...m, type: 'Mock' })),
                ...(subData || []).map(s => ({ ...s, type: 'Practice' }))
            ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

            setRecentActivity(combined.slice(0, 5))

            // Calculate Streak (Simple version: consecutive days with any activity)
            const activeDates = new Set(combined.map(a => new Date(a.created_at).toDateString()))
            let streak = 0
            let today = new Date()

            while (activeDates.has(today.toDateString())) {
                streak++
                today.setDate(today.getDate() - 1)
            }

            setStats({
                interviews: (interviewCount || 0) / 4,
                streak
            })

            setLoading(false)
        }

        fetchData()
    }, [user, authLoading, router, supabase])

    if (loading || authLoading) {
        return <div className="flex h-screen items-center justify-center bg-white text-[#000066]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-100 border-t-[#000066] rounded-full animate-spin"></div>
                <p className="font-bold tracking-tight text-xs uppercase tracking-[0.2em] text-slate-400">Loading Intelligence...</p>
            </div>
        </div>
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-6 pt-24">
            <div className="max-w-7xl mx-auto space-y-8">
                {exitError && (
                    <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-rose-600 shadow-sm shadow-rose-900/10">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-rose-900 uppercase tracking-tight">Session Cancelled</h3>
                            <p className="text-rose-600 font-bold uppercase text-[9px] tracking-widest mt-0.5">Full-screen exit detected. Attempt logged and terminated.</p>
                        </div>
                    </div>
                )}
                <header className="flex justify-between items-center bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-100 mb-3">
                            <span className="text-[#000066] font-black text-[9px] uppercase tracking-widest">Live System Status: Active</span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">
                            Welcome, <span className="text-[#000066]">{profile?.full_name?.split(' ')[0]}</span>
                        </h1>
                        <p className="text-slate-400 mt-1 font-bold uppercase tracking-widest text-[10px]">
                            {profile?.department} <span className="mx-2 text-slate-200">|</span> Year {profile?.year}
                        </p>
                    </div>
                    <div className="text-right bg-slate-50 p-6 rounded-[2rem] border border-slate-100 px-8">
                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">College Designation</div>
                        <div className="text-4xl font-black text-[#000066] tracking-tighter">#{profile?.stats.rank || '-'}</div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <StatCard title="Total Score" value={Math.round(profile?.stats.total_score || 0)} icon={<Trophy className="w-5 h-5 text-amber-500" />} />
                    <StatCard title="College Rank" value={`#${profile?.stats.rank || '-'}`} icon={<Award className="w-5 h-5 text-blue-600" />} />
                    <StatCard title="Active Streak" value={`${stats.streak} Days`} icon={<Zap className="w-5 h-5 text-orange-500" />} />
                    <StatCard title="Interviews" value={stats.interviews} icon={<Activity className="w-5 h-5 text-emerald-500" />} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <ResumeUpload />
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Recent System Activity</h2>
                            <button className="text-[10px] font-black text-[#000066] uppercase tracking-widest hover:underline">Full Audit</button>
                        </div>
                        <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/5">
                            {recentActivity.length > 0 ? (
                                <div className="divide-y divide-slate-50">
                                    {recentActivity.map((act, i) => (
                                        <div key={i} className="p-5 hover:bg-slate-50 transition-colors flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2.5 rounded-xl ${act.type === 'Mock' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                                    {act.type === 'Mock' ? <Activity className="w-5 h-5" /> : <Code2 className="w-5 h-5" />}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900">
                                                        {act.type === 'Mock' ? `${act.round} Round Mock` : `Practice: ${act.problems?.title}`}
                                                    </div>
                                                    <div className="text-xs text-slate-500 mt-0.5 font-medium">
                                                        {new Date(act.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} at {new Date(act.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${act.passed || act.status === 'Pass' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'
                                                    }`}>
                                                    {act.score !== undefined ? `${act.score}%` : act.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-16 text-center">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Activity className="w-8 h-8 text-slate-300" />
                                    </div>
                                    <p className="text-slate-500 font-medium">No recent activity yet. Start a session!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatCard({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center gap-5 hover:shadow-md transition-all group">
            <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors">{icon}</div>
            <div>
                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</h3>
                <div className="text-2xl font-black mt-0.5 text-slate-900">
                    {value}
                </div>
            </div>
        </div>
    )
}