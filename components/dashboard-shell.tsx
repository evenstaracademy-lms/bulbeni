"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, Coins, Home, Menu, Settings, X } from "lucide-react";
import { useState } from "react";
import { Brand } from "@/components/brand";
import { useTeacherProfile } from "@/components/teacher-profile-store";
import { useToast } from "@/components/toast";

export type NavItem = { label: string; href: string; icon: React.ComponentType<{ size?: number }> };

export function DashboardShell({ children, nav, role, initials, hideBottomSettings = false, credits = 8 }: { children: React.ReactNode; nav: NavItem[]; role: string; initials: string; hideBottomSettings?: boolean; credits?: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);
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
          <div className="user-chip"><span className="mini-avatar">{initials}</span><span><strong>{role === "Teacher" ? "Maya Anderson" : "Marmara International College"}</strong><small>{role} account</small></span><ChevronDown size={16} /></div>
        </div>
      </aside>
      <div className="dashboard-main">
        <header className="dashboard-header"><button className="menu-button" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu /></button><div className="workspace-label"><span>BULBENI</span><i/>{role} workspace</div>{role === "School"&&<div className="school-credit-tools"><span className="credit-balance"><Coins/>{credits} Credits</span><button className="buy-credits" onClick={()=>setCreditsOpen(true)}>Buy Credits</button></div>}{role === "School" && <button className="school-notification" aria-label="Notifications"><Bell/><i>2</i></button>}<div className="header-person"><span><strong>{role === "Teacher" ? "Maya Anderson" : "Marmara International College"}</strong><small>{role === "Teacher" ? "Educator profile" : "School account"}</small></span><span className="header-avatar">{initials}</span></div></header>
        <main className="dashboard-content">{children}</main>
      </div>
      {creditsOpen&&<div className="prototype-modal-layer" role="presentation" onMouseDown={()=>setCreditsOpen(false)}><section className="prototype-modal" role="dialog" aria-modal="true" aria-labelledby="buy-credits-title" onMouseDown={event=>event.stopPropagation()}><header><div><span>Prototype packages</span><h2 id="buy-credits-title">Buy Credits</h2></div><button onClick={()=>setCreditsOpen(false)} aria-label="Close"><X/></button></header><p>Select a mock credit package. No payment will be processed.</p><div className="credit-packages">{[5,10,25].map(amount=><button key={amount} onClick={()=>{setCreditsOpen(false);showToast(`${amount} Credits package selected. Payment is not connected in this prototype.`)}}><Coins/><strong>{amount} Credits</strong><small>Demo package</small></button>)}</div><footer><button onClick={()=>setCreditsOpen(false)}>Cancel</button></footer></section></div>}
    </div>
  );
}
