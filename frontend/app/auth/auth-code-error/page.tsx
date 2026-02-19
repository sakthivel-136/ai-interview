'use client'

import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export default function AuthErrorPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl shadow-blue-900/5 text-center">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>

                <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
                    Authentication Success
                </h1>

                <p className="text-slate-500 font-medium mb-8">
                    Your email has been verified successfully. You can now proceed to login.
                </p>

                <div className="space-y-3">
                    <Link
                        href="/login"
                        className="flex items-center justify-center gap-2 w-full bg-[#000066] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-900 transition-all"
                    >
                        Back to Login
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
