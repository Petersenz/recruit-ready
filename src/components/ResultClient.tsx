'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Lightbulb, ArrowLeft, Target, Trophy, FileText, X, Eye } from 'lucide-react';
import Link from 'next/link';
import { ScoreCard } from '@/components/ScoreCard';
import { AnalysisRadar } from '@/components/AnalysisRadar';
import { NumberTicker } from '@/components/NumberTicker';
import { Badge } from '@/components/ui/badge';
import type { AnalysisResult } from '@/lib/ai';

interface ResultClientProps {
    data: {
        id: string;
        file_name: string;
        score: number;
        ats_score: number;
        analysis: any;
    };
}

export function ResultClient({ data }: ResultClientProps) {
    const analysis = data.analysis as AnalysisResult;
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        const stored = sessionStorage.getItem(`pdf-preview-${data.id}`);
        if (stored) setPdfUrl(stored);
    }, [data.id]);

    const getColor = (score: number) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 70) return 'text-yellow-500';
        if (score >= 60) return 'text-yellow-600';
        if (score >= 50) return 'text-yellow-700';
        return 'text-red-600';
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden font-sans">
            {/* Background elements for Antigravity feel */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <main className="container mx-auto px-4 py-12 relative z-10 max-w-4xl">
                <div className="flex justify-between items-center mb-8 print:hidden">
                    <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Analysis
                    </Link>

                    {pdfUrl && (
                        <button
                            onClick={() => setShowPreview(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary font-bold hover:bg-primary/20 transition-all border border-primary/20"
                        >
                            <Eye className="w-4 h-4" />
                            View Original Resume
                        </button>
                    )}
                </div>

                <div className="space-y-8">
                    {/* Main Score & Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass rounded-3xl p-8 border-border"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="text-center md:text-left space-y-2">
                                <h1 className="text-3xl font-bold">Analysis Result</h1>
                                <p className="text-muted-foreground truncate max-w-xs md:max-w-md">File: {data.file_name}</p>
                            </div>
                            <div className="text-center">
                                <div className={`text-7xl font-black ${getColor(analysis.score)} leading-none`}>
                                    <NumberTicker value={analysis.score} />
                                </div>
                                <p className="text-sm font-bold uppercase tracking-widest mt-2 text-muted-foreground">Overall Score</p>
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                            <h3 className="font-bold flex items-center gap-2 mb-2 text-primary">
                                <Target className="w-5 h-5" /> AI Summary
                            </h3>
                            <p className="text-lg leading-relaxed">{analysis.summary}</p>
                        </div>

                        {/* Job Match Section (Integrated Inline) */}
                        {analysis.job_match && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-6 p-6 bg-green-500/5 rounded-2xl border border-green-500/20"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold flex items-center gap-2 text-green-600 dark:text-green-500">
                                        <Trophy className="w-5 h-5" /> Job Matching Analysis
                                    </h3>
                                    <Badge className="bg-green-600 text-white font-bold text-lg px-4 py-1">
                                        {analysis.job_match.score}% Match
                                    </Badge>
                                </div>
                                <p className="text-sm italic mb-4">"{analysis.job_match.fit_explanation}"</p>
                                {analysis.job_match.missing_skills.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-bold mb-2 uppercase text-muted-foreground">Missing/Required Skills:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {analysis.job_match.missing_skills.map((skill, i) => (
                                                <Badge key={i} variant="outline" className="bg-background">{skill}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </motion.div>

                    {/* ATS Score & Charts Section */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* ATS Score Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass rounded-3xl p-8 border-border flex flex-col justify-center"
                        >
                            <h3 className="font-bold mb-6 flex items-center gap-2">
                                <Target className="w-5 h-5 text-primary" /> ATS Compatibility
                            </h3>
                            <div className="relative pt-1">
                                <div className="flex mb-4 items-center justify-between">
                                    <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                                        Match Rate
                                    </span>
                                    <span className="text-4xl font-black text-primary">
                                        {analysis.ats_score}%
                                    </span>
                                </div>
                                <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-primary/10">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${analysis.ats_score}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground text-center italic">
                                    Optimized for modern applicant tracking systems
                                </p>
                            </div>
                        </motion.div>

                        {/* Skill Balance Radar */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass rounded-3xl p-6 border-border"
                        >
                            <h3 className="font-bold text-center text-lg mb-4">Skill Balance</h3>
                            <AnalysisRadar data={analysis.categories} color="#22c55e" />
                        </motion.div>
                    </div>

                    {/* Category Breakdown */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                        <ScoreCard label="Format & Layout" score={analysis.categories.format} />
                        <ScoreCard label="Content Quality" score={analysis.categories.content} />
                        <ScoreCard label="Technical Skills" score={analysis.categories.skills} />
                        <ScoreCard label="Experience Impact" score={analysis.categories.experience} />
                    </motion.div>

                    {/* Strengths & Weaknesses */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass rounded-3xl p-8 space-y-4">
                            <h3 className="font-bold flex items-center gap-2 text-green-600">
                                <CheckCircle className="w-6 h-6" /> Key Strengths
                            </h3>
                            <ul className="space-y-3">
                                {analysis.strengths.map((s, i) => (
                                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 shrink-0" />
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass rounded-3xl p-8 space-y-4">
                            <h3 className="font-bold flex items-center gap-2 text-red-500">
                                <AlertCircle className="w-6 h-6" /> Areas for Improvement
                            </h3>
                            <ul className="space-y-3">
                                {analysis.weaknesses.map((w, i) => (
                                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                                        {w}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Recommendations */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass rounded-3xl p-8 border-yellow-500/20">
                        <h3 className="font-bold flex items-center gap-2 text-yellow-500 mb-6">
                            <Lightbulb className="w-6 h-6" /> Expert Recommendations
                        </h3>
                        <div className="grid gap-4">
                            {analysis.suggestions.map((item, i) => (
                                <div key={i} className="p-4 bg-yellow-500/5 rounded-xl border border-yellow-500/10 flex gap-4">
                                    <span className="text-xl font-black text-yellow-500 opacity-50">0{i + 1}</span>
                                    <p className="text-sm font-medium">{item}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Footer Info */}
                    <div className="text-center pt-8 pb-4 opacity-50">
                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Powered by llama-3.1-8B AI</p>
                    </div>
                </div>
            </main>

            {/* Resume Preview Modal */}
            <AnimatePresence>
                {showPreview && pdfUrl && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-background w-full max-w-5xl h-full max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-border relative flex flex-col"
                        >
                            <div className="p-4 border-b border-border flex justify-between items-center bg-card/50">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-primary" />
                                    <span className="font-bold truncate max-w-xs">{data.file_name}</span>
                                </div>
                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="p-2 hover:bg-muted rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <iframe
                                    src={`${pdfUrl}#toolbar=0`}
                                    className="w-full h-full border-none"
                                    title="Resume Preview"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
