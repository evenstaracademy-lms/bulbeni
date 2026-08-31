"use client";

import Image from "next/image";
import { Building2, ExternalLink, GraduationCap, Languages, MapPin, Search, ShieldCheck, UsersRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { teacherNav } from "@/components/teacher-nav";
import { getSupabaseClient } from "@/lib/supabase";
import { useI18n } from "@/components/i18n";

type School={id:string;name:string|null;city:string|null;school_type:string|null;logo_url:string|null;age_groups:string[]|null;languages_of_instruction:string[]|null;subjects:string[]|null;work_permit_support:string|null;accommodation_support:string|null;website:string|null;description:string|null};

export default function TeacherSchoolsPage(){
  const [schools,setSchools]=useState<School[]>([]);const [search,setSearch]=useState("");const [loading,setLoading]=useState(true);const [error,setError]=useState("");
  const {t}=useI18n();
  useEffect(()=>{let active=true;(async()=>{try{const {data,error:queryError}=await getSupabaseClient().from("schools").select("*").order("name");if(queryError)throw queryError;if(active)setSchools((data??[]) as School[]);}catch(cause){if(active)setError(cause instanceof Error?cause.message:"Unable to load schools.");}finally{if(active)setLoading(false)}})();return()=>{active=false}},[]);
  const results=useMemo(()=>schools.filter(school=>`${school.name||""} ${school.city||""} ${school.school_type||""}`.toLowerCase().includes(search.toLowerCase())),[schools,search]);
  return <DashboardShell nav={teacherNav} role="Teacher" initials="NS" hideBottomSettings><header className="teacher-school-heading"><div><span className="panel-kicker">{t("School directory")}</span><h1>{t("Discover Schools")}</h1><p>{t("Explore live school profiles that may match your teaching preferences.")}</p></div><label><Search/><input value={search} onChange={event=>setSearch(event.target.value)} placeholder={t("Search by name, city, or type...")}/></label></header><div className="teacher-school-results"><span>{loading?t("Loading schools..."):error?`${t("Unable to load schools")}: ${error}`:`${results.length} ${t("schools found")}`}</span></div>{!loading&&!error&&<div className="teacher-school-grid">{results.map(school=><article key={school.id}><header><span className="teacher-school-logo">{school.logo_url?<Image src={school.logo_url} width={70} height={70} unoptimized alt={`${school.name||"School"} logo`}/>:<Building2/>}</span><div><h2>{school.name||"School"}</h2><p><MapPin/> {school.city||t("Location not provided")}</p><strong>{school.school_type||t("School type not provided")}</strong></div></header><p className="teacher-school-description">{school.description||t("No school description is currently available.")}</p><dl><div><dt><UsersRound/>{t("Age groups")}</dt><dd>{(school.age_groups??[]).join(", ")||t("Not provided")}</dd></div><div><dt><Languages/>{t("Languages")}</dt><dd>{(school.languages_of_instruction??[]).join(", ")||t("Not provided")}</dd></div><div><dt><GraduationCap/>{t("Subjects")}</dt><dd>{(school.subjects??[]).slice(0,4).join(", ")||t("Not provided")}</dd></div><div><dt><ShieldCheck/>{t("Teacher support")}</dt><dd>{t("Permit")}: {school.work_permit_support||t("Not provided")} · {t("Accommodation")}: {school.accommodation_support||t("Not provided")}</dd></div></dl>{school.website?<a href={school.website} target="_blank" rel="noreferrer">{t("Visit School Website")} <ExternalLink/></a>:<span className="school-link-unavailable">{t("Website not provided")}</span>}</article>)}</div>}</DashboardShell>
}
