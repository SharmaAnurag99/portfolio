import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGsapAnimations = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Hero animations
    const heroTl = gsap.timeline({ delay: 0.3 });
    
    heroTl
      .from('.hero-title span', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
      })
      .from('.hero-image', {
        scale: 0.8,
        opacity: 0,
        rotation: -15,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=0.8')
      .from('.hero-text', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      }, '-=0.6')
      .from('.hero-reviews', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.6')
      .from('nav', {
        y: -50,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.8');

    // Scroll-triggered animations
    gsap.utils.toArray<HTMLElement>('.animate-on-scroll').forEach((element) => {
      gsap.from(element, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Service cards stagger
    gsap.from('.service-card', {
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.services-section',
        start: 'top 70%',
      },
    });

    // Portfolio items
    gsap.from('.portfolio-item', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.portfolio-section',
        start: 'top 70%',
      },
    });

    // Testimonial cards
    gsap.from('.testimonial-card', {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.testimonials-section',
        start: 'top 70%',
      },
    });

    // Blog cards
    gsap.from('.blog-card', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.blog-section',
        start: 'top 70%',
      },
    });

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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};
