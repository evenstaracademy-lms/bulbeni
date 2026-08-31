export const SAVED_TEACHERS_KEY="bulbeni.saved-teachers.v1";
export const CONNECTION_REQUESTS_KEY="bulbeni.connection-requests.v1";
export const TEACHER_STATE_EVENT="bulbeni:teacher-state";

export function readTeacherIds(key:string){
  if(typeof window==="undefined")return [];
  try{return JSON.parse(localStorage.getItem(key)||"[]") as string[]}catch{return []}
}

export function writeTeacherIds(key:string,ids:string[]){
  localStorage.setItem(key,JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent(TEACHER_STATE_EVENT));
}

export function toggleTeacherId(key:string,id:string){
  const current=readTeacherIds(key);
  const next=current.includes(id)?current.filter(value=>value!==id):[...current,id];
  writeTeacherIds(key,next);
  return next;
}
