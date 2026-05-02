'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Ramesh Patil',
    stars: '⭐⭐⭐⭐⭐',
    quote: 'Medicines are always available. Staff is very helpful and the pharmacist guided me really well with my prescription.'
  },
  {
    name: 'Sunita Sharma',
    stars: '⭐⭐⭐⭐⭐',
    quote: 'I needed a special medicine urgently. They arranged it within the same day. Very reliable pharmacy.'
  },
  {
    name: 'Abdul Rauf',
    stars: '⭐⭐⭐⭐⭐',
    quote: 'Being attached to the clinic makes everything so convenient. Highly recommend Life Pharmacy.'
  }
];

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (!scrollRef.current) return;
      const width = scrollRef.current.clientWidth;
      if (scrollRef.current.scrollLeft + width >= scrollRef.current.scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: width, behavior: 'smooth' });
      }
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="px-6 py-24 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-teal/80">Customer love</p>
          <h2 className="mt-4 text-4xl font-semibold text-white">What Our Customers Say</h2>
        </div>
        <div ref={scrollRef} className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth pb-4 md:grid md:grid-cols-3 md:overflow-visible">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, delay: index * 0.08 }}
              className="glass-card min-w-[280px] flex-1 rounded-[2rem] border border-white/10 p-8 text-white shadow-glow md:min-w-0"
            >
              <span className="text-6xl leading-none text-gold">“</span>
              <p className="mt-4 text-base leading-8 text-white/75">{item.quote}</p>
              <div className="mt-8 space-y-1">
                <p className="text-sm uppercase tracking-[0.25em] text-teal/80">{item.name}</p>
                <p className="text-lg font-semibold text-white">{item.stars}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
