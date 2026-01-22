# RecruitReady 🚀 | AI Resume Analyzer

**Elevate your professional profile with instant, AI-driven feedback tailored for Senior Recruiter standards.**

RecruitReady is a premium, high-performance web application designed to help job seekers perfect their resumes. Leveraging the power of **Llama 3.1-8B AI**, it provides an in-depth audit, ATS compatibility scoring, and intelligent job matching analysis.

---

## ✨ Key Features

- 🔍 **AI-Driven Audit:** Instant scoring and constructive feedback across 4 key categories: Format, Content, Skills, and Experience.
- 🎯 **Job Matching:** Align your resume with specific job roles to see your compatibility rate and identified missing skills.
- 📊 **Visual Analytics:** Interactive Radar Charts to visualize your "Skill Balance" and professional profile.
- 💎 **Premium UI/UX:** Stunning Glassmorphism design with a focus on speed, precision, and readability.
- 🌓 **Dark/Light Mode:** Full support for system preferences with a sleek, modern aesthetic.
- 📄 **Real-time Preview:** View your uploaded PDF directly alongside the AI analysis reports.
- 🛡️ **ATS Optimized:** Built with scoring algorithms that reflect modern Applicant Tracking Systems criteria.

---

## 🛠️ Tech Stack

- **Frontend:** [Next.js 15](https://nextjs.org/) (App Router), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) (Animations)
- **AI Engine:** [Groq Cloud](https://groq.com/) (Llama 3.1-8B Model)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Visuals:** [Recharts](https://recharts.org/) (Data Visualization), [Lucide React](https://lucide.dev/) (Icons)

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js (Latest LTS)
- npm or yarn

### 2. Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
# AI API
GROQ_API_KEY=your_groq_api_key

# Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Installation

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📸 Screenshots & Showcase

The UI features a unique **Glassmorphism** aesthetic, utilizing translucent layers and vibrant primary accents (`#04b453`) to create a futuristic, professional environment.

- **Home Page:** Simple, intuitive PDF upload with optional Job Position input.
- **Analysis Page:** Single-column professional report with a side-by-side (modal-accessible) original resume preview.

---

## 📜 License

© 2026 RecruitReady. All rights reserved.

---

Developed with passion by **[Chotikorn Sittakornkowit/Petersen]** 💻
