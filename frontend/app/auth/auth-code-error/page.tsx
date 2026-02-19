'use client'

import Link from 'next/link'
import { AlertTriangle, ArrowRight } from 'lucide-react'

export default function AuthErrorPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl shadow-blue-900/5 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>

                <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
                    Authentication Error
                </h1>

                <p className="text-slate-500 font-medium mb-8">
                    There was an issue verifying your sign-in link. This can happen if the link has expired or has already been used.
                </p>

                <div className="space-y-3">
                    <Link
                        href="/login"
                        className="flex items-center justify-center gap-2 w-full bg-[#000066] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-900 transition-all"
                    >
                        Back to Login
                        <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                        href="/register"
                        className="flex items-center justify-center w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-[#000066] transition-colors"
                    >
                        Create New Account
                    </Link>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        Need help? Contact Support
                    </p>
                </div>
            </div>
        </div>
    )
}
