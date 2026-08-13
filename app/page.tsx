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
  return (
    <main className="landing-page">
      <header className="landing-nav page-width">
        <Brand />
        <nav aria-label="Main navigation" className="landing-links">
          <a href="#how-it-works">How it works</a>
          <a href="#why-bulbeni">Why Bulbeni</a>
        </nav>
        <Link className="nav-cta" href="/teacher">Find your fit <ArrowRight size={16} /></Link>
      </header>

      <section className="hero page-width">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={15} /> A better way to find your fit</div>
          <h1>Where great teachers meet <em>the right schools.</em></h1>
          <p className="hero-lede">BULBENI brings educators and schools together around what matters most—shared values, meaningful work, and classrooms where everyone can thrive.</p>
          <div className="hero-proof">
            <span className="avatar-stack" aria-hidden="true"><i>AM</i><i>JL</i><i>SK</i></span>
            <span><strong>Built for real connection</strong><br />Not just another job board</span>
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
          <div><span className="kicker">Start your journey</span><h2>Choose your path</h2></div>
          <p>Whether you’re shaping young minds or building a remarkable team, your next chapter starts here.</p>
        </div>
        <div className="path-grid">
          {paths.map(({ href, icon: Icon, eyebrow, title, copy, cta, className }) => (
            <Link href={href} className={className} key={href}>
              <span className="path-icon"><Icon size={26} /></span>
              <span className="path-eyebrow">{eyebrow}</span>
              <h3>{title}</h3><p>{copy}</p>
              <span className="path-cta">{cta} <ArrowRight size={18} /></span>
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
