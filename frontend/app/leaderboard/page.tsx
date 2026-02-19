'use client'

import { useEffect, useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'
import { useAuth } from '@/context/AuthContext'
import { Trophy, Award, Crown, Medal, User, ChevronDown } from 'lucide-react'
import { DEPARTMENTS } from '@/data/leaderboard'

interface LeaderboardEntry {
    rank: number
    full_name: string
    department: string
    year: number
    total_score: number
    badges: string[]
}

function RankBadge({ rank }: { rank: number }) {
    if (rank === 1) return (
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-amber-50 border border-amber-200 shadow-sm shadow-amber-900/10">
            <Crown className="w-6 h-6 text-amber-500" />
        </div>
    )
    if (rank === 2) return (
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-100 border border-slate-200 font-black text-xl text-slate-500">
            2
        </div>
    )
    if (rank === 3) return (
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-orange-50 border border-orange-200 font-black text-xl text-orange-500">
            3
        </div>
    )
    return (
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white border border-slate-100 font-black text-lg text-slate-400">
            {rank}
        </div>
    )
}

function LeaderboardTable({ entries, showRank = true }: { entries: LeaderboardEntry[], showRank?: boolean }) {
    return (
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#000066] text-white uppercase text-[10px] font-black tracking-[0.2em]">
                            <th className="py-5 px-8">Rank</th>
                            <th className="py-5 px-8">Candidate</th>
                            <th className="py-5 px-8">Dept & Year</th>
                            <th className="py-5 px-8 text-right">Score</th>
                            <th className="py-5 px-8 text-center">Badges</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {entries.map((entry, idx) => (
                            <tr key={`${entry.full_name}-${idx}`}
                                className={`hover:bg-slate-50/80 transition-all group ${entry.rank <= 3 ? 'bg-gradient-to-r from-amber-50/30 to-transparent' : ''}`}>
                                <td className="py-6 px-8">
                                    <RankBadge rank={showRank ? entry.rank : idx + 1} />
                                </td>
                                <td className="py-6 px-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 flex-shrink-0">
                                            <User className="w-4 h-4 text-slate-400" />
                                        </div>
                                        <span className="font-black text-slate-900 uppercase tracking-tight">{entry.full_name}</span>
                                    </div>
                                </td>
                                <td className="py-6 px-8 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                                    {entry.department}
                                    <span className="mx-2 text-slate-200">|</span>
                                    Year {entry.year}
                                </td>
                                <td className="py-6 px-8 text-right">
                                    <span className="font-black text-xl text-[#000066] tracking-tighter">
                                        {entry.total_score.toFixed(1)}<span className="text-xs opacity-40 ml-0.5">%</span>
                                    </span>
                                </td>
                                <td className="py-6 px-8">
                                    <div className="flex flex-wrap gap-1.5 justify-center">
                                        {entry.badges.map(b => (
                                            <span key={b} className="bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border border-slate-200">
                                                {b}
                                            </span>
                                        ))}
                                        {entry.rank <= 3 && (
                                            <span className="bg-[#000066] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
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
    )
}

export default function LeaderboardPage() {
    const { session, isLoading: authLoading } = useAuth()
    const [allEntries, setAllEntries] = useState<LeaderboardEntry[]>([])
    const [selectedDept, setSelectedDept] = useState<string>('All')
    const [deptDropdownOpen, setDeptDropdownOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchLeaderboard = async () => {
            // 1. Wait for Auth to finish initialization
            if (authLoading) return

            // 2. If no session after init, stop loading (user not logged in)
            if (!session?.access_token) {
                setLoading(false)
                return
            }

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/leaderboard`, {
                    headers: { 'Authorization': `Bearer ${session.access_token}` }
                })
                const data = await res.json()
                if (Array.isArray(data)) setAllEntries(data)
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        fetchLeaderboard()
    }, [session, authLoading])

    // College Top 20 (overall)
    const collegeTop20 = useMemo(() =>
        [...allEntries].sort((a, b) => b.total_score - a.total_score).slice(0, 20),
        [allEntries]
    )

    // Department Top 20
    const deptTop20 = useMemo(() => {
        if (selectedDept === 'All') return []
        return [...allEntries]
            .filter(e => e.department === selectedDept)
            .sort((a, b) => b.total_score - a.total_score)
            .slice(0, 20)
    }, [allEntries, selectedDept])

    const allDepts = ['All', ...DEPARTMENTS]

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
            <Navbar />
            <div className="max-w-6xl mx-auto pt-32 px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100 mb-6 mx-auto">
                        <Award className="w-4 h-4 text-[#000066]" />
                        <span className="text-[#000066] font-black text-[10px] uppercase tracking-widest">Elite Performance Tracker</span>
                    </div>
                    <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none uppercase mb-4">
                        College <span className="text-[#000066]">Leaderboard</span>
                    </h1>
                    <p className="text-lg text-slate-400 font-bold uppercase tracking-widest max-w-xl mx-auto">
                        The definitive ranking of technical & behavioral excellence
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-blue-100 border-t-[#000066] rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest animate-pulse">Calculating Ranks...</p>
                    </div>
                ) : allEntries.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-900/5">
                        <Trophy className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-black text-slate-900 mb-2">No Rankings Yet</h3>
                        <p className="text-slate-500 max-w-md mx-auto">Be the first to complete the interview protocol to appear on the leaderboard.</p>
                    </div>
                ) : (
                    <>
                        {/* ── SECTION 1: College Top 20 ── */}
                        <div className="mb-16">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                                    <Trophy className="w-5 h-5 text-amber-500" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">College Top 20</h2>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Overall best performers across all departments</p>
                                </div>
                            </div>

                            {/* Podium for top 3 */}
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                {/* 2nd place */}
                                <div className="bg-white rounded-[2rem] border border-slate-100 p-6 flex flex-col items-center text-center shadow-lg shadow-blue-900/5 mt-8">
                                    <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center mb-3">
                                        <User className="w-7 h-7 text-slate-400" />
                                    </div>
                                    <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-500 text-lg mb-2">2</div>
                                    <p className="font-black text-slate-900 uppercase tracking-tight text-sm">{collegeTop20[1]?.full_name || 'N/A'}</p>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{collegeTop20[1]?.department || '-'}</p>
                                    <p className="text-2xl font-black text-slate-600 mt-3">{collegeTop20[1]?.total_score.toFixed(1) || 0}<span className="text-xs opacity-40">%</span></p>
                                </div>
                                {/* 1st place */}
                                <div className="bg-gradient-to-b from-amber-50 to-white rounded-[2rem] border-2 border-amber-200 p-6 flex flex-col items-center text-center shadow-xl shadow-amber-900/10 -mt-4">
                                    <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center mb-3">
                                        <User className="w-8 h-8 text-amber-500" />
                                    </div>
                                    <Crown className="w-6 h-6 text-amber-500 mb-2" />
                                    <p className="font-black text-slate-900 uppercase tracking-tight">{collegeTop20[0]?.full_name || 'N/A'}</p>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{collegeTop20[0]?.department || '-'}</p>
                                    <p className="text-3xl font-black text-[#000066] mt-3">{collegeTop20[0]?.total_score.toFixed(1) || 0}<span className="text-sm opacity-40">%</span></p>
                                    <span className="mt-3 px-3 py-1 bg-amber-100 text-amber-700 text-[9px] font-black uppercase tracking-widest rounded-full border border-amber-200">🏆 College Topper</span>
                                </div>
                                {/* 3rd place */}
                                <div className="bg-white rounded-[2rem] border border-slate-100 p-6 flex flex-col items-center text-center shadow-lg shadow-blue-900/5 mt-8">
                                    <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center mb-3">
                                        <User className="w-7 h-7 text-slate-400" />
                                    </div>
                                    <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center font-black text-orange-500 text-lg mb-2">3</div>
                                    <p className="font-black text-slate-900 uppercase tracking-tight text-sm">{collegeTop20[2]?.full_name || 'N/A'}</p>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{collegeTop20[2]?.department || '-'}</p>
                                    <p className="text-2xl font-black text-slate-600 mt-3">{collegeTop20[2]?.total_score.toFixed(1) || 0}<span className="text-xs opacity-40">%</span></p>
                                </div>
                            </div>

                            {/* Full top 20 table */}
                            <LeaderboardTable entries={collegeTop20} showRank={true} />
                        </div>
                    </>
                )}

                {/* ── SECTION 2: Department Leaderboard ── */}
                <div>
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                                <Medal className="w-5 h-5 text-[#000066]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Department Top 20</h2>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select a department to view its top performers</p>
                            </div>
                        </div>

                        {/* Department Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setDeptDropdownOpen(!deptDropdownOpen)}
                                className="flex items-center gap-3 px-5 py-3 bg-white border border-slate-200 rounded-2xl font-black text-sm text-slate-700 uppercase tracking-wide hover:border-[#000066]/30 hover:shadow-md transition-all min-w-[260px] justify-between"
                            >
                                <span>{selectedDept === 'All' ? 'Select Department' : selectedDept}</span>
                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${deptDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {deptDropdownOpen && (
                                <div className="absolute top-full mt-2 right-0 bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-blue-900/10 z-50 min-w-[260px] overflow-hidden">
                                    {allDepts.map(dept => (
                                        <button
                                            key={dept}
                                            onClick={() => { setSelectedDept(dept); setDeptDropdownOpen(false) }}
                                            className={`w-full text-left px-5 py-3 text-[11px] font-black uppercase tracking-widest transition-all ${selectedDept === dept
                                                ? 'bg-[#000066] text-white'
                                                : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                        >
                                            {dept === 'All' ? '— All Departments —' : dept}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {selectedDept === 'All' ? (
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-900/5 p-16 text-center">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Medal className="w-7 h-7 text-[#000066]" />
                            </div>
                            <p className="font-black text-slate-400 uppercase tracking-widest text-sm">Select a department above to view its top 20 rankers</p>
                        </div>
                    ) : deptTop20.length === 0 ? (
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-900/5 p-16 text-center">
                            <p className="font-black text-slate-400 uppercase tracking-widest text-sm">No data available for {selectedDept}</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-4 flex items-center gap-2">
                                <span className="px-3 py-1 bg-[#000066] text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                                    {selectedDept}
                                </span>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    — {deptTop20.length} student{deptTop20.length !== 1 ? 's' : ''} ranked
                                </span>
                            </div>
                            <LeaderboardTable entries={deptTop20} showRank={false} />
                        </>
                    )}
                </div>

            </div>
            <p className="text-center text-[10px] text-slate-300 font-black uppercase tracking-[0.3em] mt-16 pb-4">
                VANTAGE Intelligence Platform © 2026
            </p>
        </div>
    )
}
