"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, Home, Menu, Settings, X } from "lucide-react";
import { useState } from "react";
import { Brand } from "@/components/brand";
import { useTeacherProfile } from "@/components/teacher-profile-store";
import { useToast } from "@/components/toast";

export type NavItem = { label: string; href: string; icon: React.ComponentType<{ size?: number }> };

export function DashboardShell({ children, nav, role, initials, hideBottomSettings = false }: { children: React.ReactNode; nav: NavItem[]; role: string; initials: string; hideBottomSettings?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { resetProfile } = useTeacherProfile();
  const { showToast } = useToast();
  return (
    <div className={`dashboard-shell ${pathname === "/teacher/profile" ? "teacher-profile-route" : ""} ${role === "School" ? "school-dashboard-route" : ""}`}>
      {open && <button className="mobile-overlay" aria-label="Close menu" onClick={() => setOpen(false)} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-top"><Brand compact /><button className="mobile-close" onClick={() => setOpen(false)} aria-label="Close navigation"><X /></button></div>
        <nav aria-label={`${role} dashboard navigation`}>
          <span className="nav-section-label">Workspace</span>
          {nav.map(({ label, href, icon: Icon }) => <Link key={label} href={href} className={pathname === href || (href.startsWith("/") && href !== "/teacher" && pathname.startsWith(`${href}/`)) ? "active" : ""}><Icon size={19} /><span>{label}</span></Link>)}
        </nav>
        <div className="sidebar-bottom">
          <Link href="/"><Home size={19} /><span>Back to home</span></Link>
          {!hideBottomSettings && <button><Settings size={19} /><span>Settings</span></button>}
          {role === "Teacher" && <button className="reset-demo" onClick={() => { resetProfile(); showToast("Demo profile reset successfully."); }}><span>Reset demo profile</span></button>}
          <div className="user-chip"><span className="mini-avatar">{initials}</span><span><strong>{role === "Teacher" ? "Maya Anderson" : "Riverside Academy"}</strong><small>{role} account</small></span><ChevronDown size={16} /></div>
        </div>
      </aside>
      <div className="dashboard-main">
        <header className="dashboard-header"><button className="menu-button" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu /></button><div className="workspace-label"><span>BULBENI</span><i/>{role} workspace</div>{role === "School" && <button className="school-notification" aria-label="Notifications"><Bell/><i>2</i></button>}<div className="header-person"><span><strong>{role === "Teacher" ? "Maya Anderson" : "ABC College"}</strong><small>{role === "Teacher" ? "Educator profile" : "School account"}</small></span><span className="header-avatar">{initials}</span></div></header>
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
