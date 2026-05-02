'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'Hours', href: '#hours' },
  { label: 'Location', href: '#location' }
];

function getStatusInfo() {
  const now = new Date();
  const istOffset = 5.5 * 60; // minutes
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const istTime = new Date(utc + istOffset * 60000);
  const hour = istTime.getHours();
  const minute = istTime.getMinutes();
  const inMorning = hour >= 11 && (hour < 15 || (hour === 15 && minute === 0));
  const inEvening = hour >= 19 && (hour < 23 || (hour === 23 && minute <= 30));
  const isOpen = inMorning || inEvening;

  let message = 'Open Now';
  if (!isOpen) {
    if (hour < 11 || (hour === 11 && minute === 0)) message = 'Currently Closed — Opens at 11:00 AM';
    else if (hour < 19) message = 'Currently Closed — Opens at 7:00 PM';
    else message = 'Currently Closed — Opens at 11:00 AM Tomorrow';
  }

  return { isOpen, message };
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navFrost, setNavFrost] = useState(false);
  const [status, setStatus] = useState(getStatusInfo());
  const overlayRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    const handleScroll = () => setNavFrost(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setStatus(getStatusInfo()), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!overlayRef.current) return;
    if (menuOpen) {
      gsap.fromTo(
        overlayRef.current,
        { y: '-100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.55, ease: 'power3.out' }
      );
      gsap.fromTo(
        linkRefs.current,
        { y: -24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.07, delay: 0.08 }
      );
    } else {
      gsap.to(overlayRef.current, {
        y: '-100%', opacity: 0, duration: 0.4, ease: 'power3.in'
      });
    }
  }, [menuOpen]);

  const statusBadge = useMemo(
    () => (
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/90 shadow-glow">
        <span className={`inline-flex h-2.5 w-2.5 rounded-full ${status.isOpen ? 'bg-emerald-400' : 'bg-rose-500'} animate-pulse-status`} />
        <span>{status.isOpen ? '🟢 Open' : '🔴 Closed'}</span>
      </div>
    ),
    [status]
  );

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 transition-all duration-500 ${navFrost ? 'nav-frost' : 'bg-transparent'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <a href="#home" className="flex items-center gap-3 text-lg font-semibold tracking-[0.24em] text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal/10 text-teal shadow-glow text-2xl leading-none">
            +
          </span>
          <span>Life Pharmacy</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm uppercase tracking-[0.25em] text-white/70 transition hover:text-teal">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {statusBadge}
          <a href="https://maps.app.goo.gl/LgB6baRdoR8yvgVW8" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-white/5 px-4 py-2 text-sm text-teal transition hover:border-teal hover:bg-teal/10">
            <span className="text-lg">📍</span> Directions
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <span className="relative inline-block h-5 w-5">
              <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 rotate-45 bg-white" />
              <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 -rotate-45 bg-white" />
            </span>
          ) : (
            <span className="inline-flex h-5 w-5 flex-col justify-between">
              <span className="block h-0.5 w-full rounded-full bg-white" />
              <span className="block h-0.5 w-full rounded-full bg-white" />
              <span className="block h-0.5 w-full rounded-full bg-white" />
            </span>
          )}
        </button>
      </div>

      <div ref={overlayRef} className="absolute inset-x-0 top-0 z-40 hidden h-screen bg-navy/95 px-6 py-8 backdrop-blur-lg md:hidden" style={{ display: menuOpen ? 'block' : 'none' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-lg font-semibold tracking-[0.22em] text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal/10 text-teal shadow-glow text-2xl leading-none">
              +
            </span>
            <span>Life Pharmacy</span>
          </div>
          <button type="button" onClick={() => setMenuOpen(false)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white">
            <span className="relative inline-block h-5 w-5">
              <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 rotate-45 bg-white" />
              <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 -rotate-45 bg-white" />
            </span>
          </button>
        </div>

        <div className="mt-12 space-y-6">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              ref={(el) => (linkRefs.current[index] = el)}
              onClick={() => setMenuOpen(false)}
              className="block text-3xl uppercase tracking-[0.3em] text-white/90"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">{status.message}</div>
          <a href="https://maps.app.goo.gl/LgB6baRdoR8yvgVW8" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-3xl border border-teal/20 bg-teal/10 px-5 py-3 text-sm font-medium text-teal transition hover:border-teal hover:bg-teal/20">
            Get Directions
          </a>
        </div>
      </div>
    </header>
  );
}
