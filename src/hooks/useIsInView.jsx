import { useState, useEffect } from "react";

const useIsInView = (ref, threshold) => {
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const target = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold }
        );

        if (target) observer.observe(target);

        return () => {
            if (target) observer.unobserve(target);
        };
    }, [ref, threshold]);
    
    return isInView;
};

export default useIsInView;