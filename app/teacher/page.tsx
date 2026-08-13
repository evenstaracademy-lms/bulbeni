"use client";
/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Link from "next/link";
import { Award, ArrowRight, Briefcase, Camera, Check, Circle, Eye, FileText, GraduationCap, Lightbulb, MapPin, Pencil } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { teacherNav } from "@/components/teacher-nav";
import { CompletionRing } from "@/components/completion-ring";
import { completionSections, isSectionComplete, useTeacherProfile } from "@/components/teacher-profile-store";

export default function TeacherDashboard() {
  const { profile, completion } = useTeacherProfile();
  const checklist = completionSections.filter(section => ["profilePhoto","basic","experience","education","certificates","video","cv"].includes(section.key));
  const initials=(profile.firstName?.[0]||"M")+(profile.lastName?.[0]||"A");
  return <DashboardShell nav={teacherNav} role="Teacher" initials={initials} hideBottomSettings>
    <section className="teacher-welcome"><div><span className="dash-eyebrow">Thursday, 13 August</span><h1>Good morning, {profile.firstName || "Teacher"}.</h1><p>A considered profile tells schools more than a résumé can. Here is where yours stands today.</p></div><Image src="/books-stack.png" width={150} height={130} alt="" priority /></section>
    <div className="teacher-home-grid">
      <section className="completion-hero panel"><CompletionRing value={completion}/><div className="completion-copy"><span className="panel-kicker">Profile strength</span><h2>You’re making great progress</h2><p>Complete your introduction video and profile details to stand out to schools.</p><Link href="/teacher/profile/edit" className="primary-button"><Pencil size={16}/> Continue editing</Link></div><Image className="completion-art" src="/graduation-cap.png" width={105} height={90} alt="" /></section>
      <section className="views-card panel"><span className="metric-icon"><Eye /></span><span className="panel-kicker">Profile views</span><strong>128</strong><p><b>+18%</b> over the last 30 days</p><div className="mini-bars" aria-hidden="true">{[30,48,40,62,55,76,88,70,95,82,100,92].map((h,i)=><i key={i} style={{height:`${h}%`}} />)}</div></section>
      <section className="checklist-panel panel"><div className="panel-title-row"><div><span className="panel-kicker">Your next steps</span><h2>Profile checklist</h2></div><span>{checklist.filter(s=>isSectionComplete(profile,s.key)).length} of {checklist.length}</span></div><div className="dashboard-checklist">{checklist.map(section=>{const done=isSectionComplete(profile,section.key);return <Link href={`/teacher/profile/edit#${section.key}`} key={section.key} className={done?"done":""}>{done?<Check/>:<Circle/>}<span>{section.label}</span>{!done&&<ArrowRight/>}</Link>})}</div></section>
      <section className="teacher-summary panel"><h2 className="summary-title">Your Profile</h2><div className="summary-head"><span className="profile-photo">{profile.profilePhoto?<img src={profile.profilePhoto} alt=""/>:<span className="demo-portrait" aria-label={initials}><i className="portrait-hair"/><i className="portrait-face"/><i className="portrait-neck"/><i className="portrait-jacket"/><i className="portrait-shirt"/></span>}<span className="photo-camera"><Camera/></span></span></div><div className="summary-facts"><div><span><GraduationCap/></span><p><strong>{profile.subject||"English Teacher"}</strong><small>Subject</small></p></div><div><span><MapPin/></span><p><strong>{profile.location?.split(",")[0]||"Ankara"}</strong><small>Location</small></p></div><div><span><Briefcase/></span><p><strong>6 years</strong><small>Experience</small></p></div><div><span><Award/></span><p><strong>{profile.certificates?.split("(")[0].trim()||"CELTA"}</strong><small>Top Certificate</small></p></div></div><Link className="summary-edit" href="/teacher/profile/edit"><Pencil/> Edit Profile</Link></section>
      <aside className="tip-card"><span><Lightbulb/></span><div><small>Profile tip</small><h2>Let your story be heard</h2><p>Profiles with an introduction video help schools get a feel for your teaching personality.</p><Link href="/teacher/profile/edit#video">Add introduction video <ArrowRight size={14}/></Link></div><Image src="/open-book.png" width={88} height={70} alt="" /></aside>
      <section className="document-prompt panel"><span className="doc-icon"><FileText/></span><div><span className="panel-kicker">Documents</span><h2>{profile.cv?"Your CV is ready to shine":"Add your CV"}</h2><p>{profile.cv?"Schools can review your experience at a glance.":"Upload a current CV to complete your documents section."}</p></div><Link href="/teacher/profile/edit#cv" className="outline-button">Manage documents</Link></section>
    </div>
  </DashboardShell>;
}
