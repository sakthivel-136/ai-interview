'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function ProfileSetupPage() {
    const { user } = useAuth()
    const [fullName, setFullName] = useState('')
    const [rollNumber, setRollNumber] = useState('')
    const [department, setDepartment] = useState('')
    const [year, setYear] = useState('1')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        // If we land here, check if profile actually exists, if so redirect to dashboard
        const checkProfile = async () => {
            if (!user) return
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single()

            if (data && !error) {
                router.push('/dashboard')
            }
        }
        checkProfile()
    }, [user, router, supabase])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return

        setLoading(true)
        setError(null)

        const { error } = await supabase
            .from('profiles')
            .insert({
                id: user.id,
                full_name: fullName,
                roll_number: rollNumber,
                department: department,
                year: parseInt(year),
            })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            router.push('/dashboard')
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#000066]" />

            <div className="w-full max-w-md space-y-12">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2.5rem] bg-white border border-slate-100 shadow-2xl shadow-blue-900/10 mb-8 mx-auto">
                        <span className="text-[#000066] font-black text-3xl tracking-tighter">V</span>
                    </div>
                    <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">
                        Profile <span className="text-[#000066]">Config</span>
                    </h2>
                    <p className="mt-3 text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
                        Define your professional parameters
                    </p>
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Legal Name</label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    className="block w-full rounded-2xl border-slate-100 bg-slate-50 py-4 text-slate-900 font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-blue-50 focus:border-[#000066] transition-all"
                                    placeholder="e.g. Alexander Vance"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Institutional ID / Roll</label>
                                <input
                                    id="rollNumber"
                                    name="rollNumber"
                                    type="text"
                                    required
                                    className="block w-full rounded-2xl border-slate-100 bg-slate-50 py-4 text-slate-900 font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-blue-50 focus:border-[#000066] transition-all"
                                    placeholder="Enter identifier"
                                    value={rollNumber}
                                    onChange={(e) => setRollNumber(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Division</label>
                                    <select
                                        id="department"
                                        name="department"
                                        required
                                        className="block w-full rounded-2xl border-slate-100 bg-slate-50 py-4 text-slate-900 font-black text-[10px] uppercase tracking-widest focus:ring-4 focus:ring-blue-50 focus:border-[#000066] transition-all appearance-none text-center"
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                    >
                                        <option value="" disabled>Select</option>
                                        <option value="CSE">CSE</option>
                                        <option value="ECE">ECE</option>
                                        <option value="EEE">EEE</option>
                                        <option value="IT">IT</option>
                                        <option value="Mechanical">Mechanical</option>
                                        <option value="Civil">Civil</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Timeline</label>
                                    <select
                                        id="year"
                                        name="year"
                                        required
                                        className="block w-full rounded-2xl border-slate-100 bg-slate-50 py-4 text-slate-900 font-black text-[10px] uppercase tracking-widest focus:ring-4 focus:ring-blue-50 focus:border-[#000066] transition-all appearance-none text-center"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                    >
                                        <option value="1">Year 01</option>
                                        <option value="2">Year 02</option>
                                        <option value="3">Year 03</option>
                                        <option value="4">Year 04</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 rounded-xl border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-wider text-center">{error}</div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full justify-center items-center gap-3 rounded-2xl bg-[#000066] px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-blue-900 transition-all shadow-xl shadow-blue-900/20 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Finalize Profile
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]">
                    VANTAGE Secure System &copy; 2026
                </p>
            </div>
        </div>
    )
}
