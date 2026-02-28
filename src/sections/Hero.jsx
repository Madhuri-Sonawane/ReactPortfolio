import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import HeroCodeVisual from "../components/HeroCodeVisual";

const TITLES = ["React Developer", "Frontend Engineer", "UI Enthusiast"];

export default function Hero() {
  const tagRef             = useRef(null);
  const nameRef            = useRef(null);
  const titleRef           = useRef(null);
  const descRef            = useRef(null);
  const btnsRef            = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const [typeIndex, setTypeIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(tagRef.current,   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
      .fromTo(nameRef.current,  { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.2")
      .fromTo(titleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.2")
      .fromTo(descRef.current,  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.15")
      .fromTo(btnsRef.current,  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.15")
      .fromTo(scrollIndicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.1");
  }, []);

  useEffect(() => {
    const current = TITLES[typeIndex];
    let timeout;
    if (!deleting && displayed.length < current.length)
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    else if (!deleting && displayed.length === current.length)
      timeout = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && displayed.length > 0)
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45);
    else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTypeIndex((i) => (i + 1) % TITLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, typeIndex]);

  return (
    <section className="relative min-h-screen flex items-center px-[8%] pt-20 pb-12 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-sky-400/5 blur-[100px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
        <div>
          <div ref={tagRef}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-400/30
                       bg-sky-400/10 text-sky-400 text-xs font-medium tracking-wider uppercase mb-6"
            style={{ opacity: 0 }}>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            Open to opportunities
          </div>

          <h1 ref={nameRef} className="text-5xl sm:text-6xl font-bold text-slate-100 leading-tight"
              style={{ opacity: 0 }}>
            Madhuri<br />
            <span className="text-gradient">Sonawane</span>
          </h1>

          <div ref={titleRef}
               className="mt-4 flex items-center gap-2 text-xl text-slate-300 font-medium h-8"
               style={{ opacity: 0 }}>
            <span>{displayed}</span>
            <span className="w-0.5 h-6 bg-sky-400 animate-pulse rounded-full" />
          </div>

          <p ref={descRef} className="mt-6 text-base text-slate-400 leading-relaxed max-w-md"
             style={{ opacity: 0 }}>
            I build fast, clean, and accessible user interfaces using React and modern JavaScript.
            Focused on turning designs into real, scalable products.
          </p>

          <div ref={btnsRef} className="mt-8 flex flex-wrap gap-4" style={{ opacity: 0 }}>
            <Link to="/projects"
              className="px-6 py-3 rounded-full bg-sky-400 text-slate-900 text-sm font-semibold
                         transition-all duration-200 hover:-translate-y-0.5
                         hover:shadow-[0_8px_24px_rgba(56,189,248,0.4)]">
              View Projects →
            </Link>
            <a href="/Madhuri_Sonawane.pdf" download
              className="px-6 py-3 rounded-full border border-slate-600 text-slate-300 text-sm
                         font-medium transition-all duration-200
                         hover:border-sky-400/60 hover:text-sky-400 hover:-translate-y-0.5">
              Download Resume
            </a>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="w-full max-w-[520px]">
            <HeroCodeVisual />
          </div>
        </div>
      </div>

      <div ref={scrollIndicatorRef}
           className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
           style={{ opacity: 0 }}>
        <span className="text-xs text-slate-500 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-sky-400/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}