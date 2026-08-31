"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, Coins, Home, Menu, Settings, X } from "lucide-react";
import { useState } from "react";
import { Brand } from "@/components/brand";
import { useTeacherProfile } from "@/components/teacher-profile-store";
import { useToast } from "@/components/toast";
import { useI18n } from "@/components/i18n";

export type NavItem = { label: string; href: string; icon: React.ComponentType<{ size?: number }> };

export function DashboardShell({ children, nav, role, initials, hideBottomSettings = false, credits = 8 }: { children: React.ReactNode; nav: NavItem[]; role: string; initials: string; hideBottomSettings?: boolean; credits?: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const { resetProfile } = useTeacherProfile();
  const { showToast } = useToast();
  const { language, setLanguage, t } = useI18n();
  return (
    <div className={`dashboard-shell ${pathname === "/teacher/profile" ? "teacher-profile-route" : ""} ${role === "School" ? "school-dashboard-route" : ""}`}>
      {open && <button className="mobile-overlay" aria-label={t("Close menu")} onClick={() => setOpen(false)} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-top"><Brand compact /><button className="mobile-close" onClick={() => setOpen(false)} aria-label={t("Close navigation")}><X /></button></div>
        <nav aria-label={`${role} dashboard navigation`}>
          <span className="nav-section-label">{t("Workspace")}</span>
          {nav.map(({ label, href, icon: Icon }) => <Link key={label} href={href} className={pathname === href || (href.startsWith("/") && href !== "/teacher" && pathname.startsWith(`${href}/`)) ? "active" : ""}><Icon size={19} /><span>{t(label)}</span></Link>)}
        </nav>
        <div className="sidebar-bottom">
          <Link href="/"><Home size={19} /><span>{t("Back to home")}</span></Link>
          {!hideBottomSettings && <button><Settings size={19} /><span>{t("Settings")}</span></button>}
          {role === "Teacher" && <button className="reset-demo" onClick={() => { resetProfile(); showToast(t("Demo profile reset successfully.")); }}><span>{t("Reset demo profile")}</span></button>}
          <div className="user-chip"><span className="mini-avatar">{initials}</span><span><strong>{role === "Teacher" ? "Nilaa Salarzaei" : "Marmara International College"}</strong><small>{t(`${role} account`)}</small></span><ChevronDown size={16} /></div>
        </div>
      </aside>
      <div className="dashboard-main">
        <header className="dashboard-header"><button className="menu-button" onClick={() => setOpen(true)} aria-label={t("Open navigation")}><Menu /></button><div className="workspace-label"><span>BULBENI</span><i/>{t(`${role} workspace`)}</div>{role === "School"&&<div className="school-credit-tools"><span className="credit-balance"><Coins/>{credits} {t("Credits")}</span><button className="buy-credits" onClick={()=>setCreditsOpen(true)}>{t("Buy Credits")}</button></div>}<div className="language-switcher" aria-label={t("Language")}><button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button><button className={language === "tr" ? "active" : ""} onClick={() => setLanguage("tr")} aria-pressed={language === "tr"}>TR</button></div>{role === "School" && <button className="school-notification" aria-label={t("Notifications")}><Bell/><i>2</i></button>}<div className="header-person"><span><strong>{role === "Teacher" ? "Nilaa Salarzaei" : "Marmara International College"}</strong><small>{t(role === "Teacher" ? "Educator profile" : "School account")}</small></span><span className="header-avatar">{initials}</span></div></header>
        <main className="dashboard-content">{children}</main>
      </div>
      {creditsOpen&&<div className="prototype-modal-layer" role="presentation" onMouseDown={()=>setCreditsOpen(false)}><section className="prototype-modal" role="dialog" aria-modal="true" aria-labelledby="buy-credits-title" onMouseDown={event=>event.stopPropagation()}><header><div><span>{t("Prototype packages")}</span><h2 id="buy-credits-title">{t("Buy Credits")}</h2></div><button onClick={()=>setCreditsOpen(false)} aria-label={t("Close")}><X/></button></header><p>{t("Select a mock credit package. No payment will be processed.")}</p><div className="credit-packages">{[5,10,25].map(amount=><button key={amount} onClick={()=>{setCreditsOpen(false);showToast(`${amount} ${t("Credits")} — ${t("Demo package")}`)}}><Coins/><strong>{amount} {t("Credits")}</strong><small>{t("Demo package")}</small></button>)}</div><footer><button onClick={()=>setCreditsOpen(false)}>{t("Cancel")}</button></footer></section></div>}
    </div>
  );
}
