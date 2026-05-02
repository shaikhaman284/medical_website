'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';

const mapUrl = 'https://maps.app.goo.gl/LgB6baRdoR8yvgVW8';

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrame: number;
    let cleanup = false;
    let mouseX = 0;
    let mouseY = 0;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, canvas.clientWidth / canvas.clientHeight, 0.1, 2000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const ambient = new THREE.AmbientLight(0x88f2ea, 0.85);
    scene.add(ambient);

    const pointLight = new THREE.PointLight(0x00d4b4, 1.2, 100);
    pointLight.position.set(12, 10, 10);
    scene.add(pointLight);

    const group = new THREE.Group();
    scene.add(group);

    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x00d4b4,
      emissive: 0x006f68,
      metalness: 0.5,
      roughness: 0.35
    });

    const pointsPositions: Array<THREE.Vector3> = [];
    const nodeGeometry = new THREE.SphereGeometry(0.35, 24, 24);

    for (let index = 0; index < 12; index += 1) {
      const angle = (index / 12) * Math.PI * 2;
      const radius = 6;
      const x = Math.cos(angle) * radius * (0.4 + Math.sin(index * 1.4) * 0.1);
      const y = (index - 6) * 0.75;
      const z = Math.sin(angle) * radius * (0.45 + Math.cos(index * 1.2) * 0.12);
      pointsPositions.push(new THREE.Vector3(x, y, z));
      const sphere = new THREE.Mesh(nodeGeometry, sphereMaterial);
      sphere.position.set(x, y, z);
      group.add(sphere);
    }

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00d4b4, transparent: true, opacity: 0.45 });
    const lineGeometry = new THREE.BufferGeometry();
    const lineCoordinates: number[] = [];
    pointsPositions.forEach((position, index) => {
      const next = pointsPositions[(index + 1) % pointsPositions.length];
      lineCoordinates.push(position.x, position.y, position.z, next.x, next.y, next.z);
    });
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(lineCoordinates, 3));
    const circleLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(circleLines);

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 220;
    const positions = new Float32Array(particleCount * 3);
    const velocities = [] as number[];

    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = Math.random() * 18 - 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
      velocities.push(0.002 + Math.random() * 0.004);
    }

    particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00d4b4,
      size: 0.12,
      transparent: true,
      opacity: 0.8
    });
    const particleCloud = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleCloud);

    const handleResize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const handleMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 60;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 40;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMove);
    }
    window.addEventListener('resize', handleResize);

    const animate = () => {
      if (cleanup) return;
      animationFrame = requestAnimationFrame(animate);
      group.rotation.y += 0.0025;
      group.rotation.x += (mouseY * 0.001 - group.rotation.x) * 0.05;
      group.rotation.z += (mouseX * 0.0006 - group.rotation.z) * 0.05;

      const positionsArray = particleCloud.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i += 1) {
        const idx = i * 3;
        positionsArray[idx + 1] += velocities[i];
        if (positionsArray[idx + 1] > 12) {
          positionsArray[idx + 1] = -12;
          positionsArray[idx] = (Math.random() - 0.5) * 26;
          positionsArray[idx + 2] = (Math.random() - 0.5) * 18;
        }
      }
      particleCloud.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.hero-animate'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.1 }
      );
    }

    return () => {
      cleanup = true;
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, [isMobile]);

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden px-6 pb-24 pt-28 md:px-8 lg:pt-32">
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="floating-overlay" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center">
        <div className="w-full max-w-3xl text-center md:text-left">
          <p className="hero-animate mb-4 inline-flex items-center justify-center gap-2 rounded-full border border-teal/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-teal md:justify-start">
            Premium Pharmacy • Camp Amravati
          </p>
          <h1 className="hero-animate mt-6 text-5xl font-semibold leading-tight text-white md:text-6xl lg:text-7xl" style={{ fontFamily: 'var(--font-display)' }}>
            Life Pharmacy
          </h1>
          <p className="hero-animate mt-6 max-w-xl text-lg leading-8 text-teal/80 md:text-xl">
            Your Trusted Neighborhood Pharmacy
          </p>
          <p className="hero-animate mt-6 max-w-xl text-sm leading-7 text-white/70 md:text-base">
            Attached to Shifa Clinic • Camp Amravati • Since 2019
          </p>
          <div className="hero-animate mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start">
            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="glass-card inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-white shadow-glow hover:border-teal/40 hover:bg-teal/10"
            >
              Get Directions
            </a>
            <a
              href="#about"
              className="glass-card inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-teal shadow-glow hover:border-teal/40 hover:bg-teal/10"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-10 z-10 flex justify-center">
        <div className="scroll-indicator inline-flex h-14 w-14 items-end justify-center rounded-full border border-teal/30 bg-white/5 text-teal shadow-glow">
          <span className="mb-2 block h-3 w-3 rounded-full bg-teal" />
        </div>
      </div>
    </div>
  );
}
