"use client";

import { useState, useEffect, useRef } from "react";
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, RefreshCw, Shield, Zap } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";

interface ResumeAnalysis {
    ats_score: number;
    keywords_missing: string[];
    suggestions: string;
    generated_questions: string[];
}

const PROGRESS_STEPS = [
    "Parsing Document...",
    "Running AI Analysis...",
    "Generating Insights...",
    "Finalizing Report...",
];

export default function ResumeUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [text, setText] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [progressStep, setProgressStep] = useState(0);
    const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<"file" | "text">("text");
    const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        fetchAnalysis();
    }, []);

    const fetchAnalysis = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const res = await fetch(`${apiUrl}/resume/`, {
                headers: {
                    Authorization: `Bearer ${session.access_token}`,
                },
            });
            if (res.ok) {
                const data = await res.json();
                if (data && data.ats_score !== undefined) setAnalysis(data);
            }
        } catch (err) {
            console.log("No existing resume analysis found.");
        }
    };

    const handleUpload = async () => {
        if (!file && !text) {
            setError("SPECIFY SOURCE: PDF FILE OR TEXT BUFFER REQUIRED.");
            return;
        }

        setIsUploading(true);
        setProgressStep(0);
        setError("");

        // Cycle through progress steps every 800ms to show activity
        progressIntervalRef.current = setInterval(() => {
            setProgressStep(prev => (prev + 1) % PROGRESS_STEPS.length);
        }, 800);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                setError("AUTHORIZATION REQUIRED: PLEASE LOG IN.");
                setIsUploading(false);
                return;
            }

            const formData = new FormData();
            if (activeTab === "file" && file) {
                formData.append("file", file);
            } else if (activeTab === "text" && text) {
                formData.append("text", text);
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            console.log(`DEBUG: Starting neural analysis at ${apiUrl}/resume/analyze`);

            const res = await fetch(`${apiUrl}/resume/analyze`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${session.access_token}`,
                },
                body: formData,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!res.ok) {
                const errData = await res.json().catch(() => ({ detail: "Neural analysis failed" }));
                console.error("DEBUG: Analysis response not OK", errData);
                throw new Error(errData.detail || "Neural analysis failed");
            }

            const data = await res.json();
            console.log("DEBUG: Neural analysis complete", data);
            setAnalysis(data);
        } catch (err: any) {
            clearTimeout(timeoutId);
            console.error("DEBUG: Neural analysis error", err);
            const message = err.name === 'AbortError'
                ? "Neural link timed out. Please try a smaller file or faster connection."
                : (err instanceof Error ? err.message : "System anomaly detected");
            setError(message.toUpperCase());
        } finally {
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
            setIsUploading(false);
        }
    };

    const scoreColor = analysis
        ? analysis.ats_score >= 80
            ? "text-emerald-500"
            : analysis.ats_score >= 60
                ? "text-amber-500"
                : "text-rose-500"
        : "";

    return (
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-2xl shadow-blue-900/5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 rounded-2xl">
                        <FileText className="w-6 h-6 text-[#000066]" />
                    </div>
                    <div>
                        <span className="text-[#000066] font-black text-[10px] uppercase tracking-[0.2em]">Privacy-Gated</span>
                        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Neural Resume Analysis</h2>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                    <Shield className="w-3 h-3 text-emerald-600" />
                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Ephemeral Processing</span>
                </div>
            </div>

            {!analysis ? (
                <div className="space-y-8">
                    {/* Tabs */}
                    <div className="flex gap-8 border-b border-slate-50">
                        <button
                            onClick={() => setActiveTab("text")}
                            className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === "text"
                                ? "text-[#000066] border-b-2 border-[#000066]"
                                : "text-slate-300 hover:text-slate-600"
                                }`}
                        >
                            Paste Text
                        </button>
                        <button
                            onClick={() => setActiveTab("file")}
                            className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === "file"
                                ? "text-[#000066] border-b-2 border-[#000066]"
                                : "text-slate-300 hover:text-slate-600"
                                }`}
                        >
                            Upload PDF
                        </button>
                    </div>

                    {/* Input Area */}
                    {activeTab === "file" ? (
                        <div className="border-4 border-dotted border-slate-100 rounded-3xl p-12 text-center hover:border-[#000066]/20 transition-all bg-slate-50/50 group">
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                className="hidden"
                                id="resume-upload"
                            />
                            <label
                                htmlFor="resume-upload"
                                className="cursor-pointer flex flex-col items-center gap-4"
                            >
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-500">
                                    <Upload className="w-8 h-8 text-[#000066]" />
                                </div>
                                <span className="font-black text-slate-900 uppercase tracking-widest text-xs">
                                    {file ? file.name : "INITIALIZE PDF UPLOAD"}
                                </span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                    Format Restricted: PDF (Limit 5MB)
                                </span>
                            </label>
                        </div>
                    ) : (
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="INITIALIZE RESUME DATA INGESTION..."
                            className="w-full h-48 bg-slate-50 border border-slate-100 rounded-3xl p-6 text-sm text-slate-700 font-bold placeholder:text-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-[#000066] focus:outline-none resize-none transition-all"
                        />
                    )}

                    {/* Error */}
                    {error && (
                        <div className="p-4 bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-widest rounded-2xl flex items-center gap-3 border border-rose-100 animate-in fade-in slide-in-from-top-2">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        onClick={handleUpload}
                        disabled={isUploading}
                        className="w-full bg-[#000066] text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.3em] hover:bg-blue-900 transition-all shadow-2xl shadow-blue-900/20 disabled:opacity-60 flex items-center justify-center gap-3 active:scale-[0.98]"
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin flex-shrink-0" />
                                <span className="transition-all duration-300">{PROGRESS_STEPS[progressStep]}</span>
                            </>
                        ) : (
                            <>
                                Begin Analysis <Zap className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            ) : (
                <div className="space-y-8 animate-in fade-in duration-700">
                    {/* Score */}
                    <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">ATS Intelligence Score</p>
                            <p className={`text-6xl font-black tracking-tighter ${scoreColor}`}>
                                {analysis.ats_score}
                                <span className="text-2xl text-slate-200">/100</span>
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                            <CheckCircle className={`w-12 h-12 ${scoreColor}`} />
                            <button
                                onClick={() => setAnalysis(null)}
                                className="text-[9px] font-black text-[#000066] uppercase tracking-[0.2em] hover:underline flex items-center gap-2"
                            >
                                <RefreshCw className="w-3 h-3" /> Re-Initialize
                            </button>
                        </div>
                    </div>

                    {/* Suggestions */}
                    <div>
                        <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-4">Strategic Refinements</h3>
                        <div className="text-xs text-slate-500 font-bold bg-white p-6 rounded-3xl border border-slate-100 leading-relaxed uppercase tracking-tight">
                            {analysis.suggestions}
                        </div>
                    </div>

                    {/* Missing Keywords */}
                    {analysis.keywords_missing.length > 0 && (
                        <div>
                            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-4">Neural Keyword Gaps</h3>
                            <div className="flex flex-wrap gap-3">
                                {analysis.keywords_missing.map((keyword, i) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-rose-100"
                                    >
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Generated Questions */}
                    {analysis.generated_questions.length > 0 && (
                        <div>
                            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-4">Tailored Interrogative Prompts</h3>
                            <div className="bg-blue-50/30 rounded-3xl p-8 border border-blue-50/50">
                                <ul className="space-y-4">
                                    {analysis.generated_questions.map((q, i) => (
                                        <li key={i} className="flex gap-4">
                                            <span className="text-[#000066] font-black text-xs leading-none mt-1">0{i + 1}</span>
                                            <span className="text-xs text-slate-600 font-bold uppercase tracking-tight leading-relaxed">{q}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8 flex items-center gap-2 pt-6 border-t border-blue-100/50">
                                    <Shield className="w-3 h-3 text-[#000066]" />
                                    <p className="text-[9px] text-[#000066] font-black uppercase tracking-widest">
                                        Active: These prompts are queued for your Behavioral Assessment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
