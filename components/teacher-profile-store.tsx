"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type TeacherProfile = Record<string, string>;

export const initialTeacherProfile: TeacherProfile = {
  profilePhoto: "",
  firstName: "Maya", lastName: "Anderson", subject: "Primary Years Educator", location: "Bucharest, Romania",
  about: "I’m an inquiry-led primary educator who believes curiosity, kindness, and meaningful challenge belong at the heart of every classroom.",
  experience: "Grade 4 Homeroom Teacher — Northbridge International School (2022–Present)",
  education: "MA in Education — University College London, 2019", certificates: "Qualified Teacher Status (QTS)",
  certificateIssuer: "Department for Education, UK", certificateDate: "2023-06", certificateNumber: "QTS-48291", certificateEvidence: "",
  subjects: "Primary curriculum, English, Mathematics, Science, Humanities", ages: "Ages 6–11",
  languages: "English — Native; Romanian — Conversational; French — Basic", schoolTypes: "International school, IB World School",
  video: "", cv: "Maya_Anderson_CV.pdf", availability: "September 2026", employment: "Currently employed",
  relocation: "Open to relocate within Europe", workPermit: "EU citizen",
};

export const completionSections = [
  { key: "profilePhoto", label: "Profile photo", weight: 10 }, { key: "basic", label: "Basic information", weight: 10 },
  { key: "about", label: "About me", weight: 5 }, { key: "experience", label: "Teaching experience", weight: 15 },
  { key: "education", label: "Education", weight: 10 }, { key: "certificates", label: "Certificates with evidence", weight: 10 },
  { key: "subjects", label: "Subjects", weight: 5 }, { key: "ages", label: "Student age groups", weight: 5 },
  { key: "languages", label: "Languages", weight: 5 }, { key: "schoolTypes", label: "Previous school types", weight: 5 },
  { key: "workPreferences", label: "Availability & work preferences", weight: 5 }, { key: "cv", label: "CV", weight: 5 },
  { key: "video", label: "Introduction video", weight: 10 },
] as const;

export function isSectionComplete(profile: TeacherProfile, key: string) {
  if (key === "basic") return Boolean(profile.firstName?.trim() && profile.lastName?.trim() && profile.subject?.trim() && profile.location?.trim());
  if (key === "certificates") return Boolean(profile.certificates?.trim() && profile.certificateIssuer?.trim() && profile.certificateDate?.trim() && profile.certificateEvidence?.trim());
  if (key === "workPreferences") return Boolean(profile.availability?.trim() && profile.employment?.trim() && profile.relocation?.trim() && profile.workPermit?.trim());
  return Boolean(profile[key]?.trim());
}

export function getProfileCompletion(profile: TeacherProfile) {
  return completionSections.reduce((total, section) => total + (isSectionComplete(profile, section.key) ? section.weight : 0), 0);
}

type Store = { profile: TeacherProfile; completion: number; hydrated: boolean; saveProfile: (profile: TeacherProfile) => void; resetProfile: () => void };
const ProfileContext = createContext<Store | null>(null);
const STORAGE_KEY = "bulbeni.teacher-profile.v1";

export function TeacherProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<TeacherProfile>(initialTeacherProfile);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const timer=window.setTimeout(()=>{try { const saved = localStorage.getItem(STORAGE_KEY); if (saved) setProfile({ ...initialTeacherProfile, ...JSON.parse(saved) }); } catch { /* use demo defaults */ } setHydrated(true)},0);
    return ()=>window.clearTimeout(timer);
  }, []);
  const saveProfile = useCallback((next: TeacherProfile) => { setProfile(next); localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); }, []);
  const resetProfile = useCallback(() => { setProfile(initialTeacherProfile); localStorage.removeItem(STORAGE_KEY); }, []);
  const value = useMemo(() => ({ profile, completion: getProfileCompletion(profile), hydrated, saveProfile, resetProfile }), [profile, hydrated, saveProfile, resetProfile]);
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useTeacherProfile() {
  const value = useContext(ProfileContext);
  if (!value) throw new Error("useTeacherProfile must be used within TeacherProfileProvider");
  return value;
}
