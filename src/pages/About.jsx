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
  const [activeTab, setActiveTab] = useState('story');
  const [formData, setFormData] = useState({ name: '', email: '', message: '', consultationType: '' });
  const [formStatus, setFormStatus] = useState('idle');

  const containerRef = useRef(null);
  const contentRef = useRef(null);

  const TABS = [
    { id: 'story', label: 'My Story', icon: <BookOpen size={18} /> },
    { id: 'services', label: 'Services', icon: <Sun size={18} /> },
    { id: 'feedback', label: 'Feedback', icon: <Users size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} /> },
  ];

  useEffect(() => {
    // Transition animation when tab changes
    gsap.fromTo(contentRef.current, 
      { opacity: 0, y: 10, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' }
    );
  }, [activeTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    // Simulated or actual fetch here...
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <div className="about-app-container" ref={containerRef}>
      {/* Cinematic Background */}
      <div className="app-bg-glow">
        <div className="glow-orb g-1"></div>
        <div className="glow-orb g-2"></div>
      </div>

      <div className="about-hero-waves">
        <LineWaves brightness={0.05} color1="#6C63FF" color2="#A78BFA" />
      </div>

      <div className="apple-app-shell">
        {/* Header Section */}
        <header className="app-header">
          <div className="profile-wrapper">
            <div className="profile-img-ring">
              <img src={rachnaPortrait} alt="Rachna Kumari" />
            </div>
            <div className="profile-meta">
              <h1>Rachna Kumari</h1>
              <span className="profile-tag">Professional Astrologer</span>
            </div>
          </div>
          
          <div className="quick-stats-row">
            <div className="q-stat"><strong>5+</strong><span>Years</span></div>
            <div className="q-stat"><strong>1k+</strong><span>Clients</span></div>
            <div className="q-stat"><strong>7</strong><span>Fields</span></div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <main className="app-main-content" ref={contentRef}>
          {activeTab === 'story' && (
            <div className="tab-content story-view">
              <div className="content-badge">Authenticity & Empathy</div>
              <p>
                My fascination with the stars began in childhood, woven into everyday life by Vedic traditions. Over the past five years, I have dedicated myself to studying Vedic astrology, numerology, and tarot.
              </p>
              <p>
                My approach is rooted in authentic knowledge and a genuine desire to help people find clarity through honesty and positivity.
              </p>
              <div className="mini-quote">
                "Astrology is about understanding yourself to make empowered choices."
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="tab-content services-view">
              <div className="services-list">
                {SERVICES_DATA.slice(0, 5).map(s => (
                  <div key={s.id} className="service-row-item">
                    <div className="s-icon-box">{s.icon}</div>
                    <div className="s-text">
                      <h4>{s.title}</h4>
                      <p>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="tab-content feedback-view">
              <div className="feedback-scroll">
                {TESTIMONIALS_DATA.slice(0, 3).map((t, i) => (
                  <div key={i} className="feedback-card-ios">
                    <div className="f-stars">
                      {[...Array(t.rating)].map((_, j) => <Star key={j} size={10} fill="currentColor" />)}
                    </div>
                    <p>"{t.text}"</p>
                    <span className="f-author">— {t.author}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="tab-content contact-view">
              {formStatus === 'success' ? (
                <div className="success-screen">
                  <CheckCircle size={40} color="#10B981" />
                  <h3>Message Sent</h3>
                  <p>I'll get back to you shortly.</p>
                </div>
              ) : (
                <form className="app-form" onSubmit={handleSubmit}>
                  <div className="input-group-ios">
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Email Address" required />
                  </div>
                  <select required>
                    <option value="">Select a Service</option>
                    <option value="astro">Astrology</option>
                    <option value="tarot">Tarot</option>
                  </select>
                  <textarea placeholder="How can I help you?" required></textarea>
                  <button type="submit" className="submit-btn-ios">
                    {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          )}
        </main>

        {/* iOS Style Bottom Navigation */}
        <nav className="app-nav">
          {TABS.map(tab => (
            <button 
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="nav-icon">{tab.icon}</div>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};



export default About;
