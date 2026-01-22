import { supabase } from '@/lib/supabase';
import { ResultClient } from '@/components/ResultClient';

export default async function ResultPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { data } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', id)
        .single();

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold">Result not found</h1>
                    <p className="text-muted-foreground">The analysis you are looking for does not exist or has been deleted.</p>
                </div>
            </div>
        );
    }

    // Transform backend data to match props
    const formattedData = {
        id: data.id,
        file_name: data.file_name,
        score: data.score,
        ats_score: data.ats_score,
        analysis: data.analysis,
    };

    return <ResultClient data={formattedData} />;
}