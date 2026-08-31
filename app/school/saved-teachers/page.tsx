import { TeacherCollectionPage } from "@/components/teacher-collection-page";
import { SAVED_TEACHERS_KEY } from "@/components/school-teacher-state";

export default function SavedTeachersPage(){return <TeacherCollectionPage title="Saved Teachers" copy="Review the teachers your school has saved." storageKey={SAVED_TEACHERS_KEY}/>}
