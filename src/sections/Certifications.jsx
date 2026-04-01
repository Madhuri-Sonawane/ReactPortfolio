import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiGoogleanalytics } from "react-icons/si";
import { HiBadgeCheck } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

const CERTIFICATIONS = [
  {
    id: "ga",
    title: "Google Analytics Certification",
    issuer: "Google",
    year: "2024",
    color: "#f97316",
    iconType: "ga",
    tags: ["Analytics", "Data", "SEO"],
  },
  {
    id: "b10x",
    title: "B10x AI Workshop",
    issuer: "B10x",
    year: "2024",
    color: "#38bdf8",
    iconType: "ai",
    tags: ["Artificial Intelligence", "Workshop", "Productivity"],
  },
];

function CertIcon({ type, color }) {
  if (type === "ga") return <SiGoogleanalytics style={{ color }} className="text-xl" />;
  return <span className="text-sm font-black leading-none" style={{ color }}>AI</span>;
}

export default function Certifications() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef   = useRef([]);
  const glowRefs   = useRef([]);

  const handleEnter = (i, color) => {
    gsap.to(cardsRef.current[i], {
      y: -6, scale: 1.02, duration: 0.3, ease: "power3.out",
      boxShadow: `0 20px 50px ${color}22`,
    });
    gsap.to(glowRefs.current[i], { opacity: 1, duration: 0.3, ease: "power2.out" });
  };

  const handleLeave = (i) => {
    gsap.to(cardsRef.current[i], {
      y: 0, scale: 1, duration: 0.35, ease: "power3.out",
      boxShadow: "none",
    });
    gsap.to(glowRefs.current[i], { opacity: 0, duration: 0.3, ease: "power2.in" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
        }
      );

      gsap.fromTo(cardsRef.current.filter(Boolean),
        { opacity: 0, y: 36, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: cardsRef.current[0], start: "top 88%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="certifications" className="px-[8%] py-24">

      {/* Heading */}
      <div ref={headingRef} style={{ opacity: 0 }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <h3 className="text-xs uppercase tracking-[0.25em] text-sky-400 font-semibold">
            Certifications
          </h3>
        </div>
        <h2 className="text-3xl font-bold text-slate-100 font-[Sora]">
          Verified credentials<span className="text-sky-400">.</span>
        </h2>
        <p className="mt-3 text-sm text-slate-500 max-w-md leading-relaxed">
          Courses and workshops completed to sharpen skills beyond the day job.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        {CERTIFICATIONS.map((cert, i) => (
          <div
            key={cert.id}
            ref={(el) => (cardsRef.current[i] = el)}
            onMouseEnter={() => handleEnter(i, cert.color)}
            onMouseLeave={() => handleLeave(i)}
            className="relative rounded-2xl border border-white/8 bg-slate-900/50
                       p-6 cursor-default overflow-hidden
                       hover:border-white/14 transition-colors duration-300"
            style={{ opacity: 0 }}
          >
            {/* Glow blob */}
            <div
              ref={(el) => (glowRefs.current[i] = el)}
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                opacity: 0,
                background: `radial-gradient(ellipse at top left, ${cert.color}14, transparent 65%)`,
              }}
            />

            {/* Top accent line */}
            <div
              className="absolute top-0 left-6 right-6 h-[2px] rounded-full"
              style={{
                background: `linear-gradient(to right, ${cert.color}70, transparent)`,
              }}
            />

            <div className="relative z-10 flex items-start gap-4">
              {/* Icon badge */}
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center
                           justify-center border"
                style={{
                  backgroundColor: `${cert.color}12`,
                  borderColor: `${cert.color}30`,
                }}
              >
                <CertIcon type={cert.iconType} color={cert.color} />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-100 font-[Sora] leading-snug">
                    {cert.title}
                  </h3>
                  <HiBadgeCheck
                    className="flex-shrink-0 text-lg mt-0.5"
                    style={{ color: cert.color }}
                  />
                </div>

                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs text-slate-500">{cert.issuer}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-700" />
                  <span className="text-xs text-slate-600 font-mono">{cert.year}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {cert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full border font-medium"
                      style={{
                        backgroundColor: `${cert.color}10`,
                        borderColor: `${cert.color}25`,
                        color: cert.color,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
