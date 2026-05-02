'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-8 lg:px-12">
      <div className="bg-shift absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_1fr]">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="glass-card relative overflow-hidden rounded-[2rem] border border-white/10 p-12 text-white shadow-glow"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,212,180,0.16),_transparent_34%)]" />
          <div className="relative">
            <p className="text-5xl font-semibold leading-tight text-gold" style={{ fontFamily: 'var(--font-display)' }}>
              “Medicine is not just a product — it is a promise of care.”
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="space-y-8 rounded-[2rem] border border-white/10 bg-white/5 p-10 text-white shadow-glow backdrop-blur-xl"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-teal/80">About Life Pharmacy</p>
            <h2 className="mt-4 text-4xl font-semibold text-white">Community care with precision, comfort, and trust.</h2>
          </div>
          <p className="text-base leading-8 text-white/75 md:text-lg">
            Life Pharmacy has been serving the community of Camp Amravati for over 5 years, operating right alongside Dr. Naimmuddin's Shifa Clinic.
          </p>
          <p className="text-base leading-8 text-white/70 md:text-lg">
            Every medicine prescribed at the clinic is available right here — because your health cannot wait. We blend premium care and expert guidance in every interaction.
          </p>
          <div className="rounded-3xl border border-teal/20 bg-navy-mid/80 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-teal/90">Location</p>
            <p className="mt-3 text-lg text-white/80">Attached with Dr. Naimmuddin's Shifa Clinic, Near Samaj Temple, Rahul Nagar, Bicchu Tekadi, Camp, Amravati – 444602</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
