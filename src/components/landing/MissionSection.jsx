import { useEffect, useRef } from 'react';
import { Target, Eye, FlaskConical, Sun, Globe, Moon } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import missionGuidance from '../../assets/mission-guidance.png';
import visionConnection from '../../assets/vision-connection.png';
import scientificApproach from '../../assets/scientific-approach.png';
import cosmicCycles from '../../assets/cosmic-cycles.png';

gsap.registerPlugin(ScrollTrigger);

const MissionSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.mission-card', 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.mission-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.why-works-banner',
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: '.why-works-banner',
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="mission-section" ref={sectionRef}>
      <div className="container">
        <div className="mission-header">
          <span className="section-badge">Our Mission</span>
          <h2 className="section-title">Bridging Ancient Wisdom &amp; Modern Science</h2>
        </div>

        <div className="mission-grid">
          {/* Mission Card */}
          <div className="mission-card">
            <div className="card-image-top">
              <img src={missionGuidance} alt="Mission Guidance" />
            </div>
            <div className="mission-icon">
              <Target size={28} />
            </div>
            <h3>Our Mission</h3>
            <p>
              To teach and empower people about astrology through scientific and logical
              explanations — revealing how celestial patterns influence personality,
              relationships, and life decisions.
            </p>
          </div>

          {/* Vision Card */}
          <div className="mission-card">
            <div className="card-image-top">
              <img src={visionConnection} alt="Vision Connection" />
            </div>
            <div className="mission-icon">
              <Eye size={28} />
            </div>
            <h3>Our Vision</h3>
            <p>
              A world where everyone has access to astrological wisdom — helping billions
              understand themselves better and navigate their path to success with cosmic guidance.
            </p>
          </div>

          {/* Approach Card */}
          <div className="mission-card">
            <div className="card-image-top">
              <img src={scientificApproach} alt="Scientific Approach" />
            </div>
            <div className="mission-icon">
              <FlaskConical size={28} />
            </div>
            <h3>Scientific Approach</h3>
            <p>
              We don&apos;t just tell you what the stars say — we explain <em>why</em> and <em>how</em>
              astrological principles work, connecting astronomy, psychology, and ancient traditions.
            </p>
          </div>
        </div>

        {/* Why it works section */}
        <div className="why-works-banner">
          <div className="why-content">
            <h3>Why Astrology Works</h3>
            <p>
              For millennia, humans have observed correlations between celestial events and earthly
              patterns. Modern research in chronobiology and circadian rhythms shows how cosmic
              cycles affect human behavior. We bridge this scientific understanding with traditional
              astrological wisdom.
            </p>
          </div>
          <div className="why-visual">
            <div className="why-image-wrapper">
              <img src={cosmicCycles} alt="Cosmic Cycles" className="why-banner-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
