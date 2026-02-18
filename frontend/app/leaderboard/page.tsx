'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'
import { useAuth } from '@/context/AuthContext'
import { Trophy, Award, Crown, Medal, User, ChevronRight } from 'lucide-react'

interface LeaderboardEntry {
    rank: number
    full_name: string
    department: string
    year: number
    total_score: number
    badges: string[]
}

export default function LeaderboardPage() {
    const { session } = useAuth()
    const [entries, setEntries] = useState<LeaderboardEntry[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchLeaderboard = async () => {
            if (!session?.access_token) return
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/leaderboard`, {
                    headers: { 'Authorization': `Bearer ${session.access_token}` }
                })
                const data = await res.json()
                setEntries(data)
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        fetchLeaderboard()
    }, [session])

    if (loading) return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-100 border-t-[#000066] rounded-full animate-spin" />
            <p className="text-[#000066] font-black uppercase tracking-widest text-xs">Loading College Rankings...</p>
        </div>
    )

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
            <Navbar />
            <div className="max-w-7xl mx-auto pt-32 px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100 mb-6 mx-auto">
                        <Award className="w-4 h-4 text-[#000066]" />
                        <span className="text-[#000066] font-black text-[10px] uppercase tracking-widest">Elite performance tracker</span>
                    </div>
                    <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none uppercase mb-4">
                        College <span className="text-[#000066]">Leaderboard</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto uppercase tracking-wide">
                        The definitive ranking of technical and behavioral excellence.
                    </p>
                </div>

                <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-[#000066] text-white uppercase text-[10px] font-black tracking-[0.2em]">
                                    <th className="py-6 px-10">Rank</th>
                                    <th className="py-6 px-10">Candidate</th>
                                    <th className="py-6 px-10">Academic Info</th>
                                    <th className="py-6 px-10 text-right">Performance Score</th>
                                    <th className="py-6 px-10 text-center">Achievements</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {entries.map((entry) => (
                                    <tr key={entry.rank} className="hover:bg-slate-50 transition-all group">
                                        <td className="py-8 px-10">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm border ${entry.rank === 1 ? 'bg-amber-50 border-amber-200 text-amber-600 shadow-amber-900/10' :
                                                    entry.rank === 2 ? 'bg-slate-50 border-slate-200 text-slate-500' :
                                                        entry.rank === 3 ? 'bg-orange-50 border-orange-200 text-orange-600' :
                                                            'bg-white border-slate-100 text-slate-400'
                                                    }`}>
                                                    {entry.rank === 1 ? <Crown className="w-6 h-6" /> : entry.rank}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-8 px-10">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                                                    <User className="w-5 h-5 text-slate-400" />
                                                </div>
                                                <span className="font-black text-slate-900 text-lg uppercase tracking-tight">{entry.full_name}</span>
                                            </div>
                                        </td>
                                        <td className="py-8 px-10 text-slate-500 font-bold uppercase text-xs tracking-wider">
                                            {entry.department} <span className="mx-2 text-slate-200">|</span> Year {entry.year}
                                        </td>
                                        <td className="py-8 px-10 text-right">
                                            <span className="font-black text-2xl text-[#000066] tracking-tighter">
                                                {entry.total_score.toFixed(1)}<span className="text-sm opacity-50 ml-1">%</span>
                                            </span>
                                        </td>
                                        <td className="py-8 px-10">
                                            <div className="flex flex-wrap gap-2 justify-center">
                                                {entry.badges.map(b => (
                                                    <span key={b} className="bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-slate-200">
                                                        {b}
                                                    </span>
                                                ))}
                                                {entry.rank <= 3 && (
                                                    <span className="bg-[#000066] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg">
                                                        Top Performer
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
