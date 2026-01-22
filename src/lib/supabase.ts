import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface ResumeRecord {
    id: string;
    file_name: string;
    score: number;
    ats_score: number;
    analysis: object;
    created_at: string;
}