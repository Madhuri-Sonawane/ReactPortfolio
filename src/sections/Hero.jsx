import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import reactLogo from "../assets/react-logo.svg";

/* ── Code animation lines ── */
const CODE_LINES = [
  "import React from 'react';",
  "",
  "const Developer = () => {",
  "  return <h1>React</h1>;",
  "};",
  "",
  "export default Developer;",
];

const FINAL_TEXT = "React Developer";

/* ── Typewriter titles ── */
const TITLES = [
  "React Developer",
  "Frontend Engineer",
  "UI Enthusiast",
];

export default function Hero() {
  /* ── Code visual state ── */
  const codeRef = useRef(null);
  const logoRef = useRef(null);
  const lettersRef = useRef([]);
  const hasPlayed = useRef(false);
  const [showResult, setShowResult] = useState(false);

  /* ── Left side refs for GSAP entrance ── */
  const tagRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const btnsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  /* ── Typewriter state ── */
  const [typeIndex, setTypeIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  /* ── LEFT SIDE: GSAP entrance ── */
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(tagRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
      .fromTo(nameRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.2")
      .fromTo(titleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.2")
      .fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.15")
      .fromTo(btnsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.15")
      .fromTo(scrollIndicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.1");
  }, []);

  /* ── Typewriter effect ── */
  useEffect(() => {
    const current = TITLES[typeIndex];
    let timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTypeIndex((i) => (i + 1) % TITLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, typeIndex]);

  /* ── CODE TYPING — run once ── */
  useEffect(() => {
    if (hasPlayed.current) return;
    hasPlayed.current = true;
    let index = 0;

    const interval = setInterval(() => {
      if (!codeRef.current) return;
      if (index < CODE_LINES.length) {
        codeRef.current.textContent += CODE_LINES[index] + "\n";
        index++;
      } else {
        clearInterval(interval);
        gsap.to(codeRef.current, {
          opacity: 0,
          duration: 0.4,
          delay: 0.5,
          onComplete: () => setShowResult(true),
        });
      }
    }, 180);

    return () => clearInterval(interval);
  }, []);

  /* ── LOGO float + rotate ── */
  useEffect(() => {
    if (!showResult || !logoRef.current) return;
    const floatTween = gsap.to(logoRef.current, {
      y: -14, duration: 2.4, ease: "sine.inOut", repeat: -1, yoyo: true,
    });
    const rotateTween = gsap.to(logoRef.current, {
      rotate: 360, duration: 14, ease: "linear", repeat: -1,
    });
    return () => { floatTween.kill(); rotateTween.kill(); };
  }, [showResult]);

  /* ── RESULT text letter animation ── */
  useEffect(() => {
    if (!showResult) return;
    gsap.fromTo(
      lettersRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, stagger: { each: 0.08, from: "end" }, ease: "power3.out" }
    );
  }, [showResult]);

  return (
    <section className="relative min-h-screen flex items-center px-[8%] pt-20 pb-12 overflow-hidden">

      {/* ── Background glow blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full
                        bg-sky-400/5 blur-[100px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full
                        bg-indigo-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">

        {/* ── LEFT: Text ── */}
        <div>
          {/* Tag */}
          <div
            ref={tagRef}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                       border border-sky-400/30 bg-sky-400/10 text-sky-400 text-xs
                       font-medium tracking-wider uppercase mb-6"
            style={{ opacity: 0 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            Open to opportunities
          </div>

          {/* Name */}
          <h1
            ref={nameRef}
            className="text-5xl sm:text-6xl font-bold text-slate-100 leading-tight"
            style={{ opacity: 0 }}
          >
            Madhuri
            <br />
            <span className="text-gradient">Sonawane</span>
          </h1>

          {/* Typewriter title */}
          <div
            ref={titleRef}
            className="mt-4 flex items-center gap-2 text-xl text-slate-300 font-medium h-8"
            style={{ opacity: 0 }}
          >
            <span>{displayed}</span>
            <span className="w-0.5 h-6 bg-sky-400 animate-pulse rounded-full" />
          </div>

          {/* Description */}
          <p
            ref={descRef}
            className="mt-6 text-base text-slate-400 leading-relaxed max-w-md"
            style={{ opacity: 0 }}
          >
            I build fast, clean, and accessible user interfaces using React and
            modern JavaScript. Focused on turning designs into real, scalable
            products.
          </p>

          {/* CTA Buttons */}
          <div
            ref={btnsRef}
            className="mt-8 flex flex-wrap gap-4"
            style={{ opacity: 0 }}
          >
            <Link
              to="/projects"
              className="px-6 py-3 rounded-full bg-sky-400 text-slate-900 text-sm font-semibold
                         transition-all duration-200 hover:-translate-y-0.5
                         hover:shadow-[0_8px_24px_rgba(56,189,248,0.4)]"
            >
              View Projects →
            </Link>
            <a
              href="/Madhuri_Sonawane.pdf"
              download
              className="px-6 py-3 rounded-full border border-slate-600 text-slate-300 text-sm
                         font-medium transition-all duration-200
                         hover:border-sky-400/60 hover:text-sky-400 hover:-translate-y-0.5"
            >
              Download Resume
            </a>
          </div>
        </div>

        {/* ── RIGHT: Code visual ── */}
        <div className="flex justify-center">
          <div
            className="w-[520px] h-[320px] bg-slate-900/90 border border-sky-400/30 rounded-xl
                       shadow-[0_0_40px_rgba(0,140,255,0.4)] font-mono text-sm
                       flex items-center justify-center"
          >
            {/* Code typing */}
            {!showResult && (
              <pre
                ref={codeRef}
                className="bg-slate-950 rounded-lg p-4 min-h-[200px] w-[480px]
                           text-sky-400 whitespace-pre-wrap"
              />
            )}

            {/* Result */}
            {showResult && (
              <div className="flex flex-col items-center justify-center gap-5">
                <img ref={logoRef} src={reactLogo} alt="React Logo" className="w-24" />
                <div className="text-4xl font-semibold text-sky-400 text-center">
                  {FINAL_TEXT.split("").map((char, i) => (
                    <span
                      key={i}
                      ref={(el) => (lettersRef.current[i] = el)}
                      className="inline-block"
                      dangerouslySetInnerHTML={{ __html: char === " " ? "&nbsp;" : char }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span className="text-xs text-slate-500 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-sky-400/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}