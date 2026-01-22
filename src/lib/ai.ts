import { z } from 'zod';

const AnalysisSchema = z.object({
    score: z.number().min(0).max(100),
    summary: z.string(),
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    suggestions: z.array(z.string()),
    ats_score: z.number().min(0).max(100),
    job_match: z.object({
        score: z.number().min(0).max(100),
        missing_skills: z.array(z.string()),
        fit_explanation: z.string(),
    }).optional(),
    categories: z.object({
        format: z.number(),
        content: z.number(),
        skills: z.number(),
        experience: z.number(),
    }),
});

export type AnalysisResult = z.infer<typeof AnalysisSchema>;

export async function analyzeResume(resumeText: string, jobPosition?: string): Promise<AnalysisResult> {
    const cleanedText = resumeText
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 6000);

    const jobInfo = jobPosition ? `TARGET POSITION: ${jobPosition}` : "";

    const prompt = `You are a SENIOR TECHNICAL RECRUITER with high standards. Be objective and strict regarding "Impact" and "Metrics".
${jobInfo}

SCORING GUIDELINES:
- 90-100: Exceptional, ready for top-tier companies
- 80-89: Strong, well-written resume
- 60-79: Good, but needs polish
- 40-59: Average, significant room for improvement
- 0-39: Poor, requires rewrite

COMMON DEDUCTIONS (Guide only):
- No quantified achievements: -15 points
- Generic objective/summary: -10 points
- Poor formatting/typos: -5 points
- Missing key sections: -10 points
- No action verbs: -10 points

Return ONLY valid JSON:
{
  "score": <0-100>,
  "summary": "<2 sentences, constructive feedback>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>"],
  "suggestions": ["<suggestion 1>", "<suggestion 2>", "<suggestion 3>"],
  "ats_score": <0-100>,
  ${jobPosition ? `"job_match": {
    "score": <0-100 score based on how well the resume matches the ${jobPosition} role>,
    "missing_skills": ["<missing skill 1>", "<missing skill 2>"],
    "fit_explanation": "<Brief explanation of why the candidate is or isn't a good fit for ${jobPosition}>"
  },` : ""}
  "categories": {
    "format": <0-100>,
    "content": <0-100>,
    "skills": <0-100>,
    "experience": <0-100>
  }
}

Resume:
${cleanedText}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [
                {
                    role: 'system',
                    content: `You are an experienced HR Recruiter. 
                    You are a professional resume reviewer with 20 years of HR experience. 
                    You value clear metrics and clean design.
                    Standard decent resumes should score around 65-75. 
                    Strong resumes with metrics should score 80-90.
                    Truly flawless resumes can score 90+.`,
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            max_tokens: 1024,
            temperature: 0.2,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        console.error('Groq API Error:', error);
        throw new Error('AI analysis failed');
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
        throw new Error('Empty AI response');
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        console.error('Invalid response:', content);
        throw new Error('Invalid AI response');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return AnalysisSchema.parse(parsed);
}
