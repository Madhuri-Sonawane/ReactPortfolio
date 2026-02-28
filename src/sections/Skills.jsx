import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiReact, SiJavascript, SiHtml5, SiCss3,
  SiTailwindcss, SiGit, SiGithub, SiVite,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

/* Icons as render functions (not JSX elements) to avoid key issues */
const SKILL_CARDS = [
  {
    title: "Frontend",
    icons: [
      { key: "react", el: <SiReact /> },
      { key: "js",    el: <SiJavascript /> },
      { key: "html",  el: <SiHtml5 /> },
      { key: "css",   el: <SiCss3 /> },
    ],
    desc: "Component-based UI, modern JavaScript, responsive layouts.",
  },
  {
    title: "Styling",
    icons: [
      { key: "tailwind", el: <SiTailwindcss /> },
      { key: "css2",     el: <SiCss3 /> },
    ],
    desc: "Utility-first styling with clean, scalable design systems.",
  },
  {
    title: "Animation",
    icons: [
      { key: "gsap", el: <span className="text-base font-bold">GSAP</span> },
    ],
    desc: "Subtle UI animations that enhance user experience.",
  },
  {
    title: "Tools",
    icons: [
      { key: "git",    el: <SiGit /> },
      { key: "github", el: <SiGithub /> },
      { key: "vite",   el: <SiVite /> },
    ],
    desc: "Modern development workflow and version control.",
  },
];

const EXTRA_SKILLS = [
  { key: "html-pill",  icon: <SiHtml5 />,       label: "HTML"       },
  { key: "css-pill",   icon: <SiCss3 />,         label: "CSS"        },
  { key: "react-pill", icon: <SiReact />,        label: "React"      },
  { key: "js-pill",    icon: <SiJavascript />,   label: "JavaScript" },
  { key: "tw-pill",    icon: <SiTailwindcss />,  label: "Tailwind"   },
  { key: "node-pill",  icon: null,               label: "Node.js"    },
  { key: "api-pill",   icon: null,               label: "REST APIs"  },
  { key: "git-pill",   icon: <SiGit />,          label: "Git"        },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef   = useRef([]);
  const pillsRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" } }
      );

      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: cardsRef.current[0], start: "top 85%" } }
      );

      gsap.fromTo(pillsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: pillsRef.current, start: "top 88%" } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="px-[8%] py-24">

      {/* Heading */}
      <div ref={headingRef} style={{ opacity: 0 }}>
        <h3 className="text-sm uppercase tracking-widest text-sky-400">Skills</h3>
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
            <div className="skill-icons">
              {card.icons.map(({ key, el }) => (
                <span key={key}>{el}</span>
              ))}
            </div>
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
          {EXTRA_SKILLS.map(({ key, icon, label }) => (
            <span key={key} className="skill-pill">
              {icon} {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}