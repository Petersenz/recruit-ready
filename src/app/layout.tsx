import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BackToTop } from "@/components/BackToTop";

const kanit = Kanit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "thai"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "RecruitReady - AI Resume Analyzer",
  description: "Perfect your resume for senior recruiter standards using AI analysis.",
  keywords: ["AI Resume Analyzer", "Senior Recruiter", "Resume Analysis", "Job Matching", "ATS Optimization", "Llama-3.1-8B AI",
  ],
  icons: {
    icon: "/rricon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${kanit.variable} font-sans antialiased transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeToggle />
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
