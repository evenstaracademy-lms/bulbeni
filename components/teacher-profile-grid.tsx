/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Award, BookOpen, Briefcase, Check, Clock3, Download, FileText, GraduationCap, Languages, MapPin, Play, SlidersHorizontal, UserRound, UsersRound, Video } from "lucide-react";
import type { TeacherProfile } from "@/components/teacher-profile-store";
import { ToastButton } from "@/components/toast-button";

const subjects = ["English Language", "English Literature", "Exam Preparation (IELTS, YDS, TOEFL)", "Academic Writing", "Conversation & Fluency"];

function Card({ className, icon: Icon, title, children }: { className:string; icon:React.ComponentType<{size?:number}>; title:string; children:React.ReactNode }) {
  return <section className={`reference-card ${className}`}><header><Icon/><h2>{title}</h2></header>{children}</section>;
}

export function TeacherProfileGrid({ profile }: { profile:TeacherProfile }) {
  const certificateName=profile.certificates||"CELTA";
  return <div className="reference-profile-grid">
    <Card className="ref-about" icon={UserRound} title="About Me"><p className="ref-about-copy">{profile.about||"Add your professional introduction to help schools understand your teaching approach and classroom values."}</p></Card>
    <Card className="ref-video" icon={Video} title="Introduction Video"><div className="ref-video-frame">{profile.profilePhoto&&<img src={profile.profilePhoto} alt=""/>}<button aria-label="Play introduction video"><Play fill="currentColor"/></button><div className="video-controls"><Play fill="currentColor"/><span>0:00 / 1:28</span><i/><span>◖))</span><span>⛶</span></div></div></Card>
    <Card className="ref-quick" icon={Clock3} title="Quick Facts"><div className="quick-list"><Fact icon={MapPin} label="Location" value={profile.location||"Ankara, Turkey"}/><Fact icon={Briefcase} label="Experience" value="6 years"/><Fact icon={Clock3} label="Availability" value={profile.availability||"Mon – Fri, 08:00 – 18:00"}/><Fact icon={Check} label="Response Time" value="Usually within a day"/></div></Card>
    <Card className="ref-experience" icon={Briefcase} title="Teaching Experience"><div className="ref-timeline"><article><i/><span>2021 – Present</span><strong>English Teacher</strong><small>Ankara Bilim College, Ankara</small><p>{profile.experience||"Teach students and communicate skills."}</p></article><article><i/><span>2018 – 2021</span><strong>English Teacher</strong><small>Başkent Private School, Ankara</small><p>Designed engaging lessons for primary and middle school students.</p></article></div><Link href="/teacher/profile/edit#experience">View all experience →</Link></Card>
    <Card className="ref-subjects" icon={BookOpen} title="Subjects"><ul className="check-list">{(profile.subjects?profile.subjects.split(","):subjects).slice(0,5).map(item=><li key={item}><Check/>{item.trim()}</li>)}</ul></Card>
    <Card className="ref-ages" icon={UsersRound} title="Student Age Groups"><div className="age-table"><span>Primary School <b>6 – 10</b></span><span>Middle School <b>11 – 14</b></span><span>High School <b>15 – 18</b></span><span>Adult Learners <b>19+</b></span></div></Card>
    <Card className="ref-education" icon={GraduationCap} title="Education & Certificates"><div className="education-list"><div><span><Award/></span><p><strong>{certificateName}</strong><small>{profile.certificateIssuer||"Cambridge University Press & Assessment"}</small></p><b>{profile.certificateDate?.slice(0,4)||"2019"}</b></div><div><span><GraduationCap/></span><p><strong>BA in English Language Teaching</strong><small>Hacettepe University, Ankara</small></p><b>2016</b></div></div><Link href="/teacher/profile/edit#certificates">View all certificates →</Link></Card>
    <Card className="ref-languages" icon={Languages} title="Languages"><div className="language-table"><span>English <b>Native / Bilingual</b></span><span>Turkish <b>Native</b></span><span>German <b>A2 – Basic</b></span></div></Card>
    <Card className="ref-preferences" icon={SlidersHorizontal} title="Teaching Preferences"><dl><div><dt>Teaching Mode</dt><dd>Online & In-person</dd></div><div><dt>Employment Type</dt><dd>Full-time & Part-time</dd></div><div><dt>Preferred Schedule</dt><dd>Weekdays</dd></div><div><dt>Lesson Length</dt><dd>45 – 60 minutes</dd></div><div><dt>Preferred Start</dt><dd>{profile.availability||"Immediate"}</dd></div></dl></Card>
    <Card className="ref-documents" icon={FileText} title="Documents / CV"><div className="document-list"><Document name={profile.cv||"Ayse_Yilmaz_CV.pdf"} tone="red"/><Document name={profile.certificateEvidence?.split("|")[0]||"CELTA_Certificate.pdf"} tone="blue"/><Document name="BA_Diploma.pdf" tone="green"/></div><Link href="/teacher/profile/edit#cv">＋ &nbsp; Upload New Document</Link></Card>
  </div>;
}

function Fact({icon:Icon,label,value}:{icon:React.ComponentType<{size?:number}>;label:string;value:string}) { return <div><span><Icon/></span><p><strong>{label}</strong><small>{value}</small></p></div> }
function Document({name,tone}:{name:string;tone:string}) { return <div className="document-row"><span className={tone}><FileText/><b>PDF</b></span><p><strong>{name}</strong><small>Uploaded · 24 Apr 2024</small></p><ToastButton label={`Download ${name}`} message="Document download will be available later."><Download/></ToastButton></div> }
