import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGsapAnimations = () => {
  useEffect(() => {
    // Initial cleanup of any existing triggers to prevent duplicates
    ScrollTrigger.getAll().forEach(t => t.kill());

    const ctx = gsap.context(() => {
      // Hero animations
      const heroTl = gsap.timeline({ delay: 0.3 });

      heroTl
        .fromTo('.hero-title span',
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power4.out' }
        )
        .fromTo('.hero-image',
          { scale: 0.8, opacity: 0, rotation: -15 },
          { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: 'power3.out' },
          '-=0.8'
        )
        .fromTo('.hero-text',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo('.hero-reviews',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo('nav',
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.8'
        );

      // Scroll-triggered animations
      gsap.utils.toArray<HTMLElement>('.animate-on-scroll').forEach((element) => {
        gsap.fromTo(element,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Service cards stagger
      gsap.fromTo('.service-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-section',
            start: 'top 80%', // Adjusted start trigger
          },
        }
      );

      // Portfolio items
      gsap.fromTo('.portfolio-item',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.portfolio-section',
            start: 'top 80%',
          },
        }
      );

      // Testimonial cards
      gsap.fromTo('.testimonial-card',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-section',
            start: 'top 80%',
          },
        }
      );

      // Blog cards
      gsap.fromTo('.blog-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.blog-section',
            start: 'top 80%',
          },
        }
      );

      // Stats counter animation
      gsap.utils.toArray<HTMLElement>('.stat-number').forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-value') || '0', 10);
        gsap.fromTo(stat,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: 'top 80%',
            },
          }
        );
      });

      // Force refresh to ensure positions are correct
      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert(); // Properly revert animations on unmount
    };
  }, []);
};
