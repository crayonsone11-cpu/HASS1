import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  variant?: 'fade-up' | 'media' | 'fade';
}

export function ScrollReveal({
  children,
  className = '',
  delayMs = 0,
  variant = 'fade-up',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Emil Kowalski principle: trigger once, never fight reader on scroll
        }
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const variantClass =
    variant === 'media'
      ? 'reveal-media'
      : variant === 'fade'
      ? 'reveal-fade'
      : 'reveal-fade-up';

  return (
    <div
      ref={ref}
      data-visible={isVisible ? 'true' : 'false'}
      style={delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={`${variantClass} ${className}`}
    >
      {children}
    </div>
  );
}
