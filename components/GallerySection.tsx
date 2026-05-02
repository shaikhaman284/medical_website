'use client';

import { motion } from 'framer-motion';

const images = [
  { label: 'Store Front', src: 'https://picsum.photos/600/800?signature=storefront' },
  { label: 'Medicine Shelf', src: 'https://picsum.photos/600/800?signature=medicineshelf' },
  { label: 'Consultation Counter', src: 'https://picsum.photos/600/800?signature=counter' },
  { label: 'Prescription Area', src: 'https://picsum.photos/600/800?signature=prescription' },
  { label: 'Night View', src: 'https://picsum.photos/600/800?signature=nightview' },
  { label: 'Interior', src: 'https://picsum.photos/600/800?signature=interior' }
];

export default function GallerySection() {
  return (
    <section className="px-6 py-24 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-teal/80">Space of care</p>
          <h2 className="mt-4 text-4xl font-semibold text-white">Our Pharmacy</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {/* TODO: Replace placeholder images with real pharmacy photos */}
          {images.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: index * 0.06 }}
              className="group relative overflow-hidden rounded-[2rem]"
            >
              <img src={item.src} alt={item.label} className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-6 left-6 text-white opacity-0 transition duration-500 group-hover:opacity-100">
                <p className="text-sm uppercase tracking-[0.24em] text-teal/90">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
