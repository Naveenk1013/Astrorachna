import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  
  const [hoverState, setHoverState] = useState('default'); // 'default', 'pointer', 'text', 'card'

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;

    // Fast setters for performance
    const setDotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    
    const setRingX = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3.out" });

    const handleMouseMove = (e) => {
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);

      const target = e.target;
      const computedStyle = window.getComputedStyle(target);

      // Check hover states
      if (
        target.closest('.feature-card') || 
        target.closest('.magic-bento-card') || 
        target.closest('.tarot-card') ||
        target.closest('.spread-card') ||
        target.closest('.mission-card')
      ) {
        setHoverState('card');
      } else if (
        computedStyle.cursor === 'pointer' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.nav-link')
      ) {
        setHoverState('pointer');
      } else if (
        computedStyle.cursor === 'text' ||
        target.tagName.toLowerCase() === 'p' ||
        target.tagName.toLowerCase() === 'h1' ||
        target.tagName.toLowerCase() === 'h2' ||
        target.tagName.toLowerCase() === 'span'
      ) {
        setHoverState('text');
      } else {
        setHoverState('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorDotRef}
        className={`custom-cursor-dot state-${hoverState}`}
      />
      <div 
        ref={cursorRingRef}
        className={`custom-cursor-ring state-${hoverState}`}
      />
    </>
  );
};

export default CustomCursor;
