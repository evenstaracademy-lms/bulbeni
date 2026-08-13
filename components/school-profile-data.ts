export type SchoolProfile=Record<string,string>;

export const defaultSchoolProfile:SchoolProfile={logo:"",name:"ABC College",type:"International School",city:"Bucharest, Romania",address:"24 Academiei Street, Sector 1, Bucharest",website:"https://abccollege.edu",about:"ABC College is a warm, internationally minded learning community committed to academic excellence, curiosity, and student wellbeing.",ages:"Primary School|Middle School|High School",languages:"English|Romanian",departments:"English & Humanities|Mathematics|Science & STEM",curriculum:"Cambridge International",schedule:"Full day",campuses:"2",students:"850",years:"18",workPermit:"Case-by-case",workPermitNote:"We support eligible international candidates through the local permit process.",accommodation:"Assistance provided",accommodationNote:"Relocation guidance and trusted housing contacts are available.",highlights:"STEM / Science Labs|Library|Sports Facilities|Safe / Secure Campus",email:"careers@abccollege.edu",phone:"+40 21 555 0148"};

export const SCHOOL_PROFILE_STORAGE="bulbeni.school-profile.v1";
export const splitSchoolValues=(value:string)=>value?value.split("|").filter(Boolean):[];
