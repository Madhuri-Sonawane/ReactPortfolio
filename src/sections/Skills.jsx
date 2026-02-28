import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiVite,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const SKILL_CARDS = [
  {
    title: "Frontend",
    icons: [<SiReact />, <SiJavascript />, <SiHtml5 />, <SiCss3 />],
    desc: "Component-based UI, modern JavaScript, responsive layouts.",
  },
  {
    title: "Styling",
    icons: [<SiTailwindcss />, <SiCss3 />],
    desc: "Utility-first styling with clean, scalable design systems.",
  },
  {
    title: "Animation",
    icons: [<span className="text-base font-bold">GSAP</span>],
    desc: "Subtle UI animations that enhance user experience.",
  },
  {
    title: "Tools",
    icons: [<SiGit />, <SiGithub />, <SiVite />],
    desc: "Modern development workflow and version control.",
  },
];

const EXTRA_SKILLS = [
  { icon: <SiHtml5 />, label: "HTML" },
  { icon: <SiCss3 />, label: "CSS" },
  { icon: <SiReact />, label: "React" },
  { icon: <SiJavascript />, label: "JavaScript" },
  { icon: <SiTailwindcss />, label: "Tailwind" },
  { icon: null, label: "Node.js" },
  { icon: null, label: "REST APIs" },
  { icon: <SiGit />, label: "Git" },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const pillsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Heading reveal ── */
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        }
      );

      /* ── Cards stagger reveal ── */
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: "top 85%",
          },
        }
      );

      /* ── Pills fade in ── */
      gsap.fromTo(
        pillsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: {
            trigger: pillsRef.current,
            start: "top 88%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="px-[8%] py-24">

      {/* Heading */}
      <div ref={headingRef} style={{ opacity: 0 }}>
        <h3 className="text-sm uppercase tracking-widest text-sky-400">
          Skills
        </h3>
        <h2 className="mt-4 text-3xl font-semibold text-slate-100">
          Technologies I work with
        </h2>
      </div>

      {/* Cards */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl">
        {SKILL_CARDS.map((card, i) => (
          <div
            key={card.title}
            ref={(el) => (cardsRef.current[i] = el)}
            className="skill-card"
            style={{ opacity: 0 }}
          >
            <h4 className="skill-title">{card.title}</h4>
            <div className="skill-icons">{card.icons}</div>
            <p className="skill-desc">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Pills */}
      <div className="mt-16 max-w-6xl" ref={pillsRef} style={{ opacity: 0 }}>
        <h4 className="text-sm uppercase tracking-widest text-slate-400 mb-6">
          Additional Technologies
        </h4>
        <div className="flex flex-wrap gap-3">
          {EXTRA_SKILLS.map(({ icon, label }) => (
            <span key={label} className="skill-pill">
              {icon} {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}