import { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { HiMail } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const pageRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  /* ── GSAP entrance ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: leftRef.current, start: "top 85%" } }
      );
      gsap.fromTo(rightRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: rightRef.current, start: "top 85%" } }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

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
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section ref={pageRef} className="min-h-screen px-[8%] py-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* ── LEFT ── */}
        <div ref={leftRef} style={{ opacity: 0 }}>
          <h3 className="text-sm uppercase tracking-widest text-sky-400">Contact</h3>
          <h2 className="mt-4 text-4xl font-semibold text-slate-100 leading-tight">
            Let's build something <br />
            <span className="text-gradient">meaningful together</span>
          </h2>

          <p className="mt-6 text-base text-slate-400 max-w-md">
            I'm open to frontend developer opportunities. Drop a message and
            I'll get back to you within 24 hours.
          </p>

          {/* Social links */}
          <div className="mt-10 flex flex-col gap-4">
            <a
              href="mailto:madhurisonawane@example.com"
              className="flex items-center gap-3 text-slate-400 hover:text-sky-400 transition-colors group w-fit"
            >
              <span className="w-10 h-10 rounded-xl border border-white/10 bg-slate-900/60
                               flex items-center justify-center text-lg
                               group-hover:border-sky-400/50 transition-colors">
                <HiMail />
              </span>
              <span className="text-sm">madhurisonawane@example.com</span>
            </a>

            <a
              href="https://github.com/Madhuri-Sonawane"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-slate-400 hover:text-sky-400 transition-colors group w-fit"
            >
              <span className="w-10 h-10 rounded-xl border border-white/10 bg-slate-900/60
                               flex items-center justify-center text-lg
                               group-hover:border-sky-400/50 transition-colors">
                <SiGithub />
              </span>
              <span className="text-sm">github.com/Madhuri-Sonawane</span>
            </a>

            <a
              href="https://linkedin.com/in/madhuri-sonawane"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-slate-400 hover:text-sky-400 transition-colors group w-fit"
            >
              <span className="w-10 h-10 rounded-xl border border-white/10 bg-slate-900/60
                               flex items-center justify-center text-lg
                               group-hover:border-sky-400/50 transition-colors">
                <SiLinkedin />
              </span>
              <span className="text-sm">linkedin.com/in/madhuri-sonawane</span>
            </a>
          </div>
        </div>

        {/* ── RIGHT: Form ── */}
        <div
          ref={rightRef}
          className="rounded-2xl bg-slate-900/50 border border-white/10 p-8"
          style={{ opacity: 0 }}
        >
          <h4 className="text-lg font-semibold text-slate-100">Send me a message</h4>

          {/* Success state */}
          {status === "success" ? (
            <div className="mt-8 flex flex-col items-center gap-4 py-10 text-center">
              <div className="w-14 h-14 rounded-full bg-sky-400/15 border border-sky-400/40
                              flex items-center justify-center text-2xl text-sky-400">
                ✓
              </div>
              <p className="text-slate-200 font-medium">Message sent!</p>
              <p className="text-sm text-slate-400">I'll get back to you soon.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 text-sm text-sky-400 hover:underline"
              >
                Send another →
              </button>
            </div>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="contact-input"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone number (optional)"
                  className="contact-input"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="contact-input"
                required
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="contact-input"
                required
              />

              <textarea
                rows="4"
                name="message"
                placeholder="Your message"
                className="contact-input resize-none"
                required
              />

              {status === "error" && (
                <p className="text-sm text-red-400">
                  Failed to send. Please try again or email directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 w-full rounded-full bg-sky-400 px-8 py-3 text-sm font-semibold
                           text-slate-900 transition-all duration-200
                           hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(56,189,248,0.4)]
                           disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending…
                  </span>
                ) : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}