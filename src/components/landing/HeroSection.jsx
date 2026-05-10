import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkle, BookOpen, FlaskConical, Star, Gem, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SoftAurora from '../ui/SoftAurora';
import Magnetic from '../ui/Magnetic';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches;

  useEffect(() => {
    // Skip heavy parallax on touch devices
    if (isTouchDevice) return;

    const ctx = gsap.context(() => {
      // Parallax content
      gsap.to(contentRef.current, {
        y: 150,
        opacity: 0,
        filter: 'blur(10px)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Parallax background orbs
      gsap.to('.hero-bg-parallax', {
        y: 300,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isTouchDevice]);

  return (
    <section className="hero-section" ref={sectionRef}>
      <div className="hero-aurora-bg" style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.5 }}>
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={1}
          color1="#0a0a0c"
          color2="#e100ff"
          noiseFrequency={2.5}
          noiseAmplitude={1}
          bandHeight={0.5}
          bandSpread={1}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1}
          enableMouseInteraction
          mouseInfluence={0.25}
        />
      </div>
      <div className="hero-bg-parallax" style={{ position: 'absolute', inset: 0, zIndex: 0 }}></div>
      <div className="hero-content container" style={{ position: 'relative', zIndex: 1 }} ref={contentRef}>
        <div className="hero-text-side">
          <div className="hero-badge">
            <Sparkle size={14} />
            Science Meets Ancient Wisdom
          </div>

          <h1 className="hero-title">
            Astro Rachna
            <span className="title-accent">Your Cosmic Guide</span>
          </h1>

          <p className="hero-description">
            Experience astrology as a bridge between <span className="cursive-accent">ancient wisdom</span> and <span className="cursive-accent">modern logic</span>. 
            Get personalized insights into your destiny with <span className="cursive-accent">scientific clarity</span>.
          </p>


          <div className="hero-cta">
            <Magnetic strength={30}>
              <Link to="/reading" className="btn btn-primary btn-lg">
                <Gem size={18} />
                Free Tarot Reading
              </Link>
            </Magnetic>
            <Magnetic strength={20}>
              <Link to="/learn" className="btn btn-outline btn-lg">
                <BookOpen size={18} />
                Explore Library
              </Link>
            </Magnetic>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">78</span>
              <span className="stat-label">Tarot Cards</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">12</span>
              <span className="stat-label">Zodiac Signs</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5k+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
          </div>

          <div className="hero-trust">
            <span><FlaskConical size={14} /> Logical Foundations</span>
            <span className="trust-dot">•</span>
            <span><Star size={14} /> Precision Insights</span>
          </div>
        </div>

        <div className="hero-visual-side">
          <div className="visual-wrapper">
            
            <div className="floating-element orb-1"></div>
            <div className="floating-element orb-2"></div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll to Explore</span>
        <ChevronDown size={20} />
      </div>
    </section>
  );
};

export default HeroSection;
