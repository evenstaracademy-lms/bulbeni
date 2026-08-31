"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Award, ChevronDown, Clock3, Heart, Languages, MapPin, RotateCcw, Search, SlidersHorizontal, Sparkles, Star, Target, UsersRound, X } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { schoolNav } from "@/components/school-nav";
import { useToast } from "@/components/toast";
import { getSupabaseClient } from "@/lib/supabase";

type Teacher={id:string;name:string;subject:string;city:string;match:number;years:number;languages:string;ages:string;certificate:string;tone:string;imageUrl:string};
type TeacherRow={id:unknown;full_name:unknown;subject:unknown;city:unknown;years_experience:unknown;languages:unknown;age_groups:unknown;certificates:unknown;match_percentage:unknown;profile_image_url:unknown};
const tones=["mint","blue","sand"];
const displayValue=(value:unknown)=>Array.isArray(value)?value.join(", "):typeof value==="string"?value:"";
const mapTeacher=(row:TeacherRow,index:number):Teacher=>({id:String(row.id),name:displayValue(row.full_name),subject:displayValue(row.subject),city:displayValue(row.city),match:Number(row.match_percentage)||0,years:Number(row.years_experience)||0,languages:displayValue(row.languages),ages:displayValue(row.age_groups),certificate:displayValue(row.certificates),tone:tones[index%tones.length],imageUrl:displayValue(row.profile_image_url)});
const quick=["Subject","City","Experience","Age Group","Language","Profile Completion"];
const advancedGroups=[
  {title:"Personal",fields:[["Gender",["Any","Female","Male","Non-binary"]],["Nationality",["Any","Romanian","Turkish","British","American","Italian"]],["Age",["Any","20–29","30–39","40–49","50+"]]]},
  {title:"Professional",fields:[["Education",["Bachelor's","Master's","Doctorate"]],["Certificates",["CELTA","PGCE","QTS","IB PYP","IB MYP"]],["School Type Experience",["International","Private","Public","IB World"]]]},
  {title:"Work / Employment",fields:[["Availability",["Immediately","Within 1 month","Next term"]],["Work Permit",["EU citizen","Valid local permit","Sponsorship required"]],["Willing to Relocate",["Any","Yes","No"]],["Employment Type",["Full-time","Part-time","Contract"]],["Teaching Mode",["In-person","Online","Hybrid"]]]},
  {title:"Profile Assets",fields:[["Has Video",["Any","Yes","No"]],["Has CV",["Any","Yes","No"]]]},
] as const;

export default function DiscoverTeachers(){
  const [teachers,setTeachers]=useState<Teacher[]>([]);const [loading,setLoading]=useState(true);const [error,setError]=useState("");
  const [drawer,setDrawer]=useState(false);const [tab,setTab]=useState("All Teachers");const [search,setSearch]=useState("");const [favorites,setFavorites]=useState<string[]>([]);const [advanced,setAdvanced]=useState<Record<string,string>>({});const {showToast}=useToast();
  useEffect(()=>{let active=true;(async()=>{try{const {data,error:queryError}=await getSupabaseClient().from("teachers").select("*");if(queryError)throw queryError;if(active)setTeachers(((data??[]) as TeacherRow[]).map(mapTeacher));}catch(cause){if(active)setError(cause instanceof Error?cause.message:"Unable to load teachers.");}finally{if(active)setLoading(false);}})();return()=>{active=false};},[]);
  const activeCount=Object.values(advanced).filter(v=>v&&v!=="Any").length;
  const recommended=useMemo(()=>[...teachers].sort((a,b)=>b.match-a.match).slice(0,3),[teachers]);
  const recommendedIds=useMemo(()=>new Set(recommended.map(teacher=>teacher.id)),[recommended]);
  const results=useMemo(()=>teachers.filter(t=>(tab!=="Saved Teachers"||favorites.includes(t.id))&&(tab!=="Recommended"||recommendedIds.has(t.id))&&`${t.name} ${t.subject}`.toLowerCase().includes(search.toLowerCase())),[tab,favorites,recommendedIds,search,teachers]);
  const favorite=(id:string)=>setFavorites(current=>current.includes(id)?current.filter(x=>x!==id):[...current,id]);
  return <DashboardShell nav={schoolNav} role="School" initials="AC" hideBottomSettings>
    <header className="discover-heading"><h1>Discover Teachers</h1><p>Browse matching teachers and save your favourites.</p></header>
    <section className="recommendation-layout"><div className="recommendation-carousel"><div className="discover-section-title"><Sparkles/><h2>Recommended for You</h2></div><button className="carousel-arrow left" aria-label="Previous recommendations"><ArrowLeft/></button><div className="recommended-row">{recommended.map((teacher,index)=><TeacherCard key={teacher.id} teacher={teacher} compact favorite={favorites.includes(teacher.id)} onFavorite={()=>favorite(teacher.id)} imageIndex={index}/>)}</div><button className="carousel-arrow right" aria-label="Next recommendations"><ArrowRight/></button><div className="carousel-dots"><i className="active"/><i/><i/></div></div><aside className="recommendation-reason"><span><Target/></span><h2>Why these teachers?</h2><p>We match teachers based on your school profile, student age groups, languages of instruction, subject compatibility, and teacher profile quality to ensure the best fit.</p><Image src="/stationary-cup.png" width={95} height={80} alt=""/></aside></section>
    <nav className="teacher-tabs" aria-label="Teacher lists">{[{label:"All Teachers",icon:UsersRound},{label:"Recommended",icon:Star},{label:"Saved Teachers",icon:Heart}].map(({label,icon:Icon})=><button key={label} className={tab===label?"active":""} onClick={()=>setTab(label)}><Icon size={16}/>{label}</button>)}</nav>
    <div className="teacher-filter-row"><label className="teacher-search"><Search/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search teachers by name or subject..."/></label>{quick.map(item=><button className="quick-filter" key={item}>{item}<ChevronDown/></button>)}<button className={`advanced-trigger ${activeCount?"active":""}`} onClick={()=>setDrawer(true)}><SlidersHorizontal/> Advanced Search{activeCount?` (${activeCount})`:""}</button><button className="clear-teacher-filters" onClick={()=>{setSearch("");setAdvanced({});setTab("All Teachers")}}><RotateCcw/> Clear Filters</button></div>
    <section className="all-teachers-section"><div className="results-heading"><h2>{tab}</h2><span>{loading?"Loading teachers...":error?`Unable to load teachers: ${error}`:`${results.length} teachers found`}</span></div>{!loading&&!error&&<div className="all-teacher-grid">{results.map((teacher,index)=><TeacherCard key={teacher.id} teacher={teacher} favorite={favorites.includes(teacher.id)} onFavorite={()=>favorite(teacher.id)} imageIndex={index+2}/>)}</div>}</section>
    {drawer&&<><button className="advanced-overlay" aria-label="Close advanced search" onClick={()=>setDrawer(false)}/><aside className="advanced-drawer"><header><div><span>Teacher filters</span><h2>Advanced Search</h2></div><button onClick={()=>setDrawer(false)} aria-label="Close"><X/></button></header><div className="advanced-content">{advancedGroups.map(group=><section key={group.title}><h3>{group.title}</h3>{group.fields.map(([label,options])=><label key={label}><span>{label}</span><select value={advanced[label]||"Any"} onChange={e=>setAdvanced(current=>({...current,[label]:e.target.value}))}>{!(options as readonly string[]).includes("Any")&&<option>Any</option>}{options.map(option=><option key={option}>{option}</option>)}</select></label>)}</section>)}</div><footer><button onClick={()=>setAdvanced({})}>Clear Filters</button><button onClick={()=>{setDrawer(false);showToast(`${activeCount} advanced filter${activeCount===1?"":"s"} applied.`)}}>Apply Filters</button></footer></aside></>}
  </DashboardShell>
}

function TeacherCard({teacher,compact=false,favorite,onFavorite,imageIndex}:{teacher:Teacher;compact?:boolean;favorite:boolean;onFavorite:()=>void;imageIndex:number}){return <article data-index={imageIndex} className={`discover-teacher-card ${compact?"compact":""}`}><div className="discover-card-top"><span className={`discover-avatar ${teacher.tone}`}><Image src={teacher.imageUrl||"/Avatar%20.png"} width={72} height={72} unoptimized alt={`${teacher.name} portrait`}/></span><div><h3>{teacher.name}</h3><strong>{teacher.subject}</strong><span><MapPin/> {teacher.city}</span></div><span className="discover-match">{teacher.match}%</span><button className={`discover-heart ${favorite?"saved":""}`} onClick={onFavorite} aria-label={`${favorite?"Remove":"Add"} ${teacher.name} ${favorite?"from":"to"} favourites`}><Heart fill={favorite?"currentColor":"none"}/></button></div><div className="teacher-compact-facts"><span><Clock3/> {teacher.years} years experience</span><span><Languages/> {teacher.languages}</span><span><UsersRound/> {teacher.ages}</span></div><div className="discover-card-footer"><span><Award/> {teacher.certificate}</span><Link href={`/school/teachers/${teacher.id}`}>View Profile</Link></div></article>}



