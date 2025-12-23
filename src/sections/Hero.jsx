import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(heroRef.current, { opacity: 0, duration: 0.6 })
      .from(
        textRef.current.children,
        {
          y: 24,
          opacity: 0,
          stagger: 0.15,
          duration: 0.5,
        },
        "-=0.3"
      )
      .from(
        photoRef.current,
        {
          x: 40,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.5"
      );
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen pt-24 px-[8%] grid grid-cols-12 gap-12 items-center"
    >
      {/* LEFT — 40% */}
      <div ref={textRef} className="col-span-12 lg:col-span-5">
        <h1 className="text-6xl font-bold leading-tight text-slate-100">
          Hi, I’m <span className="text-sky-400">Madhuri</span>
        </h1>

        <h2 className="mt-3 text-xl text-slate-300">
          Frontend Developer (React)
        </h2>

        <p className="mt-6 text-base leading-relaxed text-slate-400">
          I build fast, clean, and scalable user interfaces using React,
          JavaScript, and modern UI practices.
        </p>

        <div className="mt-10 flex gap-4">
          <a
            href="/projects"
            className="rounded-full bg-sky-400 px-7 py-3 text-sm font-medium text-slate-900 hover:-translate-y-0.5 transition"
          >
            View Projects
          </a>

          <a
            href="/contact"
            className="rounded-full border border-white/20 px-7 py-3 text-sm text-slate-200 hover:bg-white/5 transition"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* RIGHT — 60% */}
      <div
        ref={photoRef}
        className="col-span-12 lg:col-span-7 flex justify-center"
      >
        <img
          src="/src/assets/profile-hero.png"
          alt="Madhuri portrait"
          className="w-full max-w-[520px] h-auto rounded-2xl
                     shadow-[0_30px_80px_rgba(0,0,0,0.6)]
                     contrast-[1.05] brightness-[0.95]"
        />
      </div>
    </section>
  );
}
