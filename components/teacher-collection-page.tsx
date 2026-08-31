"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, Clock3, Heart, Languages, LockKeyhole, MapPin, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { schoolNav } from "@/components/school-nav";
import { getSupabaseClient } from "@/lib/supabase";
import { readTeacherIds } from "@/components/school-teacher-state";
import { useI18n } from "@/components/i18n";

type Teacher={id:string;full_name:string|null;subject:string|null;city:string|null;years_experience:number|null;languages:string[]|null;age_groups:string[]|null;certificates:string[]|null;match_percentage:number|null;profile_image_url:string|null};

export function TeacherCollectionPage({title,copy,storageKey,unlocked=false}:{title:string;copy:string;storageKey:string;unlocked?:boolean}){
  const [teachers,setTeachers]=useState<Teacher[]>([]);const [loading,setLoading]=useState(true);const [error,setError]=useState("");
  const {t}=useI18n();
  useEffect(()=>{let active=true;(async()=>{try{const ids=readTeacherIds(storageKey);if(!ids.length){if(active)setTeachers([]);return}const {data,error:queryError}=await getSupabaseClient().from("teachers").select("*").in("id",ids);if(queryError)throw queryError;if(active)setTeachers((data??[]) as Teacher[]);}catch(cause){if(active)setError(cause instanceof Error?cause.message:"Unable to load teachers.");}finally{if(active)setLoading(false);}})();return()=>{active=false}},[storageKey]);
  return <DashboardShell nav={schoolNav} role="School" initials="AC" hideBottomSettings><header className="discover-heading"><h1>{t(title)}</h1><p>{t(copy)}</p></header><section className="all-teachers-section"><div className="results-heading"><h2>{t(title)}</h2><span>{loading?t("Loading teachers..."):error?`${t("Unable to load teachers")}: ${error}`:`${teachers.length} ${t("teachers found")}`}</span></div>{!loading&&!error&&(teachers.length?<div className="all-teacher-grid">{teachers.map(teacher=><article className="discover-teacher-card" key={teacher.id}><div className="discover-card-top"><span className="discover-avatar mint"><Image src={teacher.profile_image_url||"/Avatar%20.png"} width={72} height={72} unoptimized alt={`${teacher.full_name||"Teacher"} portrait`}/></span><div><h3>{teacher.full_name||"Teacher"}</h3><strong>{teacher.subject||t("Subject not provided")}</strong><span><MapPin/> {teacher.city||t("Location not provided")}</span></div><span className="discover-match">{teacher.match_percentage??0}%</span><span className={`collection-status ${unlocked?"unlocked":""}`}>{unlocked?<LockKeyhole/>:<Heart fill="currentColor"/>}</span></div><div className="teacher-compact-facts"><span><Clock3/> {teacher.years_experience??0} {t("years experience")}</span><span><Languages/> {(teacher.languages??[]).join(", ")||t("Languages not provided")}</span><span><UsersRound/> {(teacher.age_groups??[]).join(", ")||t("Age groups not provided")}</span></div><div className="discover-card-footer"><span><Award/> {(teacher.certificates??[])[0]||t("No certificate listed")}</span><Link href={`/school/teachers/${teacher.id}`}>{t("View Profile")}</Link></div></article>)}</div>:<div className="collection-empty"><span>{unlocked?<LockKeyhole/>:<Heart/>}</span><h2>{t(unlocked?"No unlocked contacts yet":"No saved teachers yet")}</h2><p>{t(unlocked?"Approved connection requests will appear here.":"Save teachers from Discover Teachers to review them here.")}</p><Link href="/school/teachers">{t("Discover Teachers")}</Link></div>)}</section></DashboardShell>
}
