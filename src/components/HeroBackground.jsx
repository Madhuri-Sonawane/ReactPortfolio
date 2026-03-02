import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

/* ─────────────────────────────────────────────
   HeroBackground — full-page 3D scene with:
   • Floating React atom structures
   • Drifting code symbol particles
   • Connected node network (like a component tree)
   • Gentle parallax on mouse move
───────────────────────────────────────────── */
export default function HeroBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = window.innerWidth;
    const H = window.innerHeight;

    /* ── Scene setup ── */
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    /* ── Materials palette ── */
    const skyMat    = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.55, wireframe: false });
    const indigoMat = new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.35 });
    const wireMat   = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.18, wireframe: true });
    const dimMat    = new THREE.MeshBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.12 });

    const lineMat  = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.12 });
    const lineMat2 = new THREE.LineBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.08 });

    /* ── Group for parallax ── */
    const world = new THREE.Group();
    scene.add(world);

    /* ══════════════════════════════
       1. REACT ATOM STRUCTURES
    ══════════════════════════════ */
    function makeAtom(cx, cy, cz, scale = 1, color = 0x38bdf8) {
      const g = new THREE.Group();
      g.position.set(cx, cy, cz);

      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5 });
      const coreMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 });

      /* Core sphere */
      g.add(new THREE.Mesh(new THREE.SphereGeometry(0.12 * scale, 12, 12), coreMat));

      /* 3 orbit rings */
      [0, 60, 120].forEach((deg, i) => {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.55 * scale, 0.018 * scale, 8, 60),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.3 + i * 0.05 })
        );
        ring.rotation.x = Math.PI / 2;
        ring.rotation.y = (deg * Math.PI) / 180;
        g.add(ring);
      });

      /* Orbiting electron dot */
      const electron = new THREE.Mesh(
        new THREE.SphereGeometry(0.055 * scale, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 })
      );
      electron.position.set(0.55 * scale, 0, 0);
      g.add(electron);

      world.add(g);

      /* Continuous slow rotation */
      gsap.to(g.rotation, {
        y: Math.PI * 2,
        duration: 18 + Math.random() * 10,
        ease: "none",
        repeat: -1,
      });
      gsap.to(g.rotation, {
        x: Math.PI * 2,
        duration: 28 + Math.random() * 12,
        ease: "none",
        repeat: -1,
      });

      /* Float up/down */
      gsap.to(g.position, {
        y: cy + (Math.random() * 1.5 - 0.75),
        duration: 4 + Math.random() * 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      /* Fade-in entrance */
      g.scale.setScalar(0);
      gsap.to(g.scale, {
        x: 1, y: 1, z: 1,
        duration: 1.2,
        ease: "back.out(1.4)",
        delay: Math.random() * 1.5,
      });

      return g;
    }

    makeAtom(-14,  5,  -5, 1.6, 0x38bdf8);
    makeAtom( 14, -3,  -8, 1.2, 0x818cf8);
    makeAtom( -6, -8, -12, 2.2, 0x38bdf8);
    makeAtom(  8,  8,  -6, 0.9, 0x38bdf8);
    makeAtom(-18, -6, -18, 2.8, 0x0ea5e9);
    makeAtom( 18,  6, -18, 2.0, 0x818cf8);

    /* ══════════════════════════════
       2. FLOATING CODE TAG PARTICLES
    ══════════════════════════════ */
    /* Use small flattened box "chips" as abstract code symbols */
    const tagPositions = [
      [-10,  3, -10], [ 10,  7, -12], [  6, -5,  -8],
      [ -5, -3,  -6], [ 12, -7, -15], [ -8,  8, -14],
      [  0,  9,  -9], [ -2, -9, -11], [ 15,  2,  -9],
      [-12, -2, -16], [  3,  5, -13], [ -7,  6,  -7],
    ];

    tagPositions.forEach(([x, y, z], i) => {
      const isWide = i % 3 === 0;
      const chip = new THREE.Mesh(
        new THREE.BoxGeometry(isWide ? 1.4 : 0.9, 0.28, 0.04),
        new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? 0x38bdf8 : 0x818cf8,
          transparent: true,
          opacity: 0.08 + Math.random() * 0.07,
        })
      );
      chip.position.set(x, y, z);
      chip.rotation.z = (Math.random() - 0.5) * 0.4;
      world.add(chip);

      /* Slow drift */
      gsap.to(chip.position, {
        y: y + (Math.random() * 2 - 1),
        x: x + (Math.random() * 1.5 - 0.75),
        duration: 6 + Math.random() * 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 3,
      });
      gsap.to(chip.material, {
        opacity: 0.18 + Math.random() * 0.08,
        duration: 3 + Math.random() * 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2,
      });

      /* Entrance */
      chip.material.opacity = 0;
      gsap.to(chip.material, {
        opacity: 0.1 + Math.random() * 0.07,
        duration: 1,
        delay: 0.5 + Math.random() * 2,
      });
    });

    /* ══════════════════════════════
       3. COMPONENT TREE NODE NETWORK
    ══════════════════════════════ */
    const nodes = [
      /* Root App */
      { pos: [0, 7, -14],   size: 0.22 },
      /* Level 1 */
      { pos: [-6, 3, -14],  size: 0.16 },
      { pos: [ 6, 3, -14],  size: 0.16 },
      /* Level 2 */
      { pos: [-9, -1, -14], size: 0.12 },
      { pos: [-3, -1, -14], size: 0.12 },
      { pos: [ 3, -1, -14], size: 0.12 },
      { pos: [ 9, -1, -14], size: 0.12 },
      /* Level 3 */
      { pos: [-11, -5, -14], size: 0.09 },
      { pos: [ -7, -5, -14], size: 0.09 },
      { pos: [  1, -5, -14], size: 0.09 },
      { pos: [  7, -5, -14], size: 0.09 },
      { pos: [ 11, -5, -14], size: 0.09 },
    ];

    const edges = [
      [0,1],[0,2],
      [1,3],[1,4],
      [2,5],[2,6],
      [3,7],[3,8],
      [5,9],
      [6,10],[6,11],
    ];

    const nodeMeshes = nodes.map(({ pos: [x, y, z], size }) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(size, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0 })
      );
      mesh.position.set(x, y, z);
      world.add(mesh);

      gsap.to(mesh.material, {
        opacity: 0.55,
        duration: 0.6,
        delay: 0.8 + Math.random() * 1.2,
      });

      /* Pulse */
      gsap.to(mesh.scale, {
        x: 1.25, y: 1.25, z: 1.25,
        duration: 2 + Math.random() * 1.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2,
      });

      return mesh;
    });

    edges.forEach(([a, b]) => {
      const pa = new THREE.Vector3(...nodes[a].pos);
      const pb = new THREE.Vector3(...nodes[b].pos);
      const geo = new THREE.BufferGeometry().setFromPoints([pa, pb]);
      const line = new THREE.Line(geo, lineMat.clone());
      line.material.opacity = 0;
      world.add(line);
      gsap.to(line.material, {
        opacity: 0.14,
        duration: 0.8,
        delay: 1.2 + Math.random() * 0.8,
      });
    });

    /* ══════════════════════════════
       4. GEOMETRIC ACCENT SHAPES
    ══════════════════════════════ */
    /* Icosahedron wireframes scattered around */
    [
      [-16,  4, -20, 1.8],
      [ 16, -4, -20, 1.4],
      [  0, -12, -22, 2.2],
    ].forEach(([x, y, z, s]) => {
      const mesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(s, 0),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.06, wireframe: true })
      );
      mesh.position.set(x, y, z);
      world.add(mesh);

      gsap.to(mesh.rotation, {
        x: Math.PI * 2, y: Math.PI * 2,
        duration: 22 + Math.random() * 10,
        ease: "none",
        repeat: -1,
      });
      gsap.to(mesh.position, {
        y: y + 1.5,
        duration: 7 + Math.random() * 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    /* Small floating tetrahedrons */
    for (let i = 0; i < 8; i++) {
      const x = (Math.random() - 0.5) * 36;
      const y = (Math.random() - 0.5) * 18;
      const z = -8 - Math.random() * 14;
      const mesh = new THREE.Mesh(
        new THREE.TetrahedronGeometry(0.15 + Math.random() * 0.25, 0),
        new THREE.MeshBasicMaterial({
          color: i % 2 ? 0x38bdf8 : 0x818cf8,
          transparent: true,
          opacity: 0.12 + Math.random() * 0.1,
          wireframe: true,
        })
      );
      mesh.position.set(x, y, z);
      world.add(mesh);

      gsap.to(mesh.rotation, {
        x: Math.PI * 2, z: Math.PI,
        duration: 10 + Math.random() * 8,
        ease: "none",
        repeat: -1,
      });
      gsap.to(mesh.position, {
        y: y + (Math.random() * 2 - 1),
        duration: 5 + Math.random() * 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2,
      });
    }

    /* ══════════════════════════════
       5. STAR FIELD (distant dots)
    ══════════════════════════════ */
    const starGeo = new THREE.BufferGeometry();
    const starCount = 180;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3]     = (Math.random() - 0.5) * 80;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      starPos[i * 3 + 2] = -20 - Math.random() * 40;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.06, transparent: true, opacity: 0.35 })
    );
    world.add(stars);

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));

    /* ── Mouse parallax ── */
    const mouse = { x: 0, y: 0 };
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    /* ── Resize ── */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    /* ── Render loop ── */
    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);

      /* Smooth parallax */
      world.rotation.y += (mouse.x * 0.04 - world.rotation.y) * 0.025;
      world.rotation.x += (-mouse.y * 0.025 - world.rotation.x) * 0.025;

      /* Slow auto-drift */
      world.rotation.y += 0.0003;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}