import { Progress } from '@/components/ui/progress';

interface ScoreCardProps {
    label: string;
    score: number;
}

export function ScoreCard({ label, score }: ScoreCardProps) {
    const getColor = (score: number) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 70) return 'text-yellow-500';
        if (score >= 60) return 'text-yellow-600';
        if (score >= 50) return 'text-yellow-700';
        return 'text-red-600';
    };

    const getBgColor = (score: number) => {
        if (score >= 80) return 'bg-green-600';
        if (score >= 70) return 'bg-yellow-500';
        if (score >= 60) return 'bg-yellow-600';
        if (score >= 50) return 'bg-yellow-700';
        return 'bg-red-600';
    };

    return (
        <div className="glass rounded-2xl p-4 shadow-sm border border-border">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-muted-foreground">{label}</span>
                <span className={`text-lg font-bold ${getColor(score)}`}>{score}</span>
            </div>
            <Progress
                value={score}
                className="h-2"
                indicatorClassName={getBgColor(score)}
            />
        </div>
    );
}