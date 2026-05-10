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
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const journeyRef = useRef(null);

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
      // Create a master timeline for hero
      const tl = gsap.timeline();
      
      tl.from('.about-hero-badge', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' })
        .from('.about-title', { opacity: 0, y: 30, duration: 1, ease: 'power4.out' }, '-=0.5')
        .from('.about-subtitle', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from('.about-stat', { opacity: 0, y: 20, stagger: 0.15, duration: 0.8, ease: 'power3.out' }, '-=0.4');

      // Stats Counting with better trigger sync
      gsap.from('.stat-number-value', {
        textContent: 0,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 90%',
          once: true
        }
      });

      // Section Reveals with proper Batching for better performance
      const reveals = gsap.utils.toArray('.reveal-section');
      reveals.forEach((section) => {
        gsap.from(section, {
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches;


  return (
    <div className="about-page" ref={sectionRef}>
      {/* Background Micro-elements */}
      <div className="about-bg-elements">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
      </div>

      {/* Hero */}
      <section className="about-hero" ref={heroRef}>
        {!isTouchDevice && (
          <div className="about-hero-waves">
            <LineWaves
              speed={0.15}
              innerLineCount={24}
              outerLineCount={28}
              warpIntensity={0.6}
              rotation={15}
              brightness={0.12}
              color1="#6C63FF"
              color2="#A78BFA"
              color3="#F472B6"
            />
          </div>
        )}
        
        <div className="container about-hero-content">
          <div className="about-hero-badge">
            <Sparkle size={14} /> Professional Astrologer & Spiritual Consultant
          </div>
          <h1 className="about-title">Astro Rachna Kumari</h1>
          <p className="about-subtitle">Guiding lives with authenticity, clarity, and cosmic wisdom</p>

          <div className="about-stats-row" ref={statsRef}>
            <div className="about-stat">
              <span className="about-stat-number"><span className="stat-number-value">5</span>+</span>
              <span className="about-stat-label">Years Experience</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number"><span className="stat-number-value">1000</span>+</span>
              <span className="about-stat-label">Clients Served</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number"><span className="stat-number-value">7</span></span>
              <span className="about-stat-label">Specializations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="about-journey container reveal-section" ref={journeyRef}>
        <div className="about-journey-grid">
          <div className="journey-image-side">
            <div className="journey-image-wrapper">
              <img src={rachnaPortrait} alt="Rachna Kumari" />
              <div className="image-decoration"></div>
            </div>
          </div>
          
          <div className="journey-text-side">
            <div className="journey-header">
              <BookOpen size={24} className="journey-icon" />
              <span className="journey-badge">Storytelling</span>
              <h2>My Journey</h2>
            </div>
            
            <p className="journey-lead">
              My fascination with the stars began in childhood, growing up in a household where Vedic traditions and cosmic wisdom were woven into everyday life. 
            </p>
            
            <p>
              Over the past five years, I have dedicated myself to studying Vedic astrology, numerology, tarot, and kundali analysis under renowned mentors. Every consultation I offer is rooted in authentic knowledge and a genuine desire to help people find clarity.
            </p>
            
            <div className="journey-quote-box">
              <p>"I believe astrology is not about predicting fate — it is about understanding yourself deeply enough to make empowered choices."</p>
            </div>

            <p>
              My approach is simple: honesty, empathy, and positivity. I do not believe in fear-based readings. Instead, I focus on helping my clients understand their strengths and align with their true cosmic potential.
            </p>
          </div>
        </div>
      </section>


      {/* Services */}
      <section className="about-services reveal-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">What I Offer</span>
            <h2 className="section-title">Services & Specializations</h2>
            <p className="section-subtitle">Comprehensive spiritual guidance tailored to your unique cosmic blueprint</p>
          </div>

          <div className="about-services-grid">
            {SERVICES_DATA.map((service) => (
              <BorderGlow
                key={service.id}
                className="service-card"
                edgeSensitivity={30}
                glowColor="108 99 255"
                backgroundColor="transparent"
                borderRadius={24}
                glowRadius={30}
                glowIntensity={1.0}
                animated={false}
              >
                <div className="service-card-bg">
                  <img src={service.image} alt={service.title} className="service-card-img" loading="lazy" />
                  <Grainient 
                    {...service.colors}
                    timeSpeed={0.45}
                    warpSpeed={4.0}
                    warpStrength={1.5}
                    noiseScale={2.5}
                    grainAmount={0.06}
                    zoom={1.2}
                  />
                  <div className="service-card-overlay"></div>
                </div>

                <div className="service-icon-wrapper">
                  <div className="service-icon" aria-hidden="true">{service.icon}</div>
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </BorderGlow>
            ))}
          </div>

        </div>
      </section>

      {/* Personal Consultation */}
      <section className="about-consultation container reveal-section">
        <div className="consultation-card">
          <div className="consultation-glass-bg"></div>
          <div className="consultation-content">
            <div className="consultation-badge">One-on-One</div>
            <h2>Personal Consultation</h2>
            <p>
              Book a one-on-one session with me for in-depth guidance on any area of your life. Each consultation is personalized, confidential, and focused entirely on your questions and concerns.
            </p>
            <div className="consultation-details">
              <div className="consultation-detail"><Clock size={18} /> 30–60 minutes</div>
              <div className="consultation-detail"><Video size={18} /> Online / Offline</div>
              <div className="consultation-detail"><Globe size={18} /> Hindi & English</div>
            </div>
            <Magnetic strength={20}>
              <a href="#contact" className="btn btn-primary btn-lg">
                <Phone size={18} /> Book Consultation
              </a>
            </Magnetic>
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section className="about-testimonials container reveal-section">
        <div className="section-header">
          <span className="section-badge">Client Stories</span>
          <h2 className="section-title">What My Clients Say</h2>
          <p className="section-subtitle">Real experiences from people who found clarity and guidance</p>
        </div>

        <div className="testimonial-grid">
          {TESTIMONIALS_DATA.map((t, i) => (
            <BorderGlow
              key={i}
              className="testimonial-card"
              edgeSensitivity={30}
              glowColor="108 99 255"
              backgroundColor="transparent"
              borderRadius={24}
              glowRadius={30}
              glowIntensity={1.0}
              animated={false}
            >
              <div className="testimonial-card-bg">
                <Grainient 
                  color1="#F5F3FF"
                  color2="#EDE9FF"
                  color3="#FDF4FF"
                  timeSpeed={0.2}
                  warpSpeed={2.0}
                  grainAmount={0.05}
                />
              </div>
              <div className="testimonial-content">
                <div className="testimonial-stars">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p>"{t.text}"</p>
                <span className="testimonial-author">— {t.author}</span>
              </div>
            </BorderGlow>

          ))}
        </div>
      </section>

      {/* Social Presence */}
      <section className="about-social container reveal-section">
        <h2>Connect With Me</h2>
        <p className="social-description">
          Follow my journey, daily insights, and cosmic guidance on social media
        </p>
        <div className="social-links">
          <Magnetic strength={15}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <Globe size={20} /> Instagram
            </a>
          </Magnetic>
          <Magnetic strength={15}>
            <a href="https://blogspot.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <BookOpen size={20} /> Blog
            </a>
          </Magnetic>
        </div>
      </section>

      {/* Contact Form */}
      <section className="about-contact container reveal-section" id="contact">
        <div className="section-header">
          <span className="section-badge">Get In Touch</span>
          <h2 className="section-title">Contact Me</h2>
          <p className="section-subtitle">Have a question or want to book a consultation? Reach out below.</p>
        </div>

        <div className="contact-form-card">
          <div className="form-glass-layer"></div>
          <div className="contact-form-content">
            {formStatus === 'success' ? (
              <div className="form-success">
                <CheckCircle size={48} className="success-icon" />
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. I will get back to you within 24–48 hours.</p>
                <button 
                  type="button" 
                  onClick={() => setFormStatus('idle')} 
                  className="btn btn-outline"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="premium-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="form-name"><Users size={16} /> Full Name</label>
                    <input 
                      id="form-name"
                      type="text" 
                      required 
                      placeholder="Aria Star" 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="form-email"><Mail size={16} /> Email</label>
                    <input 
                      id="form-email"
                      type="email" 
                      required 
                      placeholder="aria@cosmos.com" 
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="form-consultation"><Compass size={16} /> Consultation Type</label>
                  <select 
                    id="form-consultation"
                    required 
                    value={formData.consultationType} 
                    onChange={(e) => setFormData({...formData, consultationType: e.target.value})}
                  >
                    <option value="">Select a service</option>
                    <option value="astrology">Astrology Analysis</option>
                    <option value="numerology">Numerology Insights</option>
                    <option value="kundali">Kundali Matching</option>
                    <option value="tarot">Tarot Reading</option>
                    <option value="career">Career Guidance</option>
                    <option value="marriage">Marriage Consultation</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="form-message"><MessageCircle size={16} /> Your Message</label>
                  <textarea 
                    id="form-message"
                    required 
                    placeholder="How can I help you navigate your journey?" 
                    value={formData.message} 
                    onChange={(e) => setFormData({...formData, message: e.target.value})} 
                  />
                </div>

                <Magnetic strength={10}>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-submit" 
                    disabled={formStatus === 'sending'}
                    aria-label={formStatus === 'sending' ? 'Sending Message' : 'Submit Contact Form'}
                  >
                    <Send size={18} /> {formStatus === 'sending' ? 'Sending Magic...' : 'Send Message'}
                  </button>
                </Magnetic>
                
                {formStatus === 'error' && (
                  <p className="form-error-msg" role="alert">
                    Something went wrong. Please try again later.
                  </p>
                )}
              </form>
            )}

          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
