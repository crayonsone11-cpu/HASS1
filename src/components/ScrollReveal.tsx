import React, { useEffect, useRef, useState } from 'react';

export type ScrollRevealVariant =
  | 'fade-up'
  | 'fade-left'
  | 'fade-right'
  | 'media'
  | 'fade'
  | 'bloom'
  | 'pop'
  | 'step-up'
  | 'curtain';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  durationMs?: number;
  threshold?: number;
  variant?: ScrollRevealVariant;
}

export function ScrollReveal({
  children,
  className = '',
  delayMs = 0,
  durationMs,
  threshold = 0.08,
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
          observer.disconnect(); // Trigger once, keep layout performant
        }
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const variantClassMap: Record<ScrollRevealVariant, string> = {
    'fade-up': 'reveal-fade-up',
    'fade-left': 'reveal-fade-left',
    'fade-right': 'reveal-fade-right',
    'media': 'reveal-media',
    'fade': 'reveal-fade',
    'bloom': 'reveal-bloom',
    'pop': 'reveal-pop',
    'step-up': 'reveal-step-up',
    'curtain': 'reveal-curtain',
  };

  const variantClass = variantClassMap[variant] || 'reveal-fade-up';

  const style: React.CSSProperties = {
    ...(delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : {}),
    ...(durationMs ? { transitionDuration: `${durationMs}ms` } : {}),
  };

  return (
    <div
      ref={ref}
      data-visible={isVisible ? 'true' : 'false'}
      style={Object.keys(style).length > 0 ? style : undefined}
      className={`${variantClass} ${className}`}
    >
      {children}
    </div>
  );
}
