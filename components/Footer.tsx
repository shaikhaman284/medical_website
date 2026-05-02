'use client';

import { motion } from 'framer-motion';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'Hours', href: '#hours' },
  { label: 'Location', href: '#location' }
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-teal/10 bg-navy px-6 py-16 text-white md:px-8 lg:px-12">
      <div className="absolute inset-0 opacity-30">
        <div className="pointer-events-none absolute left-10 top-10 h-24 w-24 rounded-full bg-teal/10 blur-3xl animate-footer-float" />
        <div className="pointer-events-none absolute right-10 bottom-10 h-32 w-32 rounded-full bg-gold/10 blur-3xl animate-footer-float" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="flex items-center gap-3 text-lg font-semibold tracking-[0.22em] text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal/10 text-teal">LP</span>
            Life Pharmacy
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
            Premium neighborhood pharmacy in Amravati with trusted care, fast prescriptions, and expert guidance.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
          <p className="text-sm uppercase tracking-[0.35em] text-teal/80">Quick links</p>
          <div className="mt-6 flex flex-wrap gap-4">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-white/70 transition hover:text-teal">
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
          <p className="text-sm uppercase tracking-[0.35em] text-teal/80">Opening hours</p>
          <div className="mt-6 space-y-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-sm text-white/75">
            <p>Morning: 11:00 AM – 3:00 PM</p>
            <p>Evening: 7:00 PM – 11:30 PM</p>
          </div>
        </motion.div>
      </div>
      <div className="relative mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/50">
        © 2025 Life Pharmacy, Amravati. All rights reserved.
      </div>
    </footer>
  );
}
