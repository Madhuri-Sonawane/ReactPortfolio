import { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { HiMail } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

/* ── Floating label input ─────────────────── */
function FloatField({ label, name, type = "text", required = false, textarea = false }) {
  const [focused, setFocused] = useState(false);
  const [filled,  setFilled]  = useState(false);
  const wrapRef = useRef(null);

  const isUp = focused || filled;

  const baseClass = `w-full bg-transparent text-slate-200 text-sm pt-5 pb-2 px-4
                     border-0 outline-none resize-none placeholder-transparent`;

  const handleChange = (e) => setFilled(e.target.value.length > 0);

  return (
    <div
      ref={wrapRef}
      className={`relative rounded-xl border transition-all duration-300 overflow-hidden
                  ${focused
                    ? "border-sky-400/60 shadow-[0_0_0_3px_rgba(56,189,248,0.08)]"
                    : "border-white/8 hover:border-white/16"
                  } bg-slate-950/60`}
    >
      {/* Animated label */}
      <label
        className={`absolute left-4 pointer-events-none font-[Sora] transition-all duration-200
                    ${isUp
                      ? "top-2 text-[10px] tracking-widest uppercase text-sky-400/80"
                      : "top-1/2 -translate-y-1/2 text-sm text-slate-600"
                    }`}
      >
        {label}
      </label>

      {textarea ? (
        <textarea
          name={name}
          rows={4}
          required={required}
          placeholder={label}
          className={baseClass}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={label}
          className={baseClass}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
        />
      )}

      {/* Bottom focus line */}
      <div className={`absolute bottom-0 left-0 h-[2px] bg-sky-400/60 rounded-full
                       transition-all duration-400 ease-out
                       ${focused ? "w-full opacity-100" : "w-0 opacity-0"}`} />
    </div>
  );
}

/* ── Social link chip ─────────────────────── */
function SocialChip({ href, icon, label, sub }) {
  const ref = useRef(null);
  return (
    <a
      ref={ref}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group flex items-center gap-3 px-4 py-3 rounded-2xl
                 border border-white/8 bg-slate-900/50
                 hover:border-sky-400/35 hover:bg-sky-400/5
                 transition-all duration-300 hover:-translate-y-0.5
                 hover:shadow-[0_8px_24px_rgba(56,189,248,0.10)]"
    >
      <span className="w-9 h-9 rounded-xl bg-slate-800 border border-white/8
                       flex items-center justify-center text-base text-slate-400
                       group-hover:text-sky-400 group-hover:border-sky-400/30
                       transition-all duration-200 flex-shrink-0">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-300 group-hover:text-sky-300
                      transition-colors duration-200">
          {label}
        </p>
        <p className="text-[10px] text-slate-600 truncate">{sub}</p>
      </div>
      <span className="ml-auto text-slate-700 group-hover:text-sky-400
                       group-hover:translate-x-0.5 transition-all duration-200 text-sm">
        →
      </span>
    </a>
  );
}

/* ── Main component ───────────────────────── */
export default function Contact() {
  const [status, setStatus] = useState("idle");
  const pageRef  = useRef(null);
  const leftRef  = useRef(null);
  const rightRef = useRef(null);
  const formRef  = useRef(null);

  /* ── GSAP entrance ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Left side: stagger children */
      gsap.fromTo(Array.from(leftRef.current.children),
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: leftRef.current, start: "top 85%" },
        }
      );
      /* Right card slides in */
      gsap.fromTo(rightRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: rightRef.current, start: "top 85%" },
          delay: 0.15,
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  /* ── Success animation ── */
  useEffect(() => {
    if (status !== "success" || !rightRef.current) return;
    gsap.fromTo(".success-content > *",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.1, delay: 0.1 }
    );
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await emailjs.sendForm(
        "service_rr7l3uu",
        "template_gr0mitk",
        e.target,
        "G3_E2yuKRSEURv8gu"
      );
      setStatus("success");
      e.target.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section ref={pageRef} className="relative min-h-screen px-[8%] py-28 overflow-hidden">

      {/* ── Background ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] rounded-full
                        bg-sky-400/[0.025] blur-[140px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full
                        bg-indigo-500/[0.025] blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(rgba(148,163,184,0.8) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">

        {/* ══════════════════
            LEFT PANEL
        ══════════════════ */}
        <div ref={leftRef} className="flex flex-col gap-8">

          {/* Tag */}
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] text-sky-400 font-semibold">
              Contact
            </span>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-100 font-[Sora]
                           leading-[1.05] tracking-tight">
              Let's build<br />
              something<br />
              <span className="text-sky-400">together.</span>
            </h1>
          </div>

          {/* Body */}
          <p className="text-base text-slate-500 leading-relaxed max-w-sm">
            Open to frontend developer roles, freelance projects, or just a good
            conversation about React. Reach out and I'll reply within 24 hours.
          </p>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-white/6" />
            <span className="text-[10px] uppercase tracking-widest text-slate-700">
              reach me at
            </span>
            <div className="flex-1 h-px bg-white/6" />
          </div>

          {/* Social chips */}
          <div className="flex flex-col gap-3">
            <SocialChip
              href="mailto:madhurisonawane@example.com"
              icon={<HiMail />}
              label="Email"
              sub="madhurisonawane@example.com"
            />
            <SocialChip
              href="https://github.com/Madhuri-Sonawane"
              icon={<SiGithub />}
              label="GitHub"
              sub="github.com/Madhuri-Sonawane"
            />
            <SocialChip
              href="https://linkedin.com/in/madhuri-sonawane"
              icon={<SiLinkedin />}
              label="LinkedIn"
              sub="linkedin.com/in/madhuri-sonawane"
            />
          </div>

          {/* Availability badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl
                          border border-emerald-400/20 bg-emerald-400/5 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 font-medium">
              Available for new opportunities
            </span>
          </div>
        </div>

        {/* ══════════════════
            RIGHT: FORM CARD
        ══════════════════ */}
        <div
          ref={rightRef}
          className="rounded-3xl border border-white/8 bg-slate-900/50
                     backdrop-blur-sm overflow-hidden"
          style={{ opacity: 0 }}
        >
          {/* Card header strip */}
          <div className="flex items-center gap-2 px-6 py-4 border-b border-white/6
                          bg-slate-950/50">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            <span className="ml-3 text-[11px] text-slate-600 font-mono">new_message.txt</span>
          </div>

          {/* Card body */}
          <div className="p-7">

            {status === "success" ? (
              /* ── Success state ── */
              <div className="success-content flex flex-col items-center gap-5 py-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-sky-400/10 border border-sky-400/30
                                flex items-center justify-center" style={{ opacity: 0 }}>
                  <svg className="w-7 h-7 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div style={{ opacity: 0 }}>
                  <p className="text-lg font-bold text-slate-100 font-[Sora]">Message sent!</p>
                  <p className="text-sm text-slate-500 mt-1">I'll get back to you within 24 hours.</p>
                </div>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm text-sky-400 hover:text-sky-300 transition-colors
                             flex items-center gap-1.5 mt-2"
                  style={{ opacity: 0 }}
                >
                  Send another message →
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">

                <div className="flex items-baseline justify-between mb-1">
                  <h4 className="text-base font-bold text-slate-200 font-[Sora]">
                    Send a message
                  </h4>
                  <span className="text-[10px] text-slate-700 font-mono">to: madhuri</span>
                </div>

                {/* Two-col row */}
                <div className="grid grid-cols-2 gap-3">
                  <FloatField label="Your name" name="name" required />
                  <FloatField label="Phone (optional)" name="phone" />
                </div>

                <FloatField label="Email address" name="email" type="email" required />
                <FloatField label="Subject" name="subject" required />
                <FloatField label="Your message" name="message" textarea required />

                {status === "error" && (
                  <p className="text-xs text-red-400 px-1">
                    Failed to send. Please try again or email directly.
                  </p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="relative mt-2 w-full rounded-2xl py-3.5 text-sm font-bold
                             font-[Sora] text-slate-900 bg-sky-400 overflow-hidden
                             transition-all duration-300
                             hover:-translate-y-0.5
                             hover:shadow-[0_12px_30px_rgba(56,189,248,0.40)]
                             disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0
                             active:scale-[0.98]"
                >
                  {/* Shimmer effect */}
                  <span className="absolute inset-0 -skew-x-12 translate-x-[-120%]
                                   bg-gradient-to-r from-transparent via-white/20 to-transparent
                                   hover:translate-x-[120%] transition-transform duration-700" />
                  <span className="relative">
                    {status === "loading" ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10"
                                  stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending…
                      </span>
                    ) : "Send Message →"}
                  </span>
                </button>

                <p className="text-center text-[10px] text-slate-700 mt-1">
                  No spam. Just a conversation.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}