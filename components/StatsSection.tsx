'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { title: 'Years of Service', value: 5, icon: '🏥', suffix: '+' },
  { title: 'Happy Customers', value: 500, icon: '👥', suffix: '+' },
  { title: 'Special Orders', value: 1, icon: '💊', suffix: 'Day' },
  { title: 'Licensed Pharmacist', value: 1, icon: '✅', suffix: '' }
];

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const duration = 1100;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const current = Math.floor(progress * target);
      setValue(current);
      if (progress < 1) {
        frame.current = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    frame.current = requestAnimationFrame(step);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [active, target]);

  return value;
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const counts = stats.map((item) => useCountUp(item.value, active));

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 py-24 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-teal/80">Trusted performance</p>
          <h2 className="mt-4 text-4xl font-semibold text-white">Life Pharmacy by the numbers</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass-card relative overflow-hidden rounded-[2rem] border border-white/10 p-8 text-white shadow-glow"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,212,180,0.18),_transparent_26%)] opacity-80" />
              <div className="relative flex h-full flex-col gap-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-teal/20 to-teal/10 text-2xl shadow-glow">
                  <span>{item.icon}</span>
                </div>
                <div>
                  <p className="text-5xl font-semibold text-white">{counts[index]}{item.suffix}</p>
                  <p className="mt-3 text-sm uppercase tracking-[0.2em] text-white/60">{item.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
