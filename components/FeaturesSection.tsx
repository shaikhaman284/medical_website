'use client';

import { useMemo, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Clinic-Attached',
    description: 'All Shifa Clinic prescriptions fulfilled in-house for fast, reliable care.',
    icon: '🏥'
  },
  {
    title: 'On-Demand Medicines',
    description: 'Special medicines arranged within 24 hours when you need them most.',
    icon: '💊'
  },
  {
    title: 'Expert Guidance',
    description: 'Professional pharmacist always on duty to support your prescription needs.',
    icon: '🧑‍⚕️'
  },
  {
    title: 'Easy Location',
    description: 'Rahul Nagar, Bicchu Tekadi, Camp Amravati — easy to find and convenient.',
    icon: '📍'
  }
];

function FeatureCard({ feature }: { feature: (typeof features)[number] }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const style = useMemo(
    () => ({
      transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
    }),
    [tilt]
  );

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x: y, y: x });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="card-tilt glass-card relative overflow-hidden rounded-[2rem] border border-white/10 px-8 py-10 text-white shadow-glow"
      style={style}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,212,180,0.14),_transparent_30%)]" />
      <div className="relative space-y-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-teal/10 text-3xl shadow-glow">{feature.icon}</div>
        <div>
          <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
          <p className="mt-3 text-sm leading-7 text-white/70">{feature.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="px-6 py-24 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-teal/80">Why choose us</p>
          <h2 className="mt-4 text-4xl font-semibold text-white">Why Choose Life Pharmacy?</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
