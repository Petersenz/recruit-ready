import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromPDF } from '@/lib/pdf';
import { analyzeResume } from '@/lib/ai';
import { supabase } from '@/lib/supabase';
import { v4 as uuid } from 'uuid';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // 1. Extract text from PDF
        const buffer = Buffer.from(await file.arrayBuffer());
        const text = await extractTextFromPDF(buffer);
        const jobPosition = formData.get('jobPosition') as string || undefined;

        // 2. Analyze with AI
        const analysis = await analyzeResume(text, jobPosition);

        // 3. Save to database
        const id = uuid();
        await supabase.from('resumes').insert({
            id,
            file_name: file.name,
            score: analysis.score,
            ats_score: analysis.ats_score,
            analysis,
        });

        return NextResponse.json({ id, analysis });
    } catch (error: any) {
        console.error('API Error:', error.message);
        return NextResponse.json({ error: error.message || 'Analysis failed' }, { status: 500 });
    }
}
