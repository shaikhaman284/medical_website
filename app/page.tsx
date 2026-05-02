'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Navbar from '../components/Navbar';
import HeroScene from '../components/HeroScene';
import AboutSection from '../components/AboutSection';
import StatsSection from '../components/StatsSection';
import FeaturesSection from '../components/FeaturesSection';
import TeamSection from '../components/TeamSection';
import GallerySection from '../components/GallerySection';
import TestimonialsSection from '../components/TestimonialsSection';
import HoursSection from '../components/HoursSection';
import LocationSection from '../components/LocationSection';
import Footer from '../components/Footer';

export default function HomePage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll('.section-reveal');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { autoAlpha: 0, y: 40 },
        {
          duration: 1,
          autoAlpha: 1,
          y: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-navy text-white">
      <Navbar />
      <section id="home" className="relative min-h-screen overflow-hidden">
        <HeroScene />
      </section>
      <section id="about" className="section-reveal">
        <AboutSection />
      </section>
      <section id="services" className="section-reveal">
        <StatsSection />
      </section>
      <section id="features" className="section-reveal">
        <FeaturesSection />
      </section>
      <section id="team" className="section-reveal">
        <TeamSection />
      </section>
      <section id="gallery" className="section-reveal">
        <GallerySection />
      </section>
      <section id="testimonials" className="section-reveal">
        <TestimonialsSection />
      </section>
      <section id="hours" className="section-reveal">
        <HoursSection />
      </section>
      <section id="location" className="section-reveal">
        <LocationSection />
      </section>
      <Footer />
    </main>
  );
}
