/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Award, BookOpen, Briefcase, Check, Clock3, Download, FileText, GraduationCap, Languages, MapPin, Play, SlidersHorizontal, UserRound, UsersRound, Video } from "lucide-react";
import type { TeacherProfile } from "@/components/teacher-profile-store";
import { ToastButton } from "@/components/toast-button";
import { useI18n } from "@/components/i18n";

const subjects = ["English Language", "English Literature", "Exam Preparation (IELTS, YDS, TOEFL)", "Academic Writing", "Conversation & Fluency"];

function Card({ className, icon: Icon, title, children }: { className:string; icon:React.ComponentType<{size?:number}>; title:string; children:React.ReactNode }) {
  const {t}=useI18n();return <section className={`reference-card ${className}`}><header><Icon/><h2>{t(title)}</h2></header>{children}</section>;
}

export function TeacherProfileGrid({ profile }: { profile:TeacherProfile }) {
  const certificateName=profile.certificates||"CELTA";
  return <div className="reference-profile-grid">
    <Card className="ref-about" icon={UserRound} title="About Me"><p className="ref-about-copy">{profile.about||"Add your professional introduction to help schools understand your teaching approach and classroom values."}</p></Card>
    <Card className="ref-video" icon={Video} title="Introduction Video"><div className="ref-video-frame">{profile.profilePhoto&&<img src={profile.profilePhoto} alt=""/>}<button aria-label="Play introduction video"><Play fill="currentColor"/></button><div className="video-controls"><Play fill="currentColor"/><span>0:00 / 1:28</span><i/><span>◖))</span><span>⛶</span></div></div></Card>
    <Card className="ref-quick" icon={Clock3} title="Quick Facts"><div className="quick-list"><Fact icon={MapPin} label="Location" value={profile.location||"Not provided"}/><Fact icon={Briefcase} label="Experience" value={`${profile.yearsExperience||"0"} years`}/><Fact icon={Clock3} label="Availability" value={profile.availability||"Not provided"}/><Fact icon={Check} label="Work Permit" value={profile.workPermit||"Not provided"}/></div></Card>
    <Card className="ref-experience" icon={Briefcase} title="Teaching Experience"><div className="ref-timeline"><article><i/><span>{profile.yearsExperience||"0"} years total</span><strong>{profile.subject||"Teaching role"}</strong><small>{profile.schoolTypes?.split("|").join(" · ")||"School types not provided"}</small><p>{profile.experience||"Experience details have not been added."}</p></article></div><Link href="/teacher/profile/edit#experience">View experience →</Link></Card>
    <Card className="ref-subjects" icon={BookOpen} title="Subjects"><ul className="check-list">{(profile.subjects?profile.subjects.split(","):subjects).slice(0,5).map(item=><li key={item}><Check/>{item.trim()}</li>)}</ul></Card>
    <Card className="ref-ages" icon={UsersRound} title="Student Age Groups"><div className="age-table">{profile.ages?.split("|").filter(Boolean).map(age=><span key={age}>{age}</span>)||<span>Not provided</span>}</div></Card>
    <Card className="ref-education" icon={GraduationCap} title="Education & Certificates"><div className="education-list"><div><span><Award/></span><p><strong>{certificateName}</strong><small>{profile.certificateIssuer||"Issuer not provided"}</small></p></div><div><span><GraduationCap/></span><p><strong>{profile.education||"Education not provided"}</strong></p></div></div><Link href="/teacher/profile/edit#certificates">View all certificates →</Link></Card>
    <Card className="ref-languages" icon={Languages} title="Languages"><div className="language-table">{profile.languages?.split(";").filter(Boolean).map(language=>{const [name,...level]=language.trim().split(" - ");return <span key={language}>{name}<b>{level.join(" - ")||"Listed"}</b></span>})||<span>Not provided</span>}</div></Card>
    <Card className="ref-preferences" icon={SlidersHorizontal} title="Teaching Preferences"><dl><div><dt>Teaching Mode</dt><dd>{profile.teachingMode?.split("|").join(" & ")||"Not provided"}</dd></div><div><dt>Employment Type</dt><dd>{profile.employment?.split("|").join(" & ")||"Not provided"}</dd></div><div><dt>Availability</dt><dd>{profile.availability||"Not provided"}</dd></div><div><dt>Relocation</dt><dd>{profile.relocation||"Not provided"}</dd></div><div><dt>Work Permit</dt><dd>{profile.workPermit||"Not provided"}</dd></div></dl></Card>
    <Card className="ref-documents" icon={FileText} title="Documents / CV"><div className="document-list"><Document name={profile.cv||"Ayse_Yilmaz_CV.pdf"} tone="red"/><Document name={profile.certificateEvidence?.split("|")[0]||"CELTA_Certificate.pdf"} tone="blue"/><Document name="BA_Diploma.pdf" tone="green"/></div><Link href="/teacher/profile/edit#cv">＋ &nbsp; Upload New Document</Link></Card>
  </div>;
}

function Fact({icon:Icon,label,value}:{icon:React.ComponentType<{size?:number}>;label:string;value:string}) { const {t}=useI18n();return <div><span><Icon/></span><p><strong>{t(label)}</strong><small>{value}</small></p></div> }
function Document({name,tone}:{name:string;tone:string}) { return <div className="document-row"><span className={tone}><FileText/><b>PDF</b></span><p><strong>{name}</strong><small>Uploaded · 24 Apr 2024</small></p><ToastButton label={`Download ${name}`} message="Document download will be available later."><Download/></ToastButton></div> }
