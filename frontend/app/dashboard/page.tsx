'use client'

// Force dynamic rendering to ensure this page is never statically generated
export const dynamic = 'force-dynamic'

import React, { Suspense } from 'react'
import Navbar from '@/components/Navbar'
import dynamicImport from 'next/dynamic'

// Dynamically import the client component with SSR disabled
// This guarantees that useSearchParams (which is inside DashboardClient)
// is only executed on the client, completely bypassing static generation issues.
const DashboardClient = dynamicImport(() => import('./DashboardClient'), {
    ssr: false,
    loading: () => (
        <div className="flex h-screen items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-100 border-t-[#000066] rounded-full animate-spin"></div>
                <p className="font-bold text-xs uppercase tracking-[0.2em] text-slate-400">Loading Intelligence...</p>
            </div>
        </div>
    )
})

export default function DashboardPage() {
    return (
        <>
            <Navbar />
            <Suspense fallback={
                <div className="flex h-screen items-center justify-center bg-white">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-blue-100 border-t-[#000066] rounded-full animate-spin"></div>
                        <p className="font-bold text-xs uppercase tracking-[0.2em] text-slate-400">Loading Intelligence...</p>
                    </div>
                </div>
            }>
                <DashboardClient />
            </Suspense>
        </>
    )
}