import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import profileHero from "../assets/profile-hero.png";

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
          y: 40,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.5"
      );
  }, []);

  return (
    <section
      ref={heroRef}
      className="
        min-h-[calc(100vh-4rem)]
        pt-24
        px-4 sm:px-[8%]
        flex flex-col
        lg:grid lg:grid-cols-12
        gap-12
        items-center
      "
    >
      {/* TEXT — FIRST ON MOBILE */}
      <div
        ref={textRef}
        className="w-full order-1 lg:order-none lg:col-span-5"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-100">
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
          <Link
              to="/projects"
              className="rounded-full bg-sky-400 px-7 py-3 text-sm font-medium text-slate-900 hover:-translate-y-0.5 transition"
            >
              View Projects
            </Link>
            
            <Link
              to="/contact"
              className="rounded-full border border-white/20 px-7 py-3 text-sm text-slate-200 hover:bg-white/5 transition"
            >
              Contact Me
          </Link>

        </div>
      </div>

      {/* IMAGE — BELOW TEXT ON MOBILE */}
      <div
        ref={photoRef}
        className="w-full order-2 lg:order-none lg:col-span-7 flex justify-center"
      >
        <img
          src={profileHero}
          alt="Madhuri portrait"
          className="
            w-full
            max-w-[420px]
            sm:max-w-[480px]
            lg:max-w-[520px]
            rounded-2xl
            shadow-[0_30px_80px_rgba(0,0,0,0.6)]
            contrast-[1.05]
            brightness-[0.95]
          "
        />
      </div>
    </section>
  );
}
