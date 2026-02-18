'use client'

import Link from 'next/link'
import { ChevronRight, Shield, Zap, BarChart3, Globe, Award } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react'

export default function Home() {
  const { user, isLoading } = useAuth()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* Navbar - Custom for Landing Page */}
      <nav className="absolute top-0 left-0 w-full z-50 bg-[#000066] border-b border-white/10 h-20 flex items-center shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-white tracking-tighter uppercase">
                VANTAGE
              </span>
            </div>

            {/* Auth Actions */}
            <div className="flex items-center gap-6">
              {mounted && !isLoading && user ? (
                <Link href="/dashboard" className="bg-white text-[#000066] px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all hover:bg-blue-50 shadow-xl shadow-black/20 flex items-center gap-2">
                  Enter Dashboard <ChevronRight className="w-3 h-3" />
                </Link>
              ) : (
                <>
                  <Link href="/login" className="text-white/80 hover:text-white text-xs font-black uppercase tracking-widest transition-colors">
                    Authorized Access
                  </Link>
                  <Link href="/register" className="bg-white text-[#000066] px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all hover:bg-blue-50 shadow-xl shadow-black/20">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 pt-48 pb-24 bg-slate-50 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Shield className="w-4 h-4 text-[#000066]" />
            <span className="text-[#000066] font-black text-[10px] uppercase tracking-[0.2em]">Enterprise Grade Intelligence</span>
          </div>

          <h1 className="text-7xl sm:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] uppercase mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Precision <br />
            <span className="text-[#000066]">Performance</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-slate-500 mb-12 font-bold uppercase tracking-tight leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000">
            The world's most advanced neural interview intelligence platform. Built for elite candidates.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <Link href={user ? "/dashboard" : "/register"}>
              <button className="px-10 py-5 bg-[#000066] text-white rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-900 transition-all shadow-2xl shadow-blue-900/20 flex items-center gap-3 group">
                {user ? "Resume Session" : "Initialize Practice"}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="#features">
              <button className="px-10 py-5 bg-white text-slate-900 border border-slate-200 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 transition-all shadow-lg">
                System Overview
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">Core Ecosystem</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Unified preparation for every technical transition.</p>
            </div>
            <div className="h-px bg-slate-100 flex-1 hidden md:block mb-4 mx-12" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              title="Coding Infrastructure"
              desc="Proprietary IDE integration for real-time algorithmic evaluation."
              icon={<Zap className="w-8 h-8" />}
            />
            <FeatureCard
              title="Neural Mocking"
              desc="Advanced behavioral analysis powered by proprietary neural architecture."
              icon={<Globe className="w-8 h-8" />}
            />
            <FeatureCard
              title="College Ranking"
              desc="Verified performance metrics visualized on a competitive college scale."
              icon={<BarChart3 className="w-8 h-8" />}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#000066] py-16">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="text-white font-black text-2xl tracking-tighter uppercase">VANTAGE</span>
          <div className="text-white/40 font-black text-[10px] uppercase tracking-[0.3em]">
            &copy; 2026 VANTAGE INTELLIGENCE. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 group">
      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#000066] shadow-sm border border-slate-100 mb-8 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">{title}</h3>
      <p className="text-slate-500 font-medium leading-relaxed uppercase text-[11px] tracking-wider">{desc}</p>
    </div>
  )
}
