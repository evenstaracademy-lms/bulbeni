import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./teacher-reference.css";
import "./school-dashboard.css";
import "./teacher-detail.css";
import "./credit-flow.css";
import { ToastProvider } from "@/components/toast";
import { TeacherProfileProvider } from "@/components/teacher-profile-store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BULBENI — Better matches. Brighter classrooms.",
  description: "A modern matching platform connecting great teachers with the right schools.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><ToastProvider><TeacherProfileProvider>{children}</TeacherProfileProvider></ToastProvider></body>
    </html>
  );
}
