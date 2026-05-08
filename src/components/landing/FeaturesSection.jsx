import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Gem, Moon, BookOpen, Star, Globe2, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const featureIcons = [
  <Gem size={24} />,
  <Moon size={24} />,
  <BookOpen size={24} />,
  <Star size={24} />,
  <Globe2 size={24} />,
  <Sparkles size={24} />,
];

const featureAccents = ['#6C63FF', '#FF6B9D', '#F59E0B', '#0EA5E9', '#10B981', '#8B5CF6'];

const FeaturesSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.feature-card', 
        { y: 80, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: 'Tarot Readings',
      description: 'Interactive 3-card readings with deep interpretation and elemental analysis.',
      link: '/reading',
      cta: 'Try Now'
    },
    {
      title: 'Birth Card Discovery',
      description: 'Find your personality, soul, and year cards based on numerology.',
      link: '/birth-card',
      cta: 'Find Yours'
    },
    {
      title: 'Learn Astrology',
      description: 'Comprehensive guides on zodiac signs, planets, houses, and birth charts.',
      link: '/learn',
      cta: 'Start Learning'
    },
    {
      title: 'Zodiac Deep Dive',
      description: 'Explore all 12 zodiac signs with scientific and mythological perspectives.',
      link: '/learn/zodiac',
      cta: 'Explore Signs'
    },
    {
      title: 'Planetary Wisdom',
      description: 'Understand how each planet influences different aspects of your life.',
      link: '/learn/planets',
      cta: 'Discover'
    },
    {
      title: 'Success Guidance',
      description: 'Personalized insights for career, love, health, and spiritual growth.',
      link: '/guidance',
      cta: 'Get Guidance'
    }
  ];

  return (
    <section className="features-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Tools &amp; Resources</span>
          <h2 className="section-title">Everything You Need to Master Astrology</h2>
          <p className="section-subtitle">
            From beginner-friendly guides to advanced tools — your cosmic journey starts here
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <Link
              to={feature.link}
              key={index}
              className="feature-card"
              style={{ '--card-accent': featureAccents[index] }}
            >
              <div className="feature-icon" style={{ color: featureAccents[index], background: `${featureAccents[index]}18` }}>
                {featureIcons[index]}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <span className="feature-cta">
                {feature.cta} <span className="arrow">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
