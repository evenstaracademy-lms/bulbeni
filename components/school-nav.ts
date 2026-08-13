import { Bookmark, Building2, LayoutDashboard, LockKeyhole, UsersRound } from "lucide-react";

export const schoolNav = [
  { label:"Dashboard", href:"/school", icon:LayoutDashboard },
  { label:"My Profile", href:"/school/profile", icon:Building2 },
  { label:"Teachers", href:"/school/teachers", icon:UsersRound },
  { label:"Saved Teachers", href:"#saved", icon:Bookmark },
  { label:"Unlocked Contacts", href:"#contacts", icon:LockKeyhole },
];
