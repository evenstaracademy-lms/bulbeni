import { TeacherCollectionPage } from "@/components/teacher-collection-page";
import { CONNECTION_REQUESTS_KEY } from "@/components/school-teacher-state";

export default function UnlockedTeachersPage(){return <TeacherCollectionPage title="Unlocked Contacts" copy="View teachers whose contact details are available to your school." storageKey={CONNECTION_REQUESTS_KEY} unlocked/>}
