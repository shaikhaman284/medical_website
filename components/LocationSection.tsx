'use client';

import { motion } from 'framer-motion';

const mapUrl = 'https://maps.app.goo.gl/LgB6baRdoR8yvgVW8';

export default function LocationSection() {
  return (
    <section className="px-6 py-24 md:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glow"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-teal/80">Visit us</p>
          <h2 className="mt-4 text-4xl font-semibold text-white">Find Life Pharmacy</h2>
          <div className="mt-8 space-y-6 text-white/75">
            <p className="flex items-start gap-3 text-base"><span className="mt-1 text-teal">📍</span> Life Pharmacy, Attached with Dr. Naimmuddin's Shifa Clinic</p>
            <p className="text-base">Near Samaj Temple, Rahul Nagar, Bicchu Tekadi, Camp, Amravati – 444602</p>
          </div>
          <a href={mapUrl} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center justify-center rounded-full border border-teal/20 bg-teal/10 px-8 py-4 text-sm font-semibold text-teal transition hover:bg-teal/15">
            Open in Google Maps
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden rounded-[2rem] border border-teal/20 shadow-glow"
        >
          <iframe
            src="https://maps.app.goo.gl/LgB6baRdoR8yvgVW8"
            title="Life Pharmacy Location"
            className="h-[520px] w-full rounded-[2rem] border border-white/10"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
