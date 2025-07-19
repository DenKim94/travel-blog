import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>(threshold: number = 0.1): [React.RefObject<T | null> , boolean] {
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
