'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

function buildStatus(now: Date) {
  const offset = 5.5 * 60;
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ist = new Date(utc + offset * 60000);
  const hour = ist.getHours();
  const minute = ist.getMinutes();
  const isMorning = hour > 11 && hour < 15;
  const isEvening = hour > 19 && (hour < 23 || (hour === 23 && minute <= 30));
  const open = (hour === 11 && minute >= 0) || isMorning || isEvening;

  if (open) {
    return { open: true, message: '🟢 Open Now' };
  }

  let next = '11:00 AM';
  if (hour >= 11 && hour < 19) next = '7:00 PM';
  if (hour >= 23) next = '11:00 AM Tomorrow';

  return { open: false, message: `🔴 Currently Closed – Opens at ${next}` };
}

export default function HoursSection() {
  const [status, setStatus] = useState<{ open: boolean; message: string }>(buildStatus(new Date()));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStatus(buildStatus(new Date()));
    }, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const badgeClass = useMemo(
    () => (status.open ? 'bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20' : 'bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/20'),
    [status.open]
  );

  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-8 lg:px-12">
      <div className="absolute inset-0 left-1/2 h-full w-1/2 bg-[radial-gradient(circle_at_top_left,_rgba(0,212,180,0.18),_transparent_24%)]" />
      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="glass-card overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glow"
        >
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-teal/10 text-teal shadow-glow text-3xl">
                ⏰
              </span>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-teal/80">Opening Hours</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">Serving the community on time.</h2>
              </div>
            </div>
            <div className={`inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold ${badgeClass}`}>
              <span className={`mr-3 h-3 w-3 rounded-full ${status.open ? 'bg-emerald-400' : 'bg-rose-400'} animate-pulse-status`} />
              {status.message}
            </div>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-navy-mid/70 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-teal/90">☀️ Morning</p>
              <p className="mt-3 text-2xl font-semibold text-white">11:00 AM – 3:00 PM</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-navy-mid/70 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-teal/90">🌙 Evening</p>
              <p className="mt-3 text-2xl font-semibold text-white">7:00 PM – 11:30 PM</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
