'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { ChevronRight, Shield, Award, Terminal, MessageSquare, BadgeCheck } from 'lucide-react'

export default function MockIntroPage() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
            <Navbar />
            <div className="max-w-6xl mx-auto pt-32 px-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100 mb-8 mx-auto">
                    <Shield className="w-4 h-4 text-[#000066]" />
                    <span className="text-[#000066] font-black text-[10px] uppercase tracking-widest">Protocol-Gated Assessment</span>
                </div>

                <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase mb-6">
                    Autonomous <span className="text-[#000066]">Mock Interview</span>
                </h1>

                <p className="text-xl text-slate-500 font-bold uppercase tracking-tight max-w-2xl mx-auto mb-16">
                    A rigorous 4-phase evaluation pipeline. Each phase must be cleared to activate subsequent system levels.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                    <RoundCard
                        num="01"
                        title="Aptitude"
                        desc="Quant & Logic analysis. 70% proficiency required."
                        active={true}
                        icon={<BadgeCheck className="w-5 h-5" />}
                    />
                    <RoundCard
                        num="02"
                        title="Coding"
                        desc="Algorithmic problem solving and logic complexity."
                        active={false}
                        icon={<Terminal className="w-5 h-5" />}
                    />
                    <RoundCard
                        num="03"
                        title="Behavioral"
                        desc="Soft skill quantification via neural processing."
                        active={false}
                        icon={<MessageSquare className="w-5 h-5" />}
                    />
                    <RoundCard
                        num="04"
                        title="Technical"
                        desc="Executive deep-dive into specialized domains."
                        active={false}
                        icon={<Award className="w-5 h-5" />}
                    />
                </div>

                <Link href="/mock/aptitude">
                    <button className="bg-[#000066] hover:bg-blue-900 text-white font-black py-5 px-16 rounded-full text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-900/20 transition-all flex items-center gap-3 mx-auto group">
                        Initialize Phase 01: Aptitude
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </Link>
            </div>
        </div>
    )
}

function RoundCard({ num, title, desc, active, icon }: { num: string, title: string, desc: string, active: boolean, icon: React.ReactNode }) {
    return (
        <div className={`p-8 rounded-[2.5rem] border transition-all ${active ? 'border-[#000066] bg-white shadow-2xl shadow-blue-900/5' : 'border-slate-100 bg-slate-50 opacity-40'}`}>
            <div className={`text-[10px] font-black mb-6 uppercase tracking-[0.2em] ${active ? 'text-[#000066]' : 'text-slate-400'}`}>Phase {num}</div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${active ? 'bg-[#000066] text-white' : 'bg-slate-100 text-slate-400'}`}>
                {icon}
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-tight">{title}</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-relaxed">{desc}</p>
        </div>
    )
}
