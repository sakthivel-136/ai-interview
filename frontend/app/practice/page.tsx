'use client'

import { useEffect, useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Target, ChevronRight, Terminal, CheckCircle2, Search, SlidersHorizontal, X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { codingProblems } from '@/data/coding'

interface Problem {
    id: string
    title: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
    category: string
}

type Difficulty = 'All' | 'Easy' | 'Medium' | 'Hard'

const ALL_CATEGORIES = [
    'All', 'Arrays', 'Strings', 'Math', 'Linked List', 'Trees', 'Stacks',
    'Dynamic Programming', 'Binary Search', 'Two Pointers', 'Sliding Window',
    'Hash Table', 'Graph', 'DFS/BFS', 'Heap', 'Sorting', 'Backtracking',
    'Bit Manipulation', 'Divide and Conquer', 'Math/Dynamic Programming'
]

const DIFFICULTY_CONFIG: Record<Difficulty, { label: string; color: string; active: string }> = {
    All: { label: 'All', color: 'text-slate-500 bg-white border-slate-200 hover:border-[#000066]/30', active: 'text-white bg-[#000066] border-[#000066]' },
    Easy: { label: 'Easy', color: 'text-emerald-600 bg-white border-emerald-200 hover:border-emerald-400', active: 'text-white bg-emerald-500 border-emerald-500' },
    Medium: { label: 'Medium', color: 'text-amber-600 bg-white border-amber-200 hover:border-amber-400', active: 'text-white bg-amber-500 border-amber-500' },
    Hard: { label: 'Hard', color: 'text-rose-600 bg-white border-rose-200 hover:border-rose-400', active: 'text-white bg-rose-500 border-rose-500' },
}

export default function PracticePage() {
    const { session } = useAuth()
    const [problems] = useState<Problem[]>(codingProblems as Problem[])
    const [completedTitles, setCompletedTitles] = useState<Set<string>>(new Set())
    const [loading, setLoading] = useState(true)

    // Filter state
    const [difficulty, setDifficulty] = useState<Difficulty>('All')
    const [category, setCategory] = useState('All')
    const [search, setSearch] = useState('')
    const [showCompleted, setShowCompleted] = useState(true)

    const supabase = createClient()

    useEffect(() => {
        const fetchCompletionStatus = async () => {
            if (!session?.user) { setLoading(false); return }
            try {
                const { data } = await supabase
                    .from('submissions')
                    .select('problem_id, problems(title)')
                    .eq('user_id', session.user.id)
                    .eq('status', 'Pass')

                if (data) {
                    const titles = new Set<string>(
                        data.map((row: any) => row.problems?.title).filter(Boolean)
                    )
                    setCompletedTitles(titles)
                }
            } catch (e) {
                console.error('Error fetching completion status:', e)
            } finally {
                setLoading(false)
            }
        }
        fetchCompletionStatus()
    }, [session])

    const filteredProblems = useMemo(() => {
        return problems.filter(p => {
            const matchesDifficulty = difficulty === 'All' || p.difficulty === difficulty
            const matchesCategory = category === 'All' || p.category === category
            const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase())
            const matchesCompleted = showCompleted || !completedTitles.has(p.title)
            return matchesDifficulty && matchesCategory && matchesSearch && matchesCompleted
        })
    }, [problems, difficulty, category, search, showCompleted, completedTitles])

    const counts = useMemo(() => ({
        total: problems.length,
        easy: problems.filter(p => p.difficulty === 'Easy').length,
        medium: problems.filter(p => p.difficulty === 'Medium').length,
        hard: problems.filter(p => p.difficulty === 'Hard').length,
        completed: completedTitles.size,
    }), [problems, completedTitles])

    const getDifficultyBadgeColor = (diff: string) => {
        switch (diff) {
            case 'Easy': return 'text-emerald-600 bg-emerald-50 border-emerald-100'
            case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-100'
            case 'Hard': return 'text-rose-600 bg-rose-50 border-rose-100'
            default: return 'text-slate-400 bg-slate-50 border-slate-100'
        }
    }

    const hasActiveFilters = difficulty !== 'All' || category !== 'All' || search !== '' || !showCompleted

    const clearFilters = () => {
        setDifficulty('All')
        setCategory('All')
        setSearch('')
        setShowCompleted(true)
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8 pt-24">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-end mb-10">
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

                {/* Stats Row */}
                <div className="grid grid-cols-5 gap-3 mb-8">
                    {[
                        { label: 'Total', value: counts.total, color: 'text-[#000066]' },
                        { label: 'Easy', value: counts.easy, color: 'text-emerald-600' },
                        { label: 'Medium', value: counts.medium, color: 'text-amber-500' },
                        { label: 'Hard', value: counts.hard, color: 'text-rose-500' },
                        { label: 'Solved', value: counts.completed, color: 'text-emerald-600' },
                    ].map(stat => (
                        <div key={stat.label} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm text-center">
                            <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Filter Panel */}
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-blue-900/5 p-6 mb-6">
                    <div className="flex items-center gap-2 mb-5">
                        <SlidersHorizontal className="w-4 h-4 text-[#000066]" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Filters</span>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest transition-all"
                            >
                                <X className="w-3 h-3" /> Clear All
                            </button>
                        )}
                    </div>

                    {/* Search */}
                    <div className="relative mb-5">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <input
                            type="text"
                            placeholder="Search problems..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#000066]/10 focus:border-[#000066]/30 transition-all"
                        />
                        {search && (
                            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                                <X className="w-4 h-4 text-slate-300 hover:text-slate-500" />
                            </button>
                        )}
                    </div>

                    {/* Difficulty Filter */}
                    <div className="mb-5">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Difficulty</p>
                        <div className="flex gap-2 flex-wrap">
                            {(['All', 'Easy', 'Medium', 'Hard'] as Difficulty[]).map(d => {
                                const cfg = DIFFICULTY_CONFIG[d]
                                const isActive = difficulty === d
                                return (
                                    <button
                                        key={d}
                                        onClick={() => setDifficulty(d)}
                                        className={`px-5 py-2 rounded-xl border font-black text-[10px] uppercase tracking-widest transition-all ${isActive ? cfg.active : cfg.color}`}
                                    >
                                        {d === 'All' ? `All (${counts.total})` :
                                            d === 'Easy' ? `Easy (${counts.easy})` :
                                                d === 'Medium' ? `Medium (${counts.medium})` :
                                                    `Hard (${counts.hard})`}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-5">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Category</p>
                        <div className="flex gap-2 flex-wrap">
                            {ALL_CATEGORIES.map(cat => {
                                const isActive = category === cat
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={`px-4 py-1.5 rounded-xl border font-black text-[9px] uppercase tracking-widest transition-all ${isActive
                                                ? 'text-white bg-[#000066] border-[#000066]'
                                                : 'text-slate-500 bg-white border-slate-200 hover:border-[#000066]/30 hover:text-[#000066]'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Hide Completed Toggle */}
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                        <button
                            onClick={() => setShowCompleted(!showCompleted)}
                            className={`relative w-10 h-5 rounded-full transition-all duration-300 ${showCompleted ? 'bg-slate-200' : 'bg-[#000066]'}`}
                        >
                            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${showCompleted ? 'left-0.5' : 'left-5'}`} />
                        </button>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            {showCompleted ? 'Showing completed problems' : 'Hiding completed problems'}
                        </span>
                    </div>
                </div>

                {/* Results count */}
                <div className="flex items-center justify-between mb-4 px-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {filteredProblems.length} problem{filteredProblems.length !== 1 ? 's' : ''} found
                    </p>
                    {hasActiveFilters && (
                        <span className="text-[9px] font-black text-[#000066] uppercase tracking-widest">
                            Filtered from {counts.total} total
                        </span>
                    )}
                </div>

                {/* Problem List */}
                {loading ? (
                    <div className="flex flex-col items-center gap-4 py-24">
                        <div className="w-10 h-10 border-4 border-blue-100 border-t-[#000066] rounded-full animate-spin" />
                        <p className="font-black text-[10px] uppercase tracking-widest text-slate-400">Loading Arena...</p>
                    </div>
                ) : filteredProblems.length === 0 ? (
                    <div className="bg-white p-16 rounded-[2.5rem] text-center border border-slate-100 shadow-xl shadow-blue-900/5">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Search className="w-7 h-7 text-slate-300" />
                        </div>
                        <p className="font-black text-slate-400 uppercase tracking-widest text-sm mb-2">No problems match your filters</p>
                        <button onClick={clearFilters} className="mt-4 px-6 py-2 bg-[#000066] text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-blue-900 transition-all">
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-3">
                        {filteredProblems.map((problem) => {
                            const isCompleted = completedTitles.has(problem.title)
                            return (
                                <Link key={problem.id} href={`/practice/${problem.id}`}>
                                    <div className={`bg-white p-6 rounded-[2rem] border transition-all flex justify-between items-center group relative overflow-hidden ${isCompleted
                                            ? 'border-emerald-200 bg-emerald-50/20 hover:shadow-lg hover:shadow-emerald-900/5'
                                            : 'border-slate-100 hover:border-[#000066]/20 hover:shadow-xl hover:shadow-blue-900/10'
                                        }`}>
                                        <div className="flex items-center gap-5">
                                            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all flex-shrink-0 ${isCompleted
                                                    ? 'bg-emerald-500 border-emerald-500'
                                                    : 'bg-slate-50 border-slate-100 group-hover:bg-[#000066] group-hover:border-[#000066]'
                                                }`}>
                                                {isCompleted
                                                    ? <CheckCircle2 className="w-5 h-5 text-white" />
                                                    : <Terminal className="w-4 h-4 text-slate-400 group-hover:text-white transition-all" />
                                                }
                                            </div>
                                            <div>
                                                <h3 className={`text-base font-black tracking-tight uppercase transition-colors ${isCompleted ? 'text-emerald-700' : 'text-slate-900 group-hover:text-[#000066]'
                                                    }`}>
                                                    {problem.title}
                                                </h3>
                                                <p className="text-[9px] font-black text-slate-400 mt-0.5 uppercase tracking-widest">{problem.category}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 flex-shrink-0">
                                            {isCompleted && (
                                                <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border bg-emerald-100 text-emerald-700 border-emerald-200">
                                                    ✓ Done
                                                </span>
                                            )}
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getDifficultyBadgeColor(problem.difficulty)}`}>
                                                {problem.difficulty}
                                            </span>
                                            <ChevronRight className={`w-4 h-4 transition-all ${isCompleted ? 'text-emerald-400' : 'text-slate-300 group-hover:text-[#000066]'}`} />
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
            <p className="text-center text-[10px] text-slate-300 font-black uppercase tracking-[0.3em] mt-16 pb-8">
                VANTAGE Intelligence Platform &copy; 2026
            </p>
        </div>
    )
}
