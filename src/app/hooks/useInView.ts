'use client';
import { useEffect, useRef, useState } from "react";

function assertThreshold(value: number): asserts value is number {
  if (value < 0.1 || value > 1) {
    throw new RangeError('threshold must be between 0.1 and 1.0');
  }
}

export function useInView<T extends HTMLElement>(threshold: number = 0.1
): [React.RefObject<T | null> , boolean] {
    assertThreshold(threshold);
    
    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting), { threshold });

        observer.observe(element);    
        return () => observer.unobserve(element);
    }, [threshold])

    return [ref, inView];
}
