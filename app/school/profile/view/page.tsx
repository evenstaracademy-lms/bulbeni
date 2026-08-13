"use client";
/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Link from "next/link";
import { BookOpen, Building2, CalendarDays, Check, ExternalLink, GraduationCap, Languages, MapPin, Pencil, School, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { defaultSchoolProfile, SCHOOL_PROFILE_STORAGE, splitSchoolValues, type SchoolProfile } from "@/components/school-profile-data";
import { schoolNav } from "@/components/school-nav";

export default function SchoolProfileView(){
  const [profile,setProfile]=useState<SchoolProfile>(defaultSchoolProfile);
  useEffect(()=>{const timer=window.setTimeout(()=>{try{const saved=localStorage.getItem(SCHOOL_PROFILE_STORAGE);if(saved)setProfile({...defaultSchoolProfile,...JSON.parse(saved)})}catch{}},0);return()=>clearTimeout(timer)},[]);
  return <DashboardShell nav={schoolNav} role="School" initials="AC" hideBottomSettings>
    <section className="school-profile-banner school-public-banner"><div className="school-logo-preview">{profile.logo?<img src={profile.logo} alt={`${profile.name} logo`}/>:<Building2/>}</div><div className="school-banner-copy"><span className="school-kicker">School profile</span><h1>{profile.name}</h1><p><MapPin/> {profile.city} <i/> <School/> {profile.type}</p><div>{splitSchoolValues(profile.ages).map(x=><span key={x}>{x}</span>)}{splitSchoolValues(profile.languages).map(x=><span key={x}>{x}</span>)}</div></div><Image src="/school-building.png" width={280} height={190} alt="" priority/><Link href="/school/profile" className="school-view-public"><Pencil/> Edit Profile</Link></section>

    <div className="school-public-grid">
      <main className="school-public-main">
        <PublicCard icon={BookOpen} title="About Our School"><p className="school-about-copy">{profile.about}</p><a className="school-website" href={profile.website} target="_blank" rel="noreferrer">Visit school website <ExternalLink/></a></PublicCard>
        <PublicCard icon={GraduationCap} title="Students & Education"><div className="public-info-columns"><InfoGroup title="Student age groups" values={splitSchoolValues(profile.ages)}/><InfoGroup title="Languages of instruction" values={splitSchoolValues(profile.languages)}/><InfoGroup title="Subjects / Departments" values={splitSchoolValues(profile.departments)}/></div><dl className="public-detail-list"><div><dt>Curriculum</dt><dd>{profile.curriculum}</dd></div><div><dt>Schedule</dt><dd>{profile.schedule}</dd></div></dl></PublicCard>
        <PublicCard icon={ShieldCheck} title="Teacher Support"><div className="support-public-grid"><article><span><ShieldCheck/></span><div><small>Work permit support</small><h3>{profile.workPermit}</h3><p>{profile.workPermitNote}</p></div></article><article><span><Building2/></span><div><small>Accommodation support</small><h3>{profile.accommodation}</h3><p>{profile.accommodationNote}</p></div></article></div></PublicCard>
        <PublicCard icon={Sparkles} title="Facilities & Highlights"><div className="highlight-grid">{splitSchoolValues(profile.highlights).map(item=><span key={item}><Check/>{item}</span>)}</div></PublicCard>
      </main>
      <aside className="school-public-side">
        <PublicCard icon={School} title="School at a Glance"><dl className="glance-list"><div><dt><Building2/>Campuses</dt><dd>{profile.campuses}</dd></div><div><dt><UsersRound/>Students</dt><dd>Approximately {profile.students}</dd></div><div><dt><CalendarDays/>Years operating</dt><dd>{profile.years} years</dd></div><div><dt><MapPin/>Location</dt><dd>{profile.city}</dd></div></dl></PublicCard>
        <PublicCard icon={Languages} title="Learning Community"><p className="side-intro">A multilingual environment supporting learners across:</p><div className="public-side-tags">{splitSchoolValues(profile.languages).map(x=><span key={x}>{x}</span>)}</div></PublicCard>
        <section className="school-interest-card"><span><UsersRound/></span><h2>Interested in this school?</h2><p>Keep your teacher profile current so ABC College can understand your experience and teaching preferences.</p><Link href="/teacher/profile">View your teacher profile</Link></section>
      </aside>
    </div>
  </DashboardShell>
}

function PublicCard({icon:Icon,title,children}:{icon:React.ComponentType<{size?:number}>;title:string;children:React.ReactNode}){return <section className="school-public-card"><header><span><Icon/></span><h2>{title}</h2></header>{children}</section>}
function InfoGroup({title,values}:{title:string;values:string[]}){return <div><h3>{title}</h3><div>{values.map(value=><span key={value}>{value}</span>)}</div></div>}
