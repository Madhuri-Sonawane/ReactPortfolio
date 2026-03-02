import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

/* ─────────────────────────────────────────────
   GlobalBackground — renders a subtle 3D scene
   across ALL pages. Less intense than the hero
   version — drifting atoms, node particles,
   and star field only.

   Use in your root layout / App.jsx:
   <GlobalBackground />
   <Router>...</Router>
───────────────────────────────────────────── */
export default function GlobalBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = window.innerWidth;
    const H = window.innerHeight;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const world = new THREE.Group();
    scene.add(world);

    /* ── React atoms ── */
    function makeAtom(cx, cy, cz, scale, color) {
      const g = new THREE.Group();
      g.position.set(cx, cy, cz);

      g.add(new THREE.Mesh(
        new THREE.SphereGeometry(0.1 * scale, 10, 10),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.85 })
      ));

      [0, 60, 120].forEach((deg) => {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.5 * scale, 0.015 * scale, 8, 60),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.25 })
        );
        ring.rotation.x = Math.PI / 2;
        ring.rotation.y = (deg * Math.PI) / 180;
        g.add(ring);
      });

      g.scale.setScalar(0);
      gsap.to(g.scale, { x: 1, y: 1, z: 1, duration: 1.4, ease: "back.out(1.4)", delay: Math.random() * 2 });
      gsap.to(g.rotation, { y: Math.PI * 2, duration: 20 + Math.random() * 8, ease: "none", repeat: -1 });
      gsap.to(g.rotation, { x: Math.PI * 2, duration: 30 + Math.random() * 10, ease: "none", repeat: -1 });
      gsap.to(g.position, { y: cy + (Math.random() * 1.4 - 0.7), duration: 5 + Math.random() * 3, ease: "sine.inOut", repeat: -1, yoyo: true });

      world.add(g);
    }

    makeAtom(-14,  5,  -5, 1.5, 0x38bdf8);
    makeAtom( 14, -4,  -8, 1.1, 0x818cf8);
    makeAtom( -6, -8, -12, 2.0, 0x38bdf8);
    makeAtom(  8,  8,  -6, 0.85, 0x38bdf8);
    makeAtom(-18, -6, -18, 2.5, 0x0ea5e9);
    makeAtom( 18,  5, -18, 1.8, 0x818cf8);

    /* ── Component tree nodes ── */
    const nodes = [
      [0, 7, -14, 0.20],
      [-6, 3, -14, 0.14], [6, 3, -14, 0.14],
      [-9, -1, -14, 0.10], [-3, -1, -14, 0.10],
      [3, -1, -14, 0.10], [9, -1, -14, 0.10],
      [-11, -5, -14, 0.08], [-7, -5, -14, 0.08],
      [1, -5, -14, 0.08], [7, -5, -14, 0.08],
    ];
    const edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[3,7],[3,8],[5,9],[6,10]];

    const nodeMeshes = nodes.map(([x, y, z, r]) => {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(r, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0 })
      );
      m.position.set(x, y, z);
      world.add(m);
      gsap.to(m.material, { opacity: 0.45, duration: 0.8, delay: 1 + Math.random() });
      gsap.to(m.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 2 + Math.random(), ease: "sine.inOut", repeat: -1, yoyo: true, delay: Math.random() * 2 });
      return m;
    });

    const lineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0 });
    edges.forEach(([a, b]) => {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...nodes[a]),
        new THREE.Vector3(...nodes[b]),
      ]);
      const l = new THREE.Line(geo, lineMat.clone());
      world.add(l);
      gsap.to(l.material, { opacity: 0.12, duration: 0.8, delay: 1.5 + Math.random() });
    });

    /* ── Wireframe icosahedrons ── */
    [[-16, 4, -20, 1.8], [16, -4, -20, 1.4], [0, -12, -22, 2.2]].forEach(([x, y, z, s]) => {
      const m = new THREE.Mesh(
        new THREE.IcosahedronGeometry(s, 0),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.05, wireframe: true })
      );
      m.position.set(x, y, z);
      world.add(m);
      gsap.to(m.rotation, { x: Math.PI * 2, y: Math.PI * 2, duration: 24 + Math.random() * 8, ease: "none", repeat: -1 });
      gsap.to(m.position, { y: y + 1.5, duration: 8 + Math.random() * 4, ease: "sine.inOut", repeat: -1, yoyo: true });
    });

    /* ── Floating chips ── */
    [[-10,3,-10],[10,7,-12],[6,-5,-8],[-5,-3,-6],[12,-7,-15],[-8,8,-14],[0,9,-9]].forEach(([x, y, z], i) => {
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(i % 2 ? 1.2 : 0.8, 0.25, 0.04),
        new THREE.MeshBasicMaterial({ color: i % 2 ? 0x38bdf8 : 0x818cf8, transparent: true, opacity: 0 })
      );
      m.position.set(x, y, z);
      m.rotation.z = (Math.random() - 0.5) * 0.3;
      world.add(m);
      gsap.to(m.material, { opacity: 0.07 + Math.random() * 0.06, duration: 1, delay: 1 + Math.random() * 2 });
      gsap.to(m.position, { y: y + (Math.random() * 1.5 - 0.75), duration: 5 + Math.random() * 3, ease: "sine.inOut", repeat: -1, yoyo: true, delay: Math.random() * 2 });
    });

    /* ── Star field ── */
    const starPos = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      starPos[i*3]   = (Math.random() - 0.5) * 80;
      starPos[i*3+1] = (Math.random() - 0.5) * 50;
      starPos[i*3+2] = -20 - Math.random() * 40;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    world.add(new THREE.Points(starGeo,
      new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.05, transparent: true, opacity: 0.3 })
    ));

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
      world.rotation.y += (mouse.x * 0.03  - world.rotation.y) * 0.02;
      world.rotation.x += (-mouse.y * 0.02 - world.rotation.x) * 0.02;
      world.rotation.y += 0.00025;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
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