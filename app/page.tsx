"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Check,
  HeartHandshake,
  Search,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Brand } from "@/components/brand";
import { useI18n } from "@/components/i18n";

const paths = [
  {
    href: "/teacher",
    icon: UserRound,
    eyebrow: "For educators",
    title: "I’m a Teacher",
    copy: "Build a profile that goes beyond a résumé and meet schools that value what you bring.",
    cta: "Explore teacher space",
    className: "path-card path-card-teacher",
  },
  {
    href: "/school",
    icon: Building2,
    eyebrow: "For schools",
    title: "I’m a School",
    copy: "Discover thoughtful educators who align with your culture, classrooms, and community.",
    cta: "Explore school space",
    className: "path-card path-card-school",
  },
];

export default function Home() {
  const {language,setLanguage,t}=useI18n();
  return (
    <main className="landing-page">
      <header className="landing-nav page-width">
        <Brand />
        <nav aria-label="Main navigation" className="landing-links">
          <a href="#how-it-works">{t("How it works")}</a>
          <a href="#why-bulbeni">{t("Why Bulbeni")}</a>
        </nav>
        <div className="landing-nav-actions"><div className="language-switcher" aria-label={t("Language")}><button className={language==="en"?"active":""} onClick={()=>setLanguage("en")} aria-pressed={language==="en"}>EN</button><button className={language==="tr"?"active":""} onClick={()=>setLanguage("tr")} aria-pressed={language==="tr"}>TR</button></div><Link className="nav-cta" href="#how-it-works">{t("Find your fit")} <ArrowRight size={16} /></Link></div>
      </header>

      <section className="hero page-width">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={15} /> {t("A better way to find your fit")}</div>
          <h1>{t("Where great teachers meet")} <em>{t("the right schools.")}</em></h1>
          <p className="hero-lede">{t("BULBENI brings educators and schools together around what matters most—shared values, meaningful work, and classrooms where everyone can thrive.")}</p>
          <div className="hero-proof">
            <span className="avatar-stack" aria-hidden="true"><i>AM</i><i>JL</i><i>SK</i></span>
            <span><strong>{t("Built for real connection")}</strong><br />{t("Not just another job board")}</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Illustration of a successful teacher and school match">
          <div className="orb orb-one" /><div className="orb orb-two" />
          <div className="match-card">
            <span className="match-label"><Check size={14} /> Strong match</span>
            <div className="teacher-avatar">MA</div>
            <h2>Maya Anderson</h2>
            <p>Primary Years Educator</p>
            <div className="match-score"><strong>94%</strong><span>Values alignment</span></div>
            <div className="match-tags"><span>Inquiry-led</span><span>Community</span><span>+3</span></div>
          </div>
          <div className="floating-note note-top"><HeartHandshake size={20} /><span><strong>Culture first</strong> matching</span></div>
          <div className="floating-note note-bottom"><BookOpen size={20} /><span><strong>12 new schools</strong> this week</span></div>
        </div>
      </section>

      <section className="path-section page-width" id="how-it-works">
        <div className="section-heading">
          <div><span className="kicker">{t("Start your journey")}</span><h2>{t("Choose your path")}</h2></div>
          <p>{t("Whether you’re shaping young minds or building a remarkable team, your next chapter starts here.")}</p>
        </div>
        <div className="path-grid">
          {paths.map(({ href, icon: Icon, eyebrow, title, copy, cta, className }) => (
            <Link href={href} className={className} key={href}>
              <span className="path-icon"><Icon size={26} /></span>
              <span className="path-eyebrow">{t(eyebrow)}</span>
              <h3>{t(title)}</h3><p>{t(copy)}</p>
              <span className="path-cta">{t(cta)} <ArrowRight size={18} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="value-strip" id="why-bulbeni">
        <div className="page-width value-grid">
          <div><Search /><strong>Discover with intention</strong><span>Smart, human-centered matching</span></div>
          <div><HeartHandshake /><strong>Connect on what matters</strong><span>Culture, values, and ambitions</span></div>
          <div><Sparkles /><strong>Grow into your best</strong><span>Opportunities made for you</span></div>
        </div>
      </section>

      <footer className="landing-footer page-width"><Brand /><p>Better matches. Brighter classrooms.</p><span>© 2026 BULBENI</span></footer>
    </main>
  );
}
