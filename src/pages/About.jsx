import { useState, useEffect, useRef } from 'react';
import { Sparkle, Star, Heart, BookOpen, Users, Clock, Video, Mail, MessageCircle, Send, CheckCircle, Globe, Compass, Sun, Moon, TrendingUp, Gem, Shield, Phone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BorderGlow from '../components/ui/BorderGlow';
import Grainient from '../components/ui/Grainient';
import Magnetic from '../components/ui/Magnetic';
import SoftAurora from '../components/ui/SoftAurora';
import LineWaves from '../components/ui/LineWaves';
import rachnaPortrait from '../assets/rachna_portrait.png';
import '../styles/about.css';

// Import Service Images
import imgAstrology from '../assets/services/astrology.png';
import imgNumerology from '../assets/services/numerology.png';
import imgKundali from '../assets/services/kundali.png';
import imgTarot from '../assets/services/tarot.png';
import imgCareer from '../assets/services/career.png';
import imgMarriage from '../assets/services/marriage.png';
import imgRemedies from '../assets/services/remedies.png';

gsap.registerPlugin(ScrollTrigger);

// Move static data outside component to prevent re-creation on every render
const SERVICES_DATA = [
  { 
    id: 'astrology',
    icon: <Sun size={24} />, 
    title: 'Astrology', 
    desc: 'Detailed birth chart analysis and planetary insights to understand your life patterns and cosmic influences.',
    colors: { color1: '#F5F3FF', color2: '#EDE9FF', color3: '#FDF4FF' },
    image: imgAstrology
  },
  { 
    id: 'numerology',
    icon: <Moon size={24} />, 
    title: 'Numerology', 
    desc: 'Discover the hidden meaning of numbers in your life and how they shape your destiny and personality.',
    colors: { color1: '#F0FDFA', color2: '#E0F2FE', color3: '#FDF4FF' },
    image: imgNumerology
  },
  { 
    id: 'kundali',
    icon: <Users size={24} />, 
    title: 'Kundali Analysis', 
    desc: 'Traditional Vedic chart matching and comprehensive analysis for marriage and partnership compatibility.',
    colors: { color1: '#FFF1F2', color2: '#FFF7ED', color3: '#FDF4FF' },
    image: imgKundali
  },
  { 
    id: 'tarot',
    icon: <Sparkle size={24} />, 
    title: 'Tarot Reading', 
    desc: 'Intuitive card spreads to provide clarity on your current situations and guidance for your immediate future.',
    colors: { color1: '#F8FAFC', color2: '#F1F5F9', color3: '#FDF4FF' },
    image: imgTarot
  },
  { 
    id: 'career',
    icon: <TrendingUp size={24} />, 
    title: 'Career Guidance', 
    desc: 'Identify the best professional paths and timing for career growth based on your astrological markers.',
    colors: { color1: '#ECFDF5', color2: '#F0F9FF', color3: '#FDF4FF' },
    image: imgCareer
  },
  { 
    id: 'marriage',
    icon: <Heart size={24} />, 
    title: 'Marriage & Love', 
    desc: 'Insights into your relationship dynamics, emotional needs, and the best timing for significant life commitments.',
    colors: { color1: '#FFF5F7', color2: '#FFF0F6', color3: '#FDF4FF' },
    image: imgMarriage
  },
  { 
    id: 'remedies',
    icon: <Gem size={24} />, 
    title: 'Remedial Measures', 
    desc: 'Practical suggestions and logical solutions to balance negative planetary influences and enhance positive ones.',
    colors: { color1: '#F5F3FF', color2: '#FAF5FF', color3: '#FDF4FF' },
    image: imgRemedies
  },
];

const TESTIMONIALS_DATA = [
  { text: 'Rachna ji\'s guidance helped me make a life-changing career decision. Her readings are incredibly accurate and her approach is very calming.', author: 'Priya S.', rating: 5 },
  { text: 'I was skeptical at first, but the kundali analysis was spot on. She explained everything with such clarity and patience. Highly recommended!', author: 'Amit K.', rating: 5 },
  { text: 'The tarot reading gave me so much clarity about my relationship. Rachna ji is genuine, honest, and truly gifted.', author: 'Sneha M.', rating: 5 },
  { text: 'Her numerology session opened my eyes to patterns I never noticed. Professional, warm, and deeply knowledgeable.', author: 'Rahul D.', rating: 5 },
];


const About = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', consultationType: '' });
  const [formStatus, setFormStatus] = useState('idle');
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });
      tl.from('.cinematic-portrait', { scale: 1.1, filter: 'blur(20px)', opacity: 0 })
        .from('.poster-title', { y: 100, opacity: 0, skewY: 5 }, '-=1')
        .from('.poster-content-block', { x: 50, opacity: 0, stagger: 0.2 }, '-=1.2')
        .from('.poster-stat-item', { scale: 0, opacity: 0, stagger: 0.1 }, '-=1');
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <div className="about-poster-container" ref={containerRef}>
      {/* Background Micro-layers */}
      <div className="poster-bg-layers">
        <div className="light-leak l-1"></div>
        <div className="light-leak l-2"></div>
        <div className="grain-overlay"></div>
      </div>

      <div className="about-hero-waves">
        <LineWaves brightness={0.06} color1="#6C63FF" color2="#F472B6" warpIntensity={0.8} />
      </div>

      <div className="poster-layout">
        {/* Left: Cinematic Visual Anchor */}
        <div className="poster-visual-side">
          <div className="cinematic-portrait">
            <img src={rachnaPortrait} alt="Rachna Kumari" />
            <div className="portrait-gradient-overlay"></div>
          </div>
          <div className="poster-stats-minimal">
            <div className="poster-stat-item"><strong>5+</strong><span>Years</span></div>
            <div className="poster-stat-item"><strong>1k+</strong><span>Clients</span></div>
            <div className="poster-stat-item"><strong>7</strong><span>Specialties</span></div>
          </div>
        </div>

        {/* Right: Editorial Content */}
        <div className="poster-content-side">
          <header className="poster-header">
            <div className="editorial-badge">Est. 2019</div>
            <h1 className="poster-title">Astro <br/>Rachna <br/>Kumari</h1>
          </header>

          <div className="poster-body">
            <div className="poster-content-block journey-block">
              <h3>The Journey</h3>
              <p>Dedicated to Vedic traditions, I blend ancient cosmic wisdom with modern empathy. 5 years of mastery in Astrology, Numerology, and Tarot, guiding souls toward their true potential.</p>
            </div>

            <div className="poster-content-block services-block">
              <h3>What I Offer</h3>
              <div className="minimal-service-grid">
                {SERVICES_DATA.slice(0, 6).map(s => (
                  <div key={s.id} className="mini-service-tag">
                    <span className="tag-icon">{s.icon}</span>
                    <span className="tag-name">{s.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="poster-content-block contact-block">
              {formStatus === 'success' ? (
                <div className="poster-success-msg">
                  <CheckCircle size={24} /> <span>Consultation Request Sent.</span>
                </div>
              ) : (
                <form className="poster-form-minimal" onSubmit={handleSubmit}>
                  <div className="p-form-row">
                    <input type="text" placeholder="Full Name" required />
                    <input type="email" placeholder="Email Address" required />
                  </div>
                  <div className="p-form-row">
                    <select required>
                      <option value="">Service Type</option>
                      <option value="astro">Astrology</option>
                      <option value="tarot">Tarot</option>
                    </select>
                    <button type="submit" disabled={formStatus === 'sending'}>
                      {formStatus === 'sending' ? 'Processing...' : 'Book Now'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <footer className="poster-footer">
            <div className="social-minimal">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              <span>/</span>
              <a href="https://blogspot.com" target="_blank" rel="noopener noreferrer">Blog</a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};




export default About;
