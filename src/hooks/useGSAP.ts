
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = () => {
  useEffect(() => {
    // Floating elements animation
    gsap.to('.floating-element', {
      y: -20,
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.3,
    });

    // Text reveal animations
    gsap.fromTo('.reveal-text', 
      { 
        opacity: 0, 
        y: 100,
        rotationX: 90 
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.5,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.reveal-text',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Card hover effects
    const cards = document.querySelectorAll('.cosmic-card');
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          rotationY: 5,
          rotationX: 5,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          rotationY: 0,
          rotationX: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};
