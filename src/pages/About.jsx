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

  const sectionRef = useRef(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formStatus === 'sending') return;
    setFormStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '', consultationType: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.dashboard-pane', { 
        opacity: 0, 
        y: 20, 
        stagger: 0.1, 
        duration: 1, 
        ease: 'power3.out' 
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches;

  return (
    <div className="about-page single-screen" ref={sectionRef}>
      {/* Background Micro-elements */}
      <div className="about-bg-elements">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
      </div>

      {!isTouchDevice && (
        <div className="about-hero-waves">
          <LineWaves
            speed={0.1}
            innerLineCount={20}
            outerLineCount={24}
            warpIntensity={0.4}
            brightness={0.08}
            color1="#6C63FF"
            color2="#A78BFA"
            color3="#F472B6"
          />
        </div>
      )}

      <div className="about-dashboard-grid">
        {/* Left Column: Profile & Stats */}
        <div className="dashboard-pane profile-pane">
          <div className="hero-compact">
            <h1 className="about-title-compact">Rachna Kumari</h1>
            <div className="about-hero-badge-compact">
              <Sparkle size={12} /> Professional Astrologer
            </div>
          </div>

          <div className="journey-image-compact">
            <img src={rachnaPortrait} alt="Rachna Kumari" />
            <div className="image-decoration"></div>
          </div>

          <div className="about-stats-compact">
            <div className="about-stat-mini">
              <span className="stat-val">5+</span>
              <span className="stat-lbl">Years</span>
            </div>
            <div className="about-stat-mini">
              <span className="stat-val">1k+</span>
              <span className="stat-lbl">Clients</span>
            </div>
            <div className="about-stat-mini">
              <span className="stat-val">7</span>
              <span className="stat-lbl">Specialties</span>
            </div>
          </div>
          
          <div className="social-links-compact">
            <Magnetic strength={10}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn"><Globe size={16} /></a>
            </Magnetic>
            <Magnetic strength={10}>
              <a href="https://blogspot.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn"><BookOpen size={16} /></a>
            </Magnetic>
          </div>
        </div>

        {/* Middle Column: Journey & Services */}
        <div className="dashboard-pane center-pane">
          <div className="pane-section journey-pane">
            <div className="section-header-compact">
              <BookOpen size={18} />
              <h2>My Journey</h2>
            </div>
            <p className="journey-text-mini">
              Growing up in a household where Vedic traditions were woven into everyday life, I dedicated myself to studying astrology, numerology, and tarot. My approach is rooted in authentic knowledge and a genuine desire to help people find clarity through honesty and empathy.
            </p>
          </div>

          <div className="pane-section services-pane">
            <div className="section-header-compact">
              <Sun size={18} />
              <h2>What I Offer</h2>
            </div>
            <div className="services-mini-grid">
              {SERVICES_DATA.map((service) => (
                <div key={service.id} className="service-item-mini">
                  <div className="service-icon-mini">{service.icon}</div>
                  <div className="service-info-mini">
                    <h4>{service.title}</h4>
                    <p>{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Testimonials & Contact */}
        <div className="dashboard-pane right-pane">
          <div className="pane-section testimonials-pane-mini">
            <div className="section-header-compact">
              <Users size={18} />
              <h2>Client Stories</h2>
            </div>
            <div className="testimonials-stack">
              {TESTIMONIALS_DATA.slice(0, 3).map((t, i) => (
                <div key={i} className="testimonial-mini-card">
                  <div className="stars-mini">
                    {[...Array(t.rating)].map((_, j) => <Star key={j} size={10} fill="currentColor" />)}
                  </div>
                  <p>"{t.text}"</p>
                  <span className="author-mini">— {t.author}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pane-section contact-pane-mini">
            <div className="section-header-compact">
              <Mail size={18} />
              <h2>Get In Touch</h2>
            </div>
            <form onSubmit={handleSubmit} className="form-mini">
              <div className="form-row-mini">
                <input type="text" required placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input type="email" required placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <select required value={formData.consultationType} onChange={(e) => setFormData({...formData, consultationType: e.target.value})}>
                <option value="">Select Service</option>
                <option value="astrology">Astrology</option>
                <option value="numerology">Numerology</option>
                <option value="kundali">Kundali</option>
                <option value="tarot">Tarot</option>
              </select>
              <textarea required placeholder="Your Message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
              <button type="submit" disabled={formStatus === 'sending'} className="btn-mini-submit">
                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default About;
