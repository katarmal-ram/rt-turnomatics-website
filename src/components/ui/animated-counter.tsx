
import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: number | string;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimal?: number;
}

export const AnimatedCounter = ({ 
  value, 
  duration = 2000, 
  className = "", 
  prefix = "", 
  suffix = "", 
  decimal = 0 
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  // Extract numeric value from string if needed
  const getNumericValue = (val: number | string): number => {
    if (typeof val === 'number') return val;
    
    // Remove non-numeric characters except decimal points
    const numericString = val.toString().replace(/[^\d.-]/g, '');
    const parsed = parseFloat(numericString);
    return isNaN(parsed) ? 0 : parsed;
  };

  const targetValue = getNumericValue(value);

  // Intersection Observer to trigger animation when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Animate counter when visible
  useEffect(() => {
    if (!isVisible || targetValue === 0) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setCount(targetValue * easeOut);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, targetValue, duration]);

  const formatNumber = (num: number): string => {
    if (decimal > 0) {
      return num.toFixed(decimal);
    }
    return Math.floor(num).toString();
  };

  // Handle non-numeric values
  if (targetValue === 0 && typeof value === 'string') {
    return (
      <span ref={counterRef} className={className}>
        {prefix}{value}{suffix}
      </span>
    );
  }

  return (
    <span ref={counterRef} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};
