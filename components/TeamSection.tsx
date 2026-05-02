'use client';

import { motion } from 'framer-motion';

const team = [
  { name: 'Shaikh Aman', role: 'Owner', message: 'Always here to help you 💊' },
  { name: 'Mohammad Ziyauddin', role: 'Manager & Pharmacist', message: 'Guidance with care and expertise.' },
  { name: 'Shaikh Umer', role: 'Salesman & Cashier', message: 'Friendly support for every visit.' }
];

function initials(name: string) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

export default function TeamSection() {
  return (
    <section className="px-6 py-24 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-teal/80">Our experts</p>
          <h2 className="mt-4 text-4xl font-semibold text-white">Meet Our Team</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="team-card relative rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow"
            >
              <div className="team-card-inner relative h-full rounded-[2rem] transition-transform duration-500">
                <div className="team-card-face relative flex h-full flex-col items-center gap-6 rounded-[2rem] p-6 text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-teal to-cyan text-3xl font-semibold text-navy shadow-glow">
                    {initials(member.name)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                    <p className="mt-3 text-sm uppercase tracking-[0.24em] text-teal/80">{member.role}</p>
                  </div>
                  <span className="inline-flex h-1.5 w-16 rounded-full bg-gold" />
                  <p className="text-sm leading-7 text-white/70">Hover to learn more about their dedication to service.</p>
                </div>
                <div className="team-card-face team-card-back flex h-full flex-col items-center justify-center rounded-[2rem] bg-gradient-to-br from-navy-mid to-navy p-6 text-center text-white">
                  <p className="text-lg font-semibold">{member.message}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
