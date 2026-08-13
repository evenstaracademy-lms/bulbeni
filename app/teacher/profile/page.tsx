"use client";
/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Link from "next/link";
import { Award, BookOpen, Briefcase, Calendar, CheckCircle2, Clock3, Download, Eye, FileText, GraduationCap, Languages, MapPin, Pencil, Play, School, UsersRound } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { teacherNav } from "@/components/teacher-nav";
import { ToastButton } from "@/components/toast-button";
import { useTeacherProfile } from "@/components/teacher-profile-store";
import { TeacherProfileGrid } from "@/components/teacher-profile-grid";

const Chip = ({ children }: { children: React.ReactNode }) => <span className="profile-chip">{children}</span>;
const Section = ({ icon: Icon, title, children }: { icon: React.ComponentType<{ size?: number }>; title: string; children: React.ReactNode }) => <section className="profile-section panel"><div className="profile-section-title"><span><Icon size={19}/></span><h2>{title}</h2></div>{children}</section>;

export default function TeacherProfile() {
  const {profile,completion}=useTeacherProfile(); const initials=(profile.firstName?.[0]||"M")+(profile.lastName?.[0]||"A");
  return <DashboardShell nav={teacherNav} role="Teacher" initials={initials} hideBottomSettings>
    <section className="profile-cover">
      <div className="cover-pattern"/><div className="profile-identity"><span className="profile-photo large">{profile.profilePhoto?<img src={profile.profilePhoto} alt={`${profile.firstName} ${profile.lastName}`}/>:<span className="demo-portrait"><i className="portrait-hair"/><i className="portrait-face"/><i className="portrait-neck"/><i className="portrait-jacket"/><i className="portrait-shirt"/></span>}</span><div className="identity-copy"><h1>{profile.firstName} {profile.lastName}</h1><div className="profile-role-line"><span><GraduationCap/> {profile.subject||"English Teacher"}</span><span><MapPin/> {profile.location?.split(",")[0]||"Ankara"}</span></div></div><div className="profile-complete-small"><strong>{completion}%</strong><span>Profile Complete</span></div></div>
      <div className="identity-chips"><Chip><Briefcase/> 6 years experience</Chip><Chip><Award/> {profile.certificates?.split(";")[0]||"CELTA"}</Chip><Chip><Languages/> {profile.languages?.split(";")[0]||"English / Turkish"}</Chip><Chip><UsersRound/> {profile.ages||"Primary · Middle School · High School"}</Chip></div>
      <Image className="profile-cover-art" src="/books-stack.png" width={190} height={145} alt="" />
      <div className="profile-cover-actions"><Link href="/teacher/profile/edit" className="primary-button"><Pencil size={15}/> Edit Profile</Link><ToastButton className="outline-button" message="School preview mode opened."><Eye size={16}/> View as School</ToastButton></div>
    </section>

    <TeacherProfileGrid profile={profile}/>
    <div className="profile-layout legacy-profile-layout">
      <div className="profile-main-column">
        <Section icon={BookOpen} title="About Me"><p className="profile-prose">{profile.about||"About information has not been added yet."}</p></Section>
        <Section icon={Play} title="Introduction Video">{profile.video?<div className="video-placeholder"><button aria-label="Play introduction video"><Play fill="currentColor"/></button><div><strong>Meet {profile.firstName}</strong><span>Teacher introduction</span></div><Image src="/open-book.png" width={135} height={105} alt=""/></div>:<div className="profile-empty"><Play/><strong>No introduction video yet</strong><Link href="/teacher/profile/edit#video">Add video</Link></div>}</Section>
        <Section icon={Briefcase} title="Teaching Experience"><div className="timeline"><article><i/><div><span>Current experience</span><h3>{profile.experience||"Experience pending"}</h3><p>Open the profile editor to update role details and school history.</p></div></article></div></Section>
        <div className="profile-pair"><Section icon={BookOpen} title="Subjects"><div className="large-chip-list">{profile.subjects?profile.subjects.split(",").map(x=><Chip key={x}>{x.trim()}</Chip>):"Pending"}</div></Section><Section icon={UsersRound} title="Student Age Groups"><div className="age-cards"><span><strong>{profile.ages||"Pending"}</strong>Preferred learners</span></div></Section></div>
        <Section icon={GraduationCap} title="Education & Certificates"><div className="credential"><span><GraduationCap/></span><div><h3>{profile.education||"Education pending"}</h3></div></div>{profile.certificates&&<div className="credential"><span><Award/></span><div><h3>{profile.certificates}</h3><p>{profile.certificateIssuer||"Issuer pending"}{profile.certificateDate?` · ${profile.certificateDate}`:""}</p></div>{profile.certificateEvidence?<span className="pending-badge">Pending verification</span>:<Link className="evidence-needed" href="/teacher/profile/edit#certificates">Evidence required</Link>}</div>}</Section>
        <Section icon={Languages} title="Languages"><div className="large-chip-list">{profile.languages?.split(";").map(item=><Chip key={item}>{item.trim()}</Chip>)||"Pending"}</div></Section>
      </div>
      <aside className="profile-side-column">
        <Section icon={School} title="Teaching Preferences"><dl className="facts-list"><div><dt>School types</dt><dd>{profile.schoolTypes||"Pending"}</dd></div><div><dt>Contract</dt><dd>Full-time</dd></div><div><dt>Open to relocation</dt><dd>{profile.relocation||"Pending"}</dd></div></dl></Section>
        <Section icon={Calendar} title="Quick Facts"><dl className="facts-list"><div><dt><Calendar/>Available from</dt><dd>{profile.availability||"Pending"}</dd></div><div><dt><Clock3/>Employment status</dt><dd>{profile.employment||"Pending"}</dd></div><div><dt><MapPin/>Relocation</dt><dd>{profile.relocation||"Pending"}</dd></div><div><dt><FileText/>Work permit</dt><dd>{profile.workPermit||"Pending"}</dd></div></dl></Section>
        <Section icon={FileText} title="Documents / CV">{profile.cv?<><div className="cv-card"><span><FileText/></span><div><strong>{profile.cv}</strong><small>PDF · Demo document</small></div><ToastButton label="Download CV" message="CV download will be enabled later."><Download/></ToastButton></div><div className="document-status"><CheckCircle2/> CV visible to schools</div></>:<div className="profile-empty"><FileText/><strong>No CV uploaded</strong><Link href="/teacher/profile/edit#cv">Add document</Link></div>}</Section>
        <div className="profile-art-card"><Image src="/diploma.png" width={115} height={95} alt=""/><strong>Your experience tells a story.</strong><p>Keep your profile current so the right schools can find you.</p></div>
      </aside>
    </div>
  </DashboardShell>;
}
