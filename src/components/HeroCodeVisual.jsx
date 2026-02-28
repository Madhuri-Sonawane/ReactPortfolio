import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

const CODE_LINES = [
  "import React from 'react';",
  "",
  "const Developer = () => {",
  "  return (",
  "    <h1>Hello World</h1>",
  "  );",
  "};",
  "",
  "export default Developer;",
];

const SCREENS = ["code", "react", "dev"];

/* ─── helpers ─────────────────────────────── */
function lineColor(line) {
  if (!line || line.trim() === "") return "text-transparent";
  if (line.startsWith("import"))                    return "text-purple-400";
  if (line.startsWith("export") || line.startsWith("const")) return "text-sky-400";
  if (line.includes("return") || line.includes("};")) return "text-sky-300";
  if (line.includes("<h1>"))                        return "text-emerald-400";
  return "text-slate-300";
}

/* ─── Screen 1: code editor ─────────────────── */
function CodeScreen() {
  const [lines, setLines]   = useState([]);
  const [cursor, setCursor] = useState(true);
  const doneRef             = useRef(false);

  useEffect(() => {
    doneRef.current = false;
    let i = 0;
    const interval = setInterval(() => {
      if (i < CODE_LINES.length) {
        setLines((prev) => [...prev, CODE_LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
        doneRef.current = true;
      }
    }, 210);

    const blink = setInterval(() => setCursor((c) => !c), 530);
    return () => { clearInterval(interval); clearInterval(blink); };
  }, []);

  return (
    <div className="w-full h-full bg-[#0a0f1a] rounded-lg p-3 font-mono text-[11px] overflow-hidden">
      {/* Traffic lights */}
      <div className="flex gap-1.5 mb-2.5">
        <div className="w-2 h-2 rounded-full bg-red-500/80" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
        <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
        <span className="ml-2 text-[9px] text-slate-600">app.jsx</span>
      </div>

      <div className="space-y-0.5">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-slate-700 w-3 text-right flex-shrink-0 select-none">{i + 1}</span>
            <span className={lineColor(line)}>{line === "" ? "\u200b" : line}</span>
          </div>
        ))}

        {/* Blinking cursor line */}
        {!doneRef.current && (
          <div className="flex gap-2">
            <span className="text-slate-700 w-3 text-right select-none">{lines.length + 1}</span>
            <span className={`text-slate-300 ${cursor ? "opacity-100" : "opacity-0"}`}>▋</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Screen 2: React logo ───────────────────── */
function ReactScreen() {
  const logoRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(logoRef.current,
        { opacity: 0, scale: 0.5, rotate: -180 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.5)" }
      );
      gsap.to(logoRef.current, { rotate: 360,  duration: 12,  ease: "linear",    repeat: -1, delay: 0.8 });
      gsap.to(logoRef.current, { y: -10,       duration: 2.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 0.8 });
    }
    if (textRef.current) {
      gsap.fromTo(Array.from(textRef.current.children),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out", delay: 0.5 }
      );
    }
  }, []);

  return (
    <div className="w-full h-full bg-[#0a0f1a] rounded-lg flex flex-col items-center
                    justify-center gap-3 overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-28 h-28 rounded-full bg-sky-400/8 blur-2xl" />
      </div>

      <div className="relative flex items-center justify-center">
        <div className="absolute w-24 h-24 rounded-full border border-sky-400/15
                        animate-[spin_8s_linear_infinite]" />
        <div className="absolute w-16 h-16 rounded-full border border-sky-400/10
                        animate-[spin_5s_linear_infinite_reverse]" />
        <svg ref={logoRef} className="w-12 h-12 relative z-10" viewBox="0 0 100 100"
             style={{ opacity: 0 }}>
          <circle cx="50" cy="50" r="10" fill="#38bdf8" />
          <ellipse cx="50" cy="50" rx="44" ry="17" fill="none" stroke="#38bdf8" strokeWidth="3" />
          <ellipse cx="50" cy="50" rx="44" ry="17" fill="none" stroke="#38bdf8" strokeWidth="3"
                   transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="44" ry="17" fill="none" stroke="#38bdf8" strokeWidth="3"
                   transform="rotate(120 50 50)" />
        </svg>
      </div>

      <div ref={textRef} className="text-center space-y-0.5">
        <p className="text-sky-400 text-lg font-bold font-[Sora]"    style={{ opacity: 0 }}>React Developer</p>
        <p className="text-slate-500 text-[11px]" style={{ opacity: 0 }}>Building UI with React</p>
      </div>
    </div>
  );
}

/* ─── Screen 3: skill bars ───────────────────── */
function DevScreen() {
  const barsRef = useRef([]);

  const skills = [
    { label: "React.js",     level: 90, color: "#38bdf8" },
    { label: "JavaScript",   level: 85, color: "#facc15" },
    { label: "Tailwind CSS", level: 88, color: "#22d3ee" },
    { label: "GSAP",         level: 75, color: "#4ade80" },
    { label: "REST APIs",    level: 80, color: "#818cf8" },
  ];

  useEffect(() => {
    /* Animate bar widths with GSAP — avoids Tailwind purge issue */
    barsRef.current.forEach((bar, i) => {
      if (!bar) return;
      gsap.fromTo(bar,
        { width: "0%" },
        { width: `${skills[i].level}%`, duration: 0.9, ease: "power3.out", delay: 0.2 + i * 0.08 }
      );
    });
  }, []);

  return (
    <div className="w-full h-full bg-[#0a0f1a] rounded-lg p-3 overflow-hidden">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[9px] text-emerald-400 uppercase tracking-widest font-semibold">
          Frontend Engineer
        </span>
      </div>
      <div className="text-[10px] text-slate-500 mb-3 font-mono">
        <span className="text-sky-400">madhuri</span>@portfolio ~/skills
      </div>

      <div className="space-y-2">
        {skills.map(({ label, level, color }, i) => (
          <div key={label}>
            <div className="flex justify-between text-[9px] mb-1">
              <span className="text-slate-300 font-mono">{label}</span>
              <span className="text-slate-600">{level}%</span>
            </div>
            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
              <div
                ref={(el) => (barsRef.current[i] = el)}
                className="h-full rounded-full"
                style={{ width: 0, backgroundColor: color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main 3D Monitor ────────────────────────── */
export default function HeroCodeVisual() {
  const mountRef    = useRef(null);
  const monitorRef  = useRef(null);
  const rendererRef = useRef(null);
  const rafRef      = useRef(null);
  const mouseRef    = useRef({ x: 0, y: 0 });

  const [screenIdx,     setScreenIdx]     = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const screenRef = useRef(null);

  /* ─── Three.js setup ─────────────────────── */
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = container.offsetWidth  || 520;
    const H = container.offsetHeight || 420;

    /* Scene + camera */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0.1, 5);

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    /* Monitor group */
    const monitor = new THREE.Group();
    scene.add(monitor);
    monitorRef.current = monitor;

    const stdMat = (color, metalness = 0.7) =>
      new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness });

    /* Bezel */
    monitor.add(Object.assign(
      new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.4, 0.12), stdMat(0x0f172a)),
    ));

    /* Screen recess */
    const screenMesh = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 2.0, 0.02),
      new THREE.MeshStandardMaterial({ color: 0x020817, roughness: 0.1, metalness: 0, emissive: 0x0a1628, emissiveIntensity: 0.5 })
    );
    screenMesh.position.z = 0.07;
    monitor.add(screenMesh);

    /* Screen glow */
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.03 });
    const glowPlane = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.0), glowMat);
    glowPlane.position.z = 0.08;
    monitor.add(glowPlane);

    /* Stand neck */
    const neck = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.65, 0.12), stdMat(0x0f172a, 0.8));
    neck.position.y = -1.52;
    monitor.add(neck);

    /* Stand base */
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 0.5), stdMat(0x0f172a, 0.8));
    base.position.y = -1.84;
    monitor.add(base);

    /* Corner dots */
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const dotGeo = new THREE.SphereGeometry(0.04, 8, 8);
    [[-1.55, 0.9], [1.55, 0.9], [-1.55, -0.9], [1.55, -0.9]].forEach(([x, y]) => {
      const d = new THREE.Mesh(dotGeo, dotMat);
      d.position.set(x, y, 0.07);
      monitor.add(d);
    });

    /* Lights */
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const key = new THREE.DirectionalLight(0x38bdf8, 1.2);
    key.position.set(3, 4, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x818cf8, 0.4);
    fill.position.set(-3, -2, 3);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 0.3);
    rim.position.set(0, -3, -2);
    scene.add(rim);

    /* Float animation */
    gsap.to(monitor.position, { y: 0.15, duration: 2.8, ease: "sine.inOut", repeat: -1, yoyo: true });

    /* Entrance */
    monitor.rotation.y = -0.6;
    gsap.to(monitor.rotation, { y: 0, duration: 1.2, ease: "power3.out", delay: 0.3 });

    /* Mouse parallax */
    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width  - 0.5) * 2,
        y: ((e.clientY - rect.top)  / rect.height - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMove);

    /* Render loop */
    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      if (monitorRef.current) {
        monitorRef.current.rotation.y +=
          (mouseRef.current.x * 0.18 - monitorRef.current.rotation.y) * 0.04;
        monitorRef.current.rotation.x +=
          (-mouseRef.current.y * 0.10 - monitorRef.current.rotation.x) * 0.04;
      }
      glowMat.opacity = 0.02 + Math.sin(Date.now() * 0.002) * 0.014;
      renderer.render(scene, camera);
    };
    tick();

    /* Resize */
    const onResize = () => {
      if (!container) return;
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    /* Cleanup */
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      /* Kill all GSAP tweens on this group */
      gsap.killTweensOf(monitor.position);
      gsap.killTweensOf(monitor.rotation);
    };
  }, []);

  /* ─── Screen rotation timer ──────────────── */
  useEffect(() => {
    const id = setInterval(() => {
      const monitor = monitorRef.current;
      if (!monitor) return;

      setTransitioning(true);
      gsap.to(monitor.rotation, {
        y: monitor.rotation.y + Math.PI,
        duration: 0.85,
        ease: "power2.inOut",
        onComplete: () => {
          setScreenIdx((p) => (p + 1) % SCREENS.length);
          setTransitioning(false);
        },
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  /* ─── Screen content fade in ─────────────── */
  useEffect(() => {
    if (!screenRef.current || transitioning) return;
    gsap.fromTo(screenRef.current,
      { opacity: 0, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
    );
  }, [screenIdx, transitioning]);

  return (
    <div className="relative w-full h-[420px] sm:h-[460px]">

      {/* Three.js canvas */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* HTML screen overlay */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%", left: "50%",
          transform: "translate(-50%, -54%)",
          width: "54%",
          maxWidth: 295,
          height: "41%",
          maxHeight: 195,
        }}
      >
        <div
          ref={screenRef}
          className={`w-full h-full rounded-md overflow-hidden
                      transition-opacity duration-200
                      ${transitioning ? "opacity-0" : "opacity-100"}`}
        >
          {screenIdx === 0 && <CodeScreen key="code" />}
          {screenIdx === 1 && <ReactScreen key="react" />}
          {screenIdx === 2 && <DevScreen key="dev" />}
        </div>
      </div>

      {/* Indicator dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
        {SCREENS.map((_, i) => (
          <div key={i}
            className={`rounded-full transition-all duration-300
              ${i === screenIdx ? "w-4 h-1.5 bg-sky-400" : "w-1.5 h-1.5 bg-slate-700"}`}
          />
        ))}
      </div>
    </div>
  );
}