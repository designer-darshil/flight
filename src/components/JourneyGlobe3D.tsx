import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const JourneyGlobe3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 540;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 1.0, 4.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // WARM LUXURY LIGHTING
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff1e6, 1.8);
    sunLight.position.set(5, 6, 4);
    scene.add(sunLight);

    const backLight = new THREE.DirectionalLight(0xe2d9cc, 0.8);
    backLight.position.set(-5, -4, -4);
    scene.add(backLight);

    // GLOBE ROOT GROUP
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. BASE EARTH SPHERE (Warm Ivory / Sand)
    const globeRadius = 1.45;
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xefe9de, // Soft Sand
      roughness: 0.85,
      metalness: 0.05,
    });
    const globe = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(globe);

    // 2. SUBTLE CONTINENTS WIREFRAME / GRID
    const wireGeo = new THREE.SphereGeometry(globeRadius + 0.005, 36, 18);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xd8d1c5, // Warm Gray Border
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wire);

    // HELPER: Convert Lat/Lng to 3D Cartesian Vector
    const latLngToVector3 = (lat: number, lng: number, r: number = globeRadius + 0.015) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const z = r * Math.sin(phi) * Math.sin(theta);
      const y = r * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    // GLOBAL CITIES COORDINATES
    const cities = [
      { name: 'Delhi', code: 'DEL', lat: 28.61, lng: 77.20 },
      { name: 'Dubai', code: 'DXB', lat: 25.20, lng: 55.27 },
      { name: 'London', code: 'LHR', lat: 51.50, lng: -0.12 },
      { name: 'Paris', code: 'CDG', lat: 48.85, lng: 2.35 },
      { name: 'Tokyo', code: 'HND', lat: 35.67, lng: 139.65 },
    ];

    // Render city waypoint markers
    cities.forEach(c => {
      const pos = latLngToVector3(c.lat, c.lng);

      // Dot marker
      const dotGeo = new THREE.SphereGeometry(0.024, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xc96b45 }); // Terracotta
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos);
      globeGroup.add(dot);

      // Ring
      const ringGeo = new THREE.RingGeometry(0.035, 0.045, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x596052, // Deep Olive
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos.clone().multiplyScalar(1.002));
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      globeGroup.add(ring);
    });

    // 3. 3D GREAT-CIRCLE ROUTE ARCS
    const routes = [
      { from: cities[0], to: cities[1] }, // Delhi -> Dubai
      { from: cities[1], to: cities[2] }, // Dubai -> London
      { from: cities[2], to: cities[3] }, // London -> Paris
      { from: cities[0], to: cities[4] }, // Delhi -> Tokyo
    ];

    const createCurvedRoute = (p1: THREE.Vector3, p2: THREE.Vector3) => {
      const mid = p1.clone().lerp(p2, 0.5);
      const distance = p1.distanceTo(p2);
      mid.normalize().multiplyScalar(globeRadius + distance * 0.28);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const points = curve.getPoints(60);
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color: 0xc96b45, // Terracotta
        transparent: true,
        opacity: 0.75,
      });
      return { line: new THREE.Line(geom, mat), curve };
    };

    const mainRouteCurves: THREE.QuadraticBezierCurve3[] = [];
    routes.forEach(r => {
      const v1 = latLngToVector3(r.from.lat, r.from.lng);
      const v2 = latLngToVector3(r.to.lat, r.to.lng);
      const { line, curve } = createCurvedRoute(v1, v2);
      globeGroup.add(line);
      mainRouteCurves.push(curve);
    });

    // 4. SMALL SLEEK 3D AIRLINER
    const plane = new THREE.Group();
    const fGeo = new THREE.ConeGeometry(0.03, 0.18, 12);
    const fMat = new THREE.MeshStandardMaterial({ color: 0x171717 });
    const fMesh = new THREE.Mesh(fGeo, fMat);
    fMesh.rotation.x = Math.PI / 2;
    plane.add(fMesh);

    const wGeo = new THREE.BoxGeometry(0.24, 0.004, 0.06);
    const wMat = new THREE.MeshStandardMaterial({ color: 0xc96b45 });
    const wMesh = new THREE.Mesh(wGeo, wMat);
    wMesh.position.set(0, 0, -0.02);
    plane.add(wMesh);

    globeGroup.add(plane);

    // Initial globe orientation highlighting Eurasia & Indian Ocean
    globeGroup.rotation.y = -1.2;
    globeGroup.rotation.x = 0.35;

    // DRAG INTERACTION
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      globeGroup.rotation.y += deltaX * 0.005;
      globeGroup.rotation.x = Math.max(-0.8, Math.min(0.8, globeGroup.rotation.x + deltaY * 0.005));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Motion preference check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ANIMATION LOOP & INTERSECTION OBSERVER FOR PERFORMANCE
    let animId: number;
    let t = 0;
    let isVisible = true;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      // Gentle auto rotation (disabled if reduced motion requested)
      if (!isDragging && !prefersReducedMotion) {
        globeGroup.rotation.y += 0.0012;
      }

      // Aircraft travels along the Delhi -> Dubai -> London route
      if (!prefersReducedMotion) {
        t = (t + 0.002) % 1;
      } else {
        t = 0.25; // Stationary at scenic waypoint
      }
      const activeCurve = t < 0.5 ? mainRouteCurves[0] : mainRouteCurves[1];
      const curveT = (t % 0.5) * 2;
      const pos = activeCurve.getPointAt(curveT);
      const tangent = activeCurve.getTangentAt(curveT);

      plane.position.copy(pos);
      plane.lookAt(pos.clone().add(tangent));

      renderer.render(scene, camera);
    };

    // IntersectionObserver to pause rendering when scrolled out of view
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section className="py-28 px-6 sm:px-12 lg:px-16 bg-cream text-ink border-t border-warm-gray-border/60 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: EDITORIAL COPY */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="flex items-center space-x-3">
              <span className="w-6 h-[1.5px] bg-terracotta" />
              <span className="text-xs font-mono tracking-widest uppercase text-warm-gray font-semibold">
                05 / GLOBAL ROUTE VISUALIZATION
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-ink leading-[0.95]">
              ONE JOURNEY.<br />
              MANY MOMENTS.
            </h2>

            <p className="text-sm sm:text-base text-warm-gray leading-relaxed font-sans max-w-md pt-2">
              From Delhi and Dubai to London and Tokyo, track flight trajectories across an interactive luxury globe built with subtle earth tones and real Great-Circle navigation physics.
            </p>

            {/* Waypoint badges */}
            <div className="space-y-3 pt-4 border-t border-warm-gray-border/60 text-xs font-mono">
              <div className="flex items-center justify-between p-3 bg-white border border-warm-gray-border">
                <span className="font-bold text-ink">DEL ➔ DXB · 3h 40m</span>
                <span className="text-terracotta font-semibold">2,180 KM</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white border border-warm-gray-border">
                <span className="font-bold text-ink">DXB ➔ LHR · 7h 25m</span>
                <span className="text-terracotta font-semibold">5,470 KM</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white border border-warm-gray-border">
                <span className="font-bold text-ink">DEL ➔ HND · 8h 15m</span>
                <span className="text-terracotta font-semibold">5,840 KM</span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-warm-gray">
              * Click and drag globe to rotate view across global meridians.
            </div>
          </div>

          {/* RIGHT: THREE.JS 3D LUXURY GLOBE */}
          <div className="lg:col-span-7 flex items-center justify-center relative">
            <div className="relative w-full max-w-[620px] h-[480px] sm:h-[540px] cursor-grab active:cursor-grabbing">
              
              {/* Soft warm shadow below globe */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-72 h-8 bg-gradient-to-r from-transparent via-black/10 to-transparent rounded-full pointer-events-none" />

              {/* Canvas mount */}
              <div ref={mountRef} className="w-full h-full" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
