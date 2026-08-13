"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bookmark, Building2, Check, Eye, GraduationCap, Languages, LockKeyhole, MapPin, Search, ShieldCheck, Sparkles, Target, UsersRound } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { ToastButton } from "@/components/toast-button";
import { schoolNav } from "@/components/school-nav";

const stats = [
  { label:"Recommended Teachers", value:"24", note:"6 new this week", icon:Sparkles, tone:"green" },
  { label:"Recently Viewed Teachers", value:"8", note:"Across the last 7 days", icon:Eye, tone:"blue" },
  { label:"Contacts Unlocked", value:"3", note:"Available in your contacts", icon:LockKeyhole, tone:"ochre" },
  { label:"Saved Teachers", value:"6", note:"Ready to review", icon:Bookmark, tone:"sage" },
];

const teachers = [
  { name:"Maya Anderson", subject:"Primary Years Educator", location:"Bucharest, Romania", match:98, exp:"7 years", languages:"English, Romanian", ages:"Ages 6–11", certificate:"IB PYP · QTS", tone:"mint", reasons:["International school experience","Primary age-group alignment","Located in Bucharest","IB PYP certificate"] },
  { name:"Elena Costea", subject:"English & Humanities", location:"Brașov, Romania", match:94, exp:"5 years", languages:"English, French", ages:"Ages 11–16", certificate:"Cambridge CELTA", tone:"sand", reasons:["Language-of-instruction match","Middle school experience","Open to relocation","CELTA qualification"] },
  { name:"David Radu", subject:"Science & STEM Teacher", location:"Cluj-Napoca, Romania", match:91, exp:"9 years", languages:"English, Romanian", ages:"Ages 12–18", certificate:"IB MYP · MSc", tone:"blue", reasons:["Subject department match","IB school background","Secondary age alignment","Strong profile detail"] },
];

export default function SchoolDashboard() {
  return <DashboardShell nav={schoolNav} role="School" initials="AC" hideBottomSettings>
    <header className="school-welcome"><div><span className="school-kicker">School dashboard</span><h1>Welcome back, ABC College</h1><p>Discover matching teachers and manage your profile from one place.</p></div><span className="school-date">Thursday, 13 August</span></header>

    <section className="school-hero"><div className="school-hero-copy"><span><Sparkles/> Teacher discovery</span><h2>Find the right teachers for your school</h2><p>Explore compatible educators based on your school type, curriculum, student ages, languages of instruction, and location.</p><div><Link href="#teachers" className="school-primary">Browse Teachers <ArrowRight/></Link><Link className="school-secondary" href="/school/profile/view">View Profile</Link></div></div><div className="school-hero-art"><span/><Image src="/school-building.png" width={285} height={205} alt="School campus illustration" priority/></div></section>

    <section className="school-stat-grid" aria-label="School account statistics">{stats.map(({label,value,note,icon:Icon,tone})=><article key={label}><span className={`school-stat-icon ${tone}`}><Icon/></span><div><strong>{value}</strong><h2>{label}</h2><p>{note}</p></div></article>)}</section>

    <div className="school-main-grid">
      <section className="school-recommendations" id="teachers"><div className="school-section-head"><div><span className="school-kicker">Curated for ABC College</span><h2>Recommended Teachers</h2><p>Strong matches based on your school profile and preferences.</p></div><ToastButton message="The complete teacher directory will be available soon.">View all teachers <ArrowRight/></ToastButton></div><div className="school-teacher-grid">{teachers.map((teacher,index)=><TeacherCard teacher={teacher} index={index} key={teacher.name}/>)}</div></section>
      <aside className="school-right-rail">
        <section className="school-side-card why-card"><span className="side-card-icon"><Target/></span><h2>Why these teachers?</h2><p>Recommendations use the information in your school profile:</p><ul><li><Building2/> School type</li><li><UsersRound/> Student age groups</li><li><Languages/> Languages of instruction</li><li><GraduationCap/> Subject alignment</li><li><ShieldCheck/> Profile details</li></ul><small>Rule-based prototype recommendations</small></section>
        <section className="school-side-card quick-card"><h2>Quick Actions</h2><nav><ToastButton message="Teacher directory coming soon."><Search/> Browse all teachers <ArrowRight/></ToastButton><ToastButton message="School profile editor coming soon."><Building2/> Update school profile <ArrowRight/></ToastButton><ToastButton message="Saved teachers directory coming soon."><Bookmark/> Review saved teachers <ArrowRight/></ToastButton><ToastButton message="Contact unlocking is a future integration."><LockKeyhole/> Unlock contact details <ArrowRight/></ToastButton></nav></section>
        <section className="school-side-card recent-card"><div className="rail-title"><h2>Recently Viewed</h2><button>See all</button></div>{teachers.slice(0,3).map((teacher,index)=><div className="recent-teacher" key={teacher.name}><Portrait tone={teacher.tone} index={index}/><div><strong>{teacher.name}</strong><span>{teacher.subject}</span><small><MapPin/> {teacher.location.split(",")[0]} · viewed {index+1} day{index?"s":""} ago</small></div></div>)}</section>
      </aside>
    </div>
  </DashboardShell>;
}

function TeacherCard({teacher,index}:{teacher:typeof teachers[number];index:number}) { return <article className="school-teacher-card"><div className="teacher-cover"><span className="match-badge"><Sparkles/> {teacher.match}% match</span><ToastButton className="teacher-save" label={`Save ${teacher.name}`} message={`${teacher.name} saved for review.`}><Bookmark/></ToastButton><Portrait tone={teacher.tone} index={index}/></div><div className="teacher-card-body"><h3>{teacher.name}</h3><strong className="teacher-subject">{teacher.subject}</strong><span className="teacher-location"><MapPin/> {teacher.location}</span><div className="match-reasons"><h4>Why {index===2?"he":"she"} matches</h4>{teacher.reasons.map(reason=><span key={reason}><Check/>{reason}</span>)}</div><dl><div><dt>Experience</dt><dd>{teacher.exp}</dd></div><div><dt>Languages</dt><dd>{teacher.languages}</dd></div><div><dt>Age groups</dt><dd>{teacher.ages}</dd></div><div><dt>Certificates</dt><dd>{teacher.certificate}</dd></div></dl><div className="teacher-actions"><ToastButton message={`${teacher.name}'s full profile will open here.`}>View Profile</ToastButton><ToastButton message="Contact unlocking is not connected to payment yet."><LockKeyhole/> Unlock Contact</ToastButton></div></div></article> }

function Portrait({tone,index}:{tone:string;index:number}) { return <span className={`school-portrait ${tone}`}><Image src="/Avatar%20.png" width={82} height={82} unoptimized alt={index===0?"Maya Anderson":"Teacher portrait"}/></span> }
