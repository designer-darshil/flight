import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040817, 0.032);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(2.8, 1.4, 8.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // LIGHTING SYSTEM
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.6);
    sunLight.position.set(6, 8, 6);
    scene.add(sunLight);

    const cyanGlowLight = new THREE.DirectionalLight(0x06b6d4, 3.0);
    cyanGlowLight.position.set(-5, -2, -4);
    scene.add(cyanGlowLight);

    const orangeAccentLight = new THREE.PointLight(0xff6b35, 2.5, 12);
    orangeAccentLight.position.set(1.5, -0.5, 0);
    scene.add(orangeAccentLight);

    // ELEGANT COMMERCIAL PASSENGER JET
    const aircraftGroup = new THREE.Group();

    const fuselageMaterial = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      metalness: 0.88,
      roughness: 0.22,
      envMapIntensity: 1.4,
    });

    const navyTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0x090e1f,
      metalness: 0.9,
      roughness: 0.35,
    });

    const orangeTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6b35,
      metalness: 0.5,
      roughness: 0.3,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0a1628,
      metalness: 0.95,
      roughness: 0.08,
      transmission: 0.7,
      transparent: true,
      opacity: 0.92,
    });

    // Fuselage
    const fuselageGeom = new THREE.CylinderGeometry(0.36, 0.36, 4.4, 32);
    fuselageGeom.rotateX(Math.PI / 2);
    const fuselage = new THREE.Mesh(fuselageGeom, fuselageMaterial);
    aircraftGroup.add(fuselage);

    // Nose Cone
    const noseGeom = new THREE.ConeGeometry(0.36, 1.3, 32);
    noseGeom.rotateX(-Math.PI / 2);
    const nose = new THREE.Mesh(noseGeom, fuselageMaterial);
    nose.position.z = 2.85;
    aircraftGroup.add(nose);

    // Tail Taper
    const tailConeGeom = new THREE.ConeGeometry(0.36, 1.8, 32);
    tailConeGeom.rotateX(Math.PI / 2);
    const tailCone = new THREE.Mesh(tailConeGeom, fuselageMaterial);
    tailCone.position.z = -3.1;
    aircraftGroup.add(tailCone);

    // Cockpit Visor
    const cockpitGeom = new THREE.CylinderGeometry(0.34, 0.36, 0.65, 16, 1, false, 0, Math.PI);
    cockpitGeom.rotateX(Math.PI / 2);
    cockpitGeom.rotateZ(Math.PI);
    const cockpit = new THREE.Mesh(cockpitGeom, glassMaterial);
    cockpit.position.set(0, 0.13, 2.3);
    aircraftGroup.add(cockpit);

    // Aeriva Orange Speedline Trim
    const stripeGeom = new THREE.CylinderGeometry(0.365, 0.365, 2.8, 32, 1, true, 0, Math.PI * 0.4);
    stripeGeom.rotateX(Math.PI / 2);
    stripeGeom.rotateZ(Math.PI * 0.8);
    const stripe = new THREE.Mesh(stripeGeom, orangeTrimMaterial);
    stripe.position.set(0, 0, 0.3);
    aircraftGroup.add(stripe);

    // Swept Wings
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.lineTo(3.4, -1.4);
    wingShape.lineTo(3.3, -1.9);
    wingShape.lineTo(0, -0.65);
    wingShape.closePath();

    const wingGeom = new THREE.ExtrudeGeometry(wingShape, { depth: 0.05, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02 });
    wingGeom.rotateX(-Math.PI / 2);

    const rightWing = new THREE.Mesh(wingGeom, fuselageMaterial);
    rightWing.position.set(0.18, -0.05, 0.5);
    rightWing.rotation.z = 0.06; // slight upward dihedral
    aircraftGroup.add(rightWing);

    const leftWing = rightWing.clone();
    leftWing.scale.x = -1;
    leftWing.position.set(-0.18, -0.05, 0.5);
    aircraftGroup.add(leftWing);

    // Winglets
    const wingletGeom = new THREE.BoxGeometry(0.04, 0.5, 0.28);
    const rightWinglet = new THREE.Mesh(wingletGeom, orangeTrimMaterial);
    rightWinglet.position.set(3.45, 0.2, -1.2);
    aircraftGroup.add(rightWinglet);

    const leftWinglet = rightWinglet.clone();
    leftWinglet.position.set(-3.45, 0.2, -1.2);
    aircraftGroup.add(leftWinglet);

    // Wingtip Beacons
    const greenBeaconGeom = new THREE.SphereGeometry(0.045, 8, 8);
    const greenBeaconMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const rightBeacon = new THREE.Mesh(greenBeaconGeom, greenBeaconMat);
    rightBeacon.position.set(3.48, 0.42, -1.2);
    aircraftGroup.add(rightBeacon);

    const redBeaconGeom = new THREE.SphereGeometry(0.045, 8, 8);
    const redBeaconMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const leftBeacon = new THREE.Mesh(redBeaconGeom, redBeaconMat);
    leftBeacon.position.set(-3.48, 0.42, -1.2);
    aircraftGroup.add(leftBeacon);

    // Jet Turbofan Engines
    const engineNacelleGeom = new THREE.CylinderGeometry(0.23, 0.21, 1.2, 24);
    engineNacelleGeom.rotateX(Math.PI / 2);

    const rightEngine = new THREE.Mesh(engineNacelleGeom, fuselageMaterial);
    rightEngine.position.set(1.3, -0.34, 0.3);
    aircraftGroup.add(rightEngine);

    const leftEngine = rightEngine.clone();
    leftEngine.position.set(-1.3, -0.34, 0.3);
    aircraftGroup.add(leftEngine);

    // Engine Afterburner Glow
    const engineGlowGeom = new THREE.CircleGeometry(0.18, 16);
    const engineGlowMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, side: THREE.DoubleSide });
    const rightGlow = new THREE.Mesh(engineGlowGeom, engineGlowMat);
    rightGlow.position.set(1.3, -0.34, -0.31);
    aircraftGroup.add(rightGlow);

    const leftGlow = rightGlow.clone();
    leftGlow.position.set(-1.3, -0.34, -0.31);
    aircraftGroup.add(leftGlow);

    // Tail Fin (Vertical Stabilizer)
    const tailFinShape = new THREE.Shape();
    tailFinShape.moveTo(0, 0);
    tailFinShape.lineTo(0, 1.45);
    tailFinShape.lineTo(-0.75, 1.4);
    tailFinShape.lineTo(-1.3, 0);
    tailFinShape.closePath();

    const tailFinGeom = new THREE.ExtrudeGeometry(tailFinShape, { depth: 0.05, bevelEnabled: false });
    tailFinGeom.rotateY(Math.PI / 2);
    const verticalTail = new THREE.Mesh(tailFinGeom, navyTrimMaterial);
    verticalTail.position.set(0.025, 0.36, -2.8);
    aircraftGroup.add(verticalTail);

    // Horizontal Rear Elevators
    const hStabGeom = new THREE.BoxGeometry(2.1, 0.03, 0.52);
    const horizontalTail = new THREE.Mesh(hStabGeom, fuselageMaterial);
    horizontalTail.position.set(0, 0.34, -3.4);
    aircraftGroup.add(horizontalTail);

    // Position aircraft in 3D scene (positioned center-right behind device)
    aircraftGroup.scale.set(0.8, 0.8, 0.8);
    aircraftGroup.position.set(2.4, 0.6, -1.8);
    aircraftGroup.rotation.set(0.1, -0.55, 0.12);
    scene.add(aircraftGroup);

    // Curved Glowing Flight Path Ribbon
    const flightCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-9, -2.8, -14),
      new THREE.Vector3(-4.5, -0.9, -7),
      new THREE.Vector3(-0.8, -0.3, -3),
      new THREE.Vector3(2.4, 0.5, -1.8),
      new THREE.Vector3(4.8, 1.2, 1.5),
      new THREE.Vector3(8.5, 2.2, 5.5),
    ]);

    const tubeGeom = new THREE.TubeGeometry(flightCurve, 64, 0.035, 8, false);
    const tubeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
    });
    const flightTrail = new THREE.Mesh(tubeGeom, tubeMat);
    scene.add(flightTrail);

    // Atmospheric Cloud Particles
    const particleCount = prefersReducedMotion ? 30 : 120;
    const particlesGeom = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 26;
      posArray[i + 1] = (Math.random() - 0.5) * 14;
      posArray[i + 2] = (Math.random() - 0.5) * 22;
    }

    particlesGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.07,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particlesGeom, particlesMat);
    scene.add(particleSystem);

    // MOUSE PARALLAX
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x * 0.35;
      targetMouseY = y * 0.25;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // SCROLL LISTENER
    let scrollOffset = 0;
    const handleScroll = () => {
      scrollOffset = window.scrollY * 0.0008;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;

      if (width < 1024) {
        camera.position.set(1.4, 1.2, 9.8);
        aircraftGroup.position.set(1.0, 0.4, -2.5);
        aircraftGroup.scale.set(0.65, 0.65, 0.65);
      } else {
        camera.position.set(2.8, 1.4, 8.5);
        aircraftGroup.position.set(2.4, 0.6, -1.8);
        aircraftGroup.scale.set(0.8, 0.8, 0.8);
      }
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      if (!prefersReducedMotion) {
        const floatY = Math.sin(elapsedTime * 1.2) * 0.07;
        const rollZ = Math.cos(elapsedTime * 1.0) * 0.015;

        aircraftGroup.position.y = (window.innerWidth < 1024 ? 0.4 : 0.6) + floatY + mouseY * 0.3;
        aircraftGroup.position.x = (window.innerWidth < 1024 ? 1.0 : 2.4) + mouseX * 0.45;
        
        aircraftGroup.rotation.z = 0.12 + rollZ - mouseX * 0.2;
        aircraftGroup.rotation.x = 0.1 - mouseY * 0.15;
        aircraftGroup.rotation.y = -0.55 + mouseX * 0.25;

        camera.position.y = 1.4 + mouseY * 0.2 - scrollOffset;

        particleSystem.rotation.y = elapsedTime * 0.02;

        const blink = Math.sin(elapsedTime * 6) > 0.6;
        rightBeacon.visible = blink;
        leftBeacon.visible = blink;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-auto" />
      <div className="absolute inset-0 bg-gradient-to-t from-aerova-navy via-transparent to-aerova-navy/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-aerova-navy via-aerova-navy/60 to-transparent pointer-events-none md:w-3/5" />
    </div>
  );
};
