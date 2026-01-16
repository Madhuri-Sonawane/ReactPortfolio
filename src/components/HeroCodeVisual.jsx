import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import reactLogo from "../assets/react-logo.svg";

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

export default function HeroCodeVisual() {
  const codeRef = useRef(null);
  const logoRef = useRef(null);
  const lettersRef = useRef([]);
  const hasPlayed = useRef(false); // 🔑 prevents replay

  const [showResult, setShowResult] = useState(false);

  /* CODE TYPING — RUN ONCE */
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

  /* LOGO FLOAT + ROTATE */
  useEffect(() => {
    if (!showResult || !logoRef.current) return;

    const floatTween = gsap.to(logoRef.current, {
      y: -14,
      duration: 2.4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    const rotateTween = gsap.to(logoRef.current, {
      rotate: 360,
      duration: 14,
      ease: "linear",
      repeat: -1,
    });

    return () => {
      floatTween.kill();
      rotateTween.kill();
    };
  }, [showResult]);

  /* TEXT LETTER ANIMATION (RTL) */
  useEffect(() => {
    if (!showResult) return;

    gsap.fromTo(
      lettersRef.current,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        stagger: { each: 0.08, from: "end" },
        ease: "power3.out",
      }
    );
  }, [showResult]);

  return (
    <div className="w-full flex justify-center">
      <div
        className="
          w-[520px]
          h-[320px]
          bg-slate-900/90
          border border-sky-400/30
          rounded-xl
          shadow-[0_0_30px_rgba(0,140,255,0.6)]
          font-mono
          text-sm
          flex
          items-center
          justify-center
        "
      >
        {/* CODE */}
        {!showResult && (
          <pre
            ref={codeRef}
            className="
              bg-slate-950
              rounded-lg
              p-4
              min-h-[200px]
              w-[480px]
              text-sky-400
              whitespace-pre-wrap
            "
          />
        )}

        {/* RESULT */}
        {showResult && (
          <div className="flex flex-col items-center justify-center gap-5">
            <img
              ref={logoRef}
              src={reactLogo}
              alt="React Logo"
              className="w-24"
            />

            <div className="text-4xl font-semibold text-sky-400 text-center">
              {FINAL_TEXT.split("").map((char, i) => (
                <span
                  key={i}
                  ref={(el) => (lettersRef.current[i] = el)}
                  className="inline-block"
                  dangerouslySetInnerHTML={{
                    __html: char === " " ? "&nbsp;" : char,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
