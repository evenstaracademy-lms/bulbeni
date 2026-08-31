import { getSupabaseClient } from "@/lib/supabase";
import { defaultSchoolProfile, type SchoolProfile } from "@/components/school-profile-data";

export const DEMO_SCHOOL_ID="6bf94632-0e96-4e79-8022-de5598e593ea";

type SchoolRow={id:string;name:string|null;city:string|null;school_type:string|null;logo_url:string|null;age_groups:string[]|null;languages_of_instruction:string[]|null;subjects:string[]|null;work_permit_support:string|null;accommodation_support:string|null;website:string|null;description:string|null};

export function schoolRowToProfile(row:SchoolRow):SchoolProfile{
  return {...defaultSchoolProfile,logo:row.logo_url||"",name:row.name||"",type:row.school_type||"",city:row.city||"",website:row.website||"",about:row.description||"",ages:(row.age_groups??[]).join("|"),languages:(row.languages_of_instruction??[]).join("|"),departments:(row.subjects??[]).join("|"),workPermit:row.work_permit_support||"",accommodation:row.accommodation_support||"",address:"",curriculum:"",schedule:"",campuses:"",students:"",years:"",workPermitNote:"",accommodationNote:"",highlights:"",email:"",phone:""};
}

export async function loadDemoSchoolProfile(){
  const {data,error}=await getSupabaseClient().from("schools").select("*").eq("id",DEMO_SCHOOL_ID).single();
  if(error)throw error;
  return schoolRowToProfile(data as SchoolRow);
}

export async function saveDemoSchoolProfile(profile:SchoolProfile){
  const payload={name:profile.name,city:profile.city,school_type:profile.type,website:profile.website||null,description:profile.about||null,age_groups:profile.ages.split("|").filter(Boolean),languages_of_instruction:profile.languages.split("|").filter(Boolean),subjects:profile.departments.split("|").filter(Boolean),work_permit_support:profile.workPermit||null,accommodation_support:profile.accommodation||null};
  const {data,error}=await getSupabaseClient().from("schools").update(payload).eq("id",DEMO_SCHOOL_ID).select("*").single();
  if(error)throw error;
  return schoolRowToProfile(data as SchoolRow);
}
