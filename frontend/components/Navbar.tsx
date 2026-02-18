'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, LayoutDashboard, Code2, Mic, Trophy, LogOut } from 'lucide-react'

const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/practice', label: 'Practice', icon: Code2 },
    { href: '/mock-intro', label: 'Mock Interview', icon: Mic },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
]

export default function Navbar() {
    const { user, signOut } = useAuth()
    const [mobileOpen, setMobileOpen] = useState(false)
    const pathname = usePathname()

    // Hide navbar entirely on public landing page, login, and register pages.
    // The landing page has its own specialized header.
    const isPublicPage = ['/', '/login', '/register'].includes(pathname)
    if (isPublicPage) return null

    if (!user) return null

    return (
        <nav className="bg-[#000066] border-b border-white/10 fixed top-0 left-0 right-0 z-[100] h-16 flex items-center shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex items-center justify-between h-full">
                    {/* Logo */}
                    <Link href="/dashboard" className="flex-shrink-0 text-white font-black text-2xl tracking-tighter uppercase transition-colors hover:text-blue-100">
                        VANTAGE
                    </Link>

                    <div className="hidden md:flex items-center space-x-2">
                        {navLinks.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 ${pathname.startsWith(href)
                                    ? 'bg-white text-[#000066]'
                                    : 'text-white/90 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => signOut()}
                            className="hidden md:flex items-center gap-1.5 text-white/70 hover:text-rose-400 hover:bg-white/5 px-3 py-2 rounded-lg text-sm font-bold transition-all duration-200"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden lg:inline">Sign Out</span>
                        </button>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 border-b border-white/10 bg-[#000066] px-4 py-4 space-y-1 shadow-2xl animate-in slide-in-from-top-2 duration-200">
                    {navLinks.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${pathname.startsWith(href)
                                ? 'bg-white text-[#000066]'
                                : 'text-white/90 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            <Icon className="w-5 h-5 opacity-70" />
                            {label}
                        </Link>
                    ))}
                    <button
                        onClick={() => { signOut(); setMobileOpen(false) }}
                        className="flex items-center gap-3 w-full text-left text-white/60 hover:text-rose-400 hover:bg-rose-400/10 px-4 py-3 rounded-xl text-sm font-bold transition-colors"
                    >
                        <LogOut className="w-5 h-5 opacity-70" />
                        Sign Out
                    </button>
                </div>
            )}
        </nav>
    )
}
