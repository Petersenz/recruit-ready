'use client';

import { UploadZone } from '@/components/UploadZone';
import { FileText, Zap, Target, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-15%] right-[-5%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Hero Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-primary text-sm font-bold mb-4 animate-bounce">
            <Sparkles className="w-4 h-4" />
            Powered by llama-3.1-8B AI
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground bg-clip-text">
            <span className="text-primary italic">RecruitReady</span>
          </h1>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground bg-clip-text">
            AI <span className="text-primary underline italic">Resume</span> Analyzer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Elevate your professional profile with instant, AI-driven feedback tailored for <span className="text-foreground font-semibold italic">Senior recruiter</span> standards.
          </p>
        </div>

        {/* Upload Section */}
        <UploadZone />

        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
          <FeatureCard
            icon={<Zap className="w-6 h-6 text-yellow-500" />}
            title="Instant Audit"
            desc="Detailed scoring and category breakdown in seconds using llama-3.1-8B AI."
          />
          <FeatureCard
            icon={<Target className="w-6 h-6 text-blue-800" />}
            title="Job Matching"
            desc="Align your resume with specific job roles or internship opportunities."
          />
          <FeatureCard
            icon={<ShieldCheck className="w-6 h-6 text-green-500" />}
            title="ATS Optimized"
            desc="Ensure your resume passes through HR software without issues."
          />
        </div>

        {/* Footer info */}
        <div className="mt-32 text-center text-muted-foreground text-sm font-medium opacity-50">
          <p>© 2026 AI Resume Analyzer. All rights reserved.</p>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="glass p-8 rounded-3xl border-border hover:border-primary/50 transition-all hover:scale-[1.05] group">
      <div className="w-12 h-12 rounded-2xl bg-background/50 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  );
}