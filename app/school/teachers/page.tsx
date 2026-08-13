"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Award, ChevronDown, Clock3, Heart, Languages, MapPin, RotateCcw, Search, SlidersHorizontal, Sparkles, Star, Target, UsersRound, X } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { schoolNav } from "@/components/school-nav";
import { useToast } from "@/components/toast";

type Teacher={name:string;subject:string;city:string;match:number;years:number;languages:string;ages:string;certificate:string;tone:string};
const recommended:Teacher[]=[
  {name:"Emily Johnson",subject:"English Teacher",city:"Ankara, Turkey",match:96,years:8,languages:"English (Native), Turkish (B2)",ages:"Ages 11–18",certificate:"CELTA",tone:"mint"},
  {name:"Michael Brown",subject:"Mathematics Teacher",city:"Istanbul, Turkey",match:94,years:6,languages:"English (Native), Turkish (C1)",ages:"Ages 14–18",certificate:"CELTA",tone:"blue"},
  {name:"Sarah Williams",subject:"English Teacher",city:"Izmir, Turkey",match:91,years:10,languages:"English (Native), French (B1)",ages:"Ages 10–16",certificate:"CELTA",tone:"sand"},
];
const allTeachers:Teacher[]=[
  {name:"David Wilson",subject:"Mathematics Teacher",city:"Ankara, Turkey",match:95,years:7,languages:"English (Native), Turkish (C1)",ages:"Ages 12–18",certificate:"CELTA",tone:"blue"},
  {name:"Laura Davis",subject:"Science Teacher",city:"Istanbul, Turkey",match:92,years:9,languages:"English (Native)",ages:"Ages 11–16",certificate:"PGCE",tone:"sand"},
  {name:"James Taylor",subject:"Physics Teacher",city:"Izmir, Turkey",match:90,years:8,languages:"English (Native), Turkish (B1)",ages:"Ages 14–18",certificate:"CELTA",tone:"mint"},
  {name:"Aylin Kaya",subject:"English Teacher",city:"Bursa, Turkey",match:88,years:5,languages:"English (Native), Turkish (C1)",ages:"Ages 10–15",certificate:"CELTA",tone:"sand"},
  {name:"Daniel Kim",subject:"Chemistry Teacher",city:"Istanbul, Turkey",match:87,years:6,languages:"English (Native), Korean (B1)",ages:"Ages 15–18",certificate:"CELTA",tone:"blue"},
  {name:"Maria Rossi",subject:"Art Teacher",city:"Ankara, Turkey",match:85,years:7,languages:"English (B2), Italian (Native)",ages:"Ages 8–14",certificate:"PGCE",tone:"mint"},
  {name:"Sofia Marin",subject:"Primary Years Teacher",city:"Bucharest, Romania",match:84,years:6,languages:"English, Romanian",ages:"Ages 6–11",certificate:"IB PYP",tone:"sand"},
  {name:"Thomas Weber",subject:"German Teacher",city:"Istanbul, Turkey",match:82,years:11,languages:"German, English",ages:"Ages 12–18",certificate:"DaF",tone:"blue"},
  {name:"Nadia Petrescu",subject:"Biology Teacher",city:"Cluj-Napoca, Romania",match:81,years:4,languages:"English, Romanian",ages:"Ages 11–16",certificate:"QTS",tone:"mint"},
];
const quick=["Subject","City","Experience","Age Group","Language","Profile Completion"];
const advancedGroups=[
  {title:"Personal",fields:[["Gender",["Any","Female","Male","Non-binary"]],["Nationality",["Any","Romanian","Turkish","British","American","Italian"]],["Age",["Any","20–29","30–39","40–49","50+"]]]},
  {title:"Professional",fields:[["Education",["Bachelor's","Master's","Doctorate"]],["Certificates",["CELTA","PGCE","QTS","IB PYP","IB MYP"]],["School Type Experience",["International","Private","Public","IB World"]]]},
  {title:"Work / Employment",fields:[["Availability",["Immediately","Within 1 month","Next term"]],["Work Permit",["EU citizen","Valid local permit","Sponsorship required"]],["Willing to Relocate",["Any","Yes","No"]],["Employment Type",["Full-time","Part-time","Contract"]],["Teaching Mode",["In-person","Online","Hybrid"]]]},
  {title:"Profile Assets",fields:[["Has Video",["Any","Yes","No"]],["Has CV",["Any","Yes","No"]]]},
] as const;

export default function DiscoverTeachers(){
  const [drawer,setDrawer]=useState(false);const [tab,setTab]=useState("All Teachers");const [search,setSearch]=useState("");const [favorites,setFavorites]=useState<string[]>(["David Wilson","Daniel Kim"]);const [advanced,setAdvanced]=useState<Record<string,string>>({});const {showToast}=useToast();
  const activeCount=Object.values(advanced).filter(v=>v&&v!=="Any").length;
  const results=useMemo(()=>allTeachers.filter(t=>(tab!=="Saved Teachers"||favorites.includes(t.name))&&(tab!=="Recommended"||t.match>=88)&&`${t.name} ${t.subject}`.toLowerCase().includes(search.toLowerCase())),[tab,favorites,search]);
  const favorite=(name:string)=>setFavorites(current=>current.includes(name)?current.filter(x=>x!==name):[...current,name]);
  return <DashboardShell nav={schoolNav} role="School" initials="AC" hideBottomSettings>
    <header className="discover-heading"><h1>Discover Teachers</h1><p>Browse matching teachers and save your favourites.</p></header>
    <section className="recommendation-layout"><div className="recommendation-carousel"><div className="discover-section-title"><Sparkles/><h2>Recommended for You</h2></div><button className="carousel-arrow left" aria-label="Previous recommendations"><ArrowLeft/></button><div className="recommended-row">{recommended.map((teacher,index)=><TeacherCard key={teacher.name} teacher={teacher} compact favorite={favorites.includes(teacher.name)} onFavorite={()=>favorite(teacher.name)} imageIndex={index}/>)}</div><button className="carousel-arrow right" aria-label="Next recommendations"><ArrowRight/></button><div className="carousel-dots"><i className="active"/><i/><i/></div></div><aside className="recommendation-reason"><span><Target/></span><h2>Why these teachers?</h2><p>We match teachers based on your school profile, student age groups, languages of instruction, subject compatibility, and teacher profile quality to ensure the best fit.</p><Image src="/stationary-cup.png" width={95} height={80} alt=""/></aside></section>
    <nav className="teacher-tabs" aria-label="Teacher lists">{[{label:"All Teachers",icon:UsersRound},{label:"Recommended",icon:Star},{label:"Saved Teachers",icon:Heart}].map(({label,icon:Icon})=><button key={label} className={tab===label?"active":""} onClick={()=>setTab(label)}><Icon size={16}/>{label}</button>)}</nav>
    <div className="teacher-filter-row"><label className="teacher-search"><Search/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search teachers by name or subject..."/></label>{quick.map(item=><button className="quick-filter" key={item}>{item}<ChevronDown/></button>)}<button className={`advanced-trigger ${activeCount?"active":""}`} onClick={()=>setDrawer(true)}><SlidersHorizontal/> Advanced Search{activeCount?` (${activeCount})`:""}</button><button className="clear-teacher-filters" onClick={()=>{setSearch("");setAdvanced({});setTab("All Teachers")}}><RotateCcw/> Clear Filters</button></div>
    <section className="all-teachers-section"><div className="results-heading"><h2>{tab}</h2><span>{results.length} teachers found</span></div><div className="all-teacher-grid">{results.map((teacher,index)=><TeacherCard key={teacher.name} teacher={teacher} favorite={favorites.includes(teacher.name)} onFavorite={()=>favorite(teacher.name)} imageIndex={index+2}/>)}</div></section>
    {drawer&&<><button className="advanced-overlay" aria-label="Close advanced search" onClick={()=>setDrawer(false)}/><aside className="advanced-drawer"><header><div><span>Teacher filters</span><h2>Advanced Search</h2></div><button onClick={()=>setDrawer(false)} aria-label="Close"><X/></button></header><div className="advanced-content">{advancedGroups.map(group=><section key={group.title}><h3>{group.title}</h3>{group.fields.map(([label,options])=><label key={label}><span>{label}</span><select value={advanced[label]||"Any"} onChange={e=>setAdvanced(current=>({...current,[label]:e.target.value}))}>{!(options as readonly string[]).includes("Any")&&<option>Any</option>}{options.map(option=><option key={option}>{option}</option>)}</select></label>)}</section>)}</div><footer><button onClick={()=>setAdvanced({})}>Clear Filters</button><button onClick={()=>{setDrawer(false);showToast(`${activeCount} advanced filter${activeCount===1?"":"s"} applied.`)}}>Apply Filters</button></footer></aside></>}
  </DashboardShell>
}

function TeacherCard({teacher,compact=false,favorite,onFavorite,imageIndex}:{teacher:Teacher;compact?:boolean;favorite:boolean;onFavorite:()=>void;imageIndex:number}){return <article data-index={imageIndex} className={`discover-teacher-card ${compact?"compact":""}`}><div className="discover-card-top"><span className={`discover-avatar ${teacher.tone}`}><Image src="/Avatar%20.png" width={72} height={72} unoptimized alt={`${teacher.name} portrait`}/></span><div><h3>{teacher.name}</h3><strong>{teacher.subject}</strong><span><MapPin/> {teacher.city}</span></div><span className="discover-match">{teacher.match}%</span><button className={`discover-heart ${favorite?"saved":""}`} onClick={onFavorite} aria-label={`${favorite?"Remove":"Add"} ${teacher.name} ${favorite?"from":"to"} favourites`}><Heart fill={favorite?"currentColor":"none"}/></button></div><div className="teacher-compact-facts"><span><Clock3/> {teacher.years} years experience</span><span><Languages/> {teacher.languages}</span><span><UsersRound/> {teacher.ages}</span></div><div className="discover-card-footer"><span><Award/> {teacher.certificate}</span><Link href="/school/teachers/emily-johnson">View Profile</Link></div></article>}



