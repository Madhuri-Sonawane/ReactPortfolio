import { Link } from "react-router-dom";
import { useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full h-16 px-4 sm:px-[8%] flex items-center justify-between bg-slate-950/60 backdrop-blur-md">
      
      {/* Logo */}
      <Link
        to="/"
        className="text-lg font-semibold text-slate-200 hover:text-sky-400 transition"
      >
        Madhuri
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-8 text-sm text-slate-300">
        <Link to="/about" className="hover:text-sky-400">About</Link>
        <Link to="/experience" className="hover:text-sky-400">Experience</Link>
        <Link to="/projects" className="hover:text-sky-400">Projects</Link>
        <Link to="/contact" className="hover:text-sky-400">Contact</Link>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-slate-200"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-slate-950/95 backdrop-blur-md md:hidden">
          <nav className="flex flex-col px-6 py-6 gap-4 text-slate-300">
            <Link onClick={() => setOpen(false)} to="/about">About</Link>
            <Link onClick={() => setOpen(false)} to="/experience">Experience</Link>
            <Link onClick={() => setOpen(false)} to="/projects">Projects</Link>
            <Link onClick={() => setOpen(false)} to="/contact">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
