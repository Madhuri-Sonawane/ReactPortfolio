import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const NAV_LINKS = [
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef(null);
  const headerRef = useRef(null);

  /* ── Scroll shrink effect ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── GSAP navbar entrance on mount ── */
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  /* ── Mobile menu slide animation ── */
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (open) {
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [open]);

  /* ── Close menu on route change ── */
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 z-50 w-full px-4 sm:px-[8%] flex items-center justify-between
        transition-all duration-300
        ${scrolled
          ? "h-14 bg-slate-950/90 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]"
          : "h-16 bg-transparent"
        }`}
    >
      {/* Logo */}
      <Link
        to="/"
        className="text-lg font-semibold text-slate-100 hover:text-sky-400 transition-colors duration-200 font-[Sora]"
      >
        Madhuri<span className="text-sky-400">.</span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400">
        {NAV_LINKS.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`relative py-1 transition-colors duration-200 hover:text-sky-400
              after:absolute after:bottom-0 after:left-0 after:h-px after:bg-sky-400
              after:transition-all after:duration-300
              ${isActive(to)
                ? "text-sky-400 after:w-full"
                : "after:w-0 hover:after:w-full"
              }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-1 text-slate-300 hover:text-sky-400 transition-colors"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span
          className={`block h-0.5 w-5 bg-current transition-all duration-300 origin-center
            ${open ? "rotate-45 translate-y-2" : ""}`}
        />
        <span
          className={`block h-0.5 w-5 bg-current transition-all duration-300
            ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`block h-0.5 w-5 bg-current transition-all duration-300 origin-center
            ${open ? "-rotate-45 -translate-y-2" : ""}`}
        />
      </button>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="absolute top-full left-0 w-full overflow-hidden md:hidden
                   bg-slate-950/95 backdrop-blur-xl border-b border-white/5"
        style={{ height: 0, opacity: 0 }}
      >
        <nav className="flex flex-col px-6 py-5 gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`py-3 text-sm border-b border-white/5 transition-colors duration-200
                ${isActive(to) ? "text-sky-400" : "text-slate-400 hover:text-sky-400"}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}