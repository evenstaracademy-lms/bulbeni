"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { loadDemoTeacherProfile, saveDemoTeacherProfile } from "@/components/teacher-supabase-profile";

export type TeacherProfile = Record<string, string>;

export const initialTeacherProfile: TeacherProfile = {
  profilePhoto: "",
  firstName: "Nilaa", lastName: "Salarzaei", subject: "English Teacher", location: "Istanbul",
  about: "", experience: "10 years of teaching experience", education: "BA in English Language Teaching", certificates: "CELTA",
  certificateIssuer: "", certificateDate: "", certificateNumber: "", certificateEvidence: "", subjects: "English Teacher", ages: "Adults|High School|University",
  languages: "English - C2; Persian - Native; Turkish - B2", schoolTypes: "Language School|Private School|Adult Education",
  video: "", cv: "CV available", availability: "Weekdays; Evenings", employment: "Full-time|Part-time",
  relocation: "Not open to relocate", workPermit: "Available", yearsExperience:"10", nationality:"Iranian", teachingMode:"In-person|Online", age:"34",
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

type Store = { profile: TeacherProfile; completion: number; hydrated: boolean; loadError:string; saveProfile: (profile: TeacherProfile) => void; persistProfile:(profile:TeacherProfile)=>Promise<TeacherProfile>; resetProfile: () => void };
const ProfileContext = createContext<Store | null>(null);
const STORAGE_KEY = "bulbeni.teacher-profile.v1";

export function TeacherProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<TeacherProfile>(initialTeacherProfile);
  const [hydrated, setHydrated] = useState(false);
  const [loadError,setLoadError]=useState("");
  useEffect(() => {
    let active=true;(async()=>{try{const live=await loadDemoTeacherProfile();if(active)setProfile(live)}catch(cause){if(active){setLoadError(cause instanceof Error?cause.message:"Unable to load teacher profile.");try{const saved=localStorage.getItem(STORAGE_KEY);if(saved)setProfile({...initialTeacherProfile,...JSON.parse(saved)})}catch{}}}finally{if(active)setHydrated(true)}})();return()=>{active=false};
  }, []);
  const saveProfile = useCallback((next: TeacherProfile) => { setProfile(next); localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); }, []);
  const persistProfile=useCallback(async(next:TeacherProfile)=>{const saved=await saveDemoTeacherProfile(next);setProfile(current=>({...current,...saved}));localStorage.setItem(STORAGE_KEY,JSON.stringify({...next,...saved}));return saved},[]);
  const resetProfile = useCallback(() => { setProfile(initialTeacherProfile); localStorage.removeItem(STORAGE_KEY); }, []);
  const value = useMemo(() => ({ profile, completion: getProfileCompletion(profile), hydrated, loadError, saveProfile, persistProfile, resetProfile }), [profile, hydrated,loadError,saveProfile,persistProfile,resetProfile]);
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useTeacherProfile() {
  const value = useContext(ProfileContext);
  if (!value) throw new Error("useTeacherProfile must be used within TeacherProfileProvider");
  return value;
}
