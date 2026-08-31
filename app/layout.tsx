import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./teacher-reference.css";
import "./school-dashboard.css";
import "./teacher-detail.css";
import "./credit-flow.css";
import "./school-collections.css";
import "./teacher-schools.css";
import "./i18n.css";
import { ToastProvider } from "@/components/toast";
import { TeacherProfileProvider } from "@/components/teacher-profile-store";
import { I18nProvider } from "@/components/i18n";

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
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><I18nProvider><ToastProvider><TeacherProfileProvider>{children}</TeacherProfileProvider></ToastProvider></I18nProvider></body>
    </html>
  );
}
