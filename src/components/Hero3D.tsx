import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const Hero3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // SCENE & TRANSPARENT RENDERER
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);

    // WARM AMBIENT LIGHTING
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffedd5, 2.0);
    sunLight.position.set(5, 8, 4);
    scene.add(sunLight);

    // DEL ➔ DXB ➔ LHR 3D CURVED FLIGHT PATH
    // Visualized as an elegant, warm champagne / terracotta arc
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.2, -0.6, 0.2),  // Origin near DEL
      new THREE.Vector3(-1.4, 0.4, 0.6),   // Ascent
      new THREE.Vector3(0.0, 0.85, 0.4),   // Midway / DXB hub
      new THREE.Vector3(1.6, 0.5, 0.1),    // Europe descent
      new THREE.Vector3(3.0, -0.4, -0.2),  // Arrival near LHR
    ]);

    // ROUTE TUBE / THIN ARC
    const tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.008, 8, false);
    const tubeMaterial = new THREE.MeshBasicMaterial({
      color: 0xc96b45, // Terracotta
      transparent: true,
      opacity: 0.65,
    });
    const routeLine = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(routeLine);

    // WAYPOINT MARKERS (DEL, DXB, LHR)
    const waypoints = [
      { pos: new THREE.Vector3(-3.2, -0.6, 0.2), label: 'DEL' },
      { pos: new THREE.Vector3(0.0, 0.85, 0.4), label: 'DXB' },
      { pos: new THREE.Vector3(3.0, -0.4, -0.2), label: 'LHR' },
    ];

    const waypointGroup = new THREE.Group();
    waypoints.forEach(wp => {
      // Outer ring
      const ringGeo = new THREE.RingGeometry(0.05, 0.065, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xb79b69, // Champagne
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(wp.pos);
      ring.lookAt(camera.position);
      waypointGroup.add(ring);

      // Core dot
      const dotGeo = new THREE.CircleGeometry(0.025, 16);
      const dotMat = new THREE.MeshBasicMaterial({
        color: 0xc96b45,
        side: THREE.DoubleSide,
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(wp.pos);
      dot.lookAt(camera.position);
      waypointGroup.add(dot);
    });
    scene.add(waypointGroup);

    // SMALL ELEGANT AIRCRAFT MODEL (Sleek, minimalist silhouette)
    const planeGroup = new THREE.Group();

    // Fuselage (slender cone/cylinder)
    const fuselageGeo = new THREE.ConeGeometry(0.035, 0.28, 16);
    const fuselageMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.3,
    });
    const fuselage = new THREE.Mesh(fuselageGeo, fuselageMat);
    fuselage.rotation.x = Math.PI / 2;
    planeGroup.add(fuselage);

    // Swept Wings
    const wingGeo = new THREE.BoxGeometry(0.32, 0.005, 0.08);
    const wingMat = new THREE.MeshStandardMaterial({
      color: 0xf5efe6,
      roughness: 0.3,
    });
    const wings = new THREE.Mesh(wingGeo, wingMat);
    wings.position.set(0, 0, -0.02);
    planeGroup.add(wings);

    // Tail Fin (Vertical Stabilizer)
    const tailGeo = new THREE.BoxGeometry(0.005, 0.08, 0.05);
    const tail = new THREE.Mesh(tailGeo, fuselageMat);
    tail.position.set(0, 0.04, -0.11);
    planeGroup.add(tail);

    // Subtle warm contrail particle trail
    const trailCount = 24;
    const trailPositions = new Float32Array(trailCount * 3);
    const trailGeometry = new THREE.BufferGeometry();
    trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
    const trailMaterial = new THREE.PointsMaterial({
      color: 0xfff3e0,
      size: 0.04,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const trail = new THREE.Points(trailGeometry, trailMaterial);
    scene.add(trail);

    scene.add(planeGroup);

    // MOUSE PARALLAX
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 0.4;
      targetY = (e.clientY / innerHeight - 0.5) * 0.3;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // RESIZE HANDLER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Motion preference check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ANIMATION LOOP & INTERSECTION OBSERVER FOR PERFORMANCE
    let animationId: number;
    let progress = 0;
    let isVisible = true;
    const historyPositions: THREE.Vector3[] = [];

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!isVisible) return;

      // Smooth mouse parallax (disabled if reduced motion)
      if (!prefersReducedMotion) {
        currentX += (targetX - currentX) * 0.04;
        currentY += (targetY - currentY) * 0.04;
      } else {
        currentX = 0;
        currentY = 0;
      }
      camera.position.x = currentX;
      camera.position.y = 1.2 - currentY;
      camera.lookAt(0, 0.1, 0);

      // Advance aircraft along route (stationary at midpoint if reduced motion)
      if (!prefersReducedMotion) {
        progress = (progress + 0.0012) % 1;
      } else {
        progress = 0.5;
      }
      const point = curve.getPointAt(progress);
      const tangent = curve.getTangentAt(progress);

      planeGroup.position.copy(point);
      planeGroup.lookAt(point.clone().add(tangent));
      if (!prefersReducedMotion) {
        planeGroup.rotation.z = Math.sin(progress * Math.PI * 2) * 0.25;
      }

      // Update trail
      historyPositions.unshift(point.clone());
      if (historyPositions.length > trailCount) {
        historyPositions.pop();
      }
      const posAttr = trailGeometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < historyPositions.length; i++) {
        posAttr.setXYZ(i, historyPositions[i].x, historyPositions[i].y, historyPositions[i].z);
      }
      posAttr.needsUpdate = true;

      // Pulse waypoint rings (only if normal motion)
      if (!prefersReducedMotion) {
        waypointGroup.children.forEach((child, idx) => {
          if (child instanceof THREE.Mesh && child.geometry instanceof THREE.RingGeometry) {
            const s = 1 + Math.sin(Date.now() * 0.003 + idx) * 0.08;
            child.scale.set(s, s, 1);
          }
        });
      }

      renderer.render(scene, camera);
    };

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

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
    />
  );
};
