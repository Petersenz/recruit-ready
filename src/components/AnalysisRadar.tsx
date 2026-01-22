'use client';

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from 'recharts';

interface AnalysisRadarProps {
    data: {
        format: number;
        content: number;
        skills: number;
        experience: number;
    };
    color?: string;
}

export function AnalysisRadar({ data, color = '#3b82f6' }: AnalysisRadarProps) {
    const chartData = [
        { subject: 'Format', A: data.format, fullMark: 100 },
        { subject: 'Content', A: data.content, fullMark: 100 },
        { subject: 'Skills', A: data.skills, fullMark: 100 },
        { subject: 'Experience', A: data.experience, fullMark: 100 },
    ];

    return (
        <div className="w-full h-[320px] mt-4 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="60%"
                    data={chartData}
                    margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
                >
                    <PolarGrid stroke="#94a3b8" strokeDasharray="3 3" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 600 }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Resume Score"
                        dataKey="A"
                        stroke={color}
                        fill={color}
                        fillOpacity={0.5}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
