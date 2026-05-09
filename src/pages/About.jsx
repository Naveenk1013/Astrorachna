import { useState } from 'react';
import { Sparkle, Star, Heart, BookOpen, Users, Clock, Video, Mail, MessageCircle, Send, CheckCircle, Globe, Compass, Sun, Moon, TrendingUp, Gem, Shield, Phone } from 'lucide-react';
import BorderGlow from '../components/ui/BorderGlow';
import Grainient from '../components/ui/Grainient';
import '../styles/about.css';

const About = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', consultationType: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  const services = [
    { 
      icon: <Sun size={24} />, 
      title: 'Astrology', 
      desc: 'Detailed birth chart analysis and planetary insights to understand your life patterns and cosmic influences.',
      colors: { color1: '#F5F3FF', color2: '#EDE9FF', color3: '#FDF4FF' } // Subtle Lavender
    },
    { 
      icon: <Moon size={24} />, 
      title: 'Numerology', 
      desc: 'Discover the hidden meaning of numbers in your life and how they shape your destiny and personality.',
      colors: { color1: '#F0FDFA', color2: '#E0F2FE', color3: '#FDF4FF' } // Subtle Cyan/Blue
    },
    { 
      icon: <Users size={24} />, 
      title: 'Kundali Analysis', 
      desc: 'Traditional Vedic chart matching and comprehensive analysis for marriage and partnership compatibility.',
      colors: { color1: '#FFF1F2', color2: '#FFF7ED', color3: '#FDF4FF' } // Subtle Rose/Amber
    },
    { 
      icon: <Sparkle size={24} />, 
      title: 'Tarot Reading', 
      desc: 'Intuitive card spreads to provide clarity on your current situations and guidance for your immediate future.',
      colors: { color1: '#F8FAFC', color2: '#F1F5F9', color3: '#FDF4FF' } // Subtle Slate/Grey
    },
    { 
      icon: <TrendingUp size={24} />, 
      title: 'Career Guidance', 
      desc: 'Identify the best professional paths and timing for career growth based on your astrological markers.',
      colors: { color1: '#ECFDF5', color2: '#F0F9FF', color3: '#FDF4FF' } // Subtle Emerald/Blue
    },
    { 
      icon: <Heart size={24} />, 
      title: 'Marriage & Love', 
      desc: 'Insights into your relationship dynamics, emotional needs, and the best timing for significant life commitments.',
      colors: { color1: '#FFF5F7', color2: '#FFF0F6', color3: '#FDF4FF' } // Subtle Pink
    },
    { 
      icon: <Gem size={24} />, 
      title: 'Remedial Measures', 
      desc: 'Practical suggestions and logical solutions to balance negative planetary influences and enhance positive ones.',
      colors: { color1: '#F5F3FF', color2: '#FAF5FF', color3: '#FDF4FF' } // Subtle Purple
    },
  ];



  const testimonials = [
    { text: 'Rachna ji\'s guidance helped me make a life-changing career decision. Her readings are incredibly accurate and her approach is very calming.', author: 'Priya S.', rating: 5 },
    { text: 'I was skeptical at first, but the kundali analysis was spot on. She explained everything with such clarity and patience. Highly recommended!', author: 'Amit K.', rating: 5 },
    { text: 'The tarot reading gave me so much clarity about my relationship. Rachna ji is genuine, honest, and truly gifted.', author: 'Sneha M.', rating: 5 },
    { text: 'Her numerology session opened my eyes to patterns I never noticed. Professional, warm, and deeply knowledgeable.', author: 'Rahul D.', rating: 5 },
  ];

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero container">
        <div className="about-hero-badge">
          <Sparkle size={14} /> Professional Astrologer & Spiritual Consultant
        </div>
        <h1>Astro Rachna Kumari</h1>
        <p className="about-subtitle">Guiding lives with authenticity, clarity, and cosmic wisdom</p>

        <div className="about-stats-row">
          <div className="about-stat">
            <span className="about-stat-number">5+</span>
            <span className="about-stat-label">Years Experience</span>
          </div>
          <div className="about-stat">
            <span className="about-stat-number">1000+</span>
            <span className="about-stat-label">Clients Served</span>
          </div>
          <div className="about-stat">
            <span className="about-stat-number">7</span>
            <span className="about-stat-label">Specializations</span>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="about-journey container">
        <div className="about-journey-content">
          <h2><BookOpen size={24} /> My Journey</h2>
          <p>
            My fascination with the stars began in childhood, growing up in a household where Vedic traditions and cosmic wisdom were woven into everyday life. What started as curiosity about planetary movements and birth charts gradually became a lifelong calling.
          </p>
          <p>
            Over the past five years, I have dedicated myself to studying Vedic astrology, numerology, tarot, and kundali analysis under renowned mentors. Every consultation I offer is rooted in authentic knowledge, deep research, and a genuine desire to help people find clarity in their lives.
          </p>
          <blockquote>
            "I believe astrology is not about predicting fate — it is about understanding yourself deeply enough to make empowered choices."
          </blockquote>
          <p>
            My approach is simple: honesty, empathy, and positivity. I do not believe in fear-based readings. Instead, I focus on helping my clients understand their strengths, navigate challenges, and align with their true cosmic potential.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="about-services">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">What I Offer</span>
            <h2 className="section-title">Services & Specializations</h2>
            <p className="section-subtitle">Comprehensive spiritual guidance tailored to your unique cosmic blueprint</p>
          </div>

          <div className="about-services-grid">
            {services.map((service, i) => (
              <BorderGlow
                key={i}
                className="service-card"
                edgeSensitivity={30}
                glowColor="260 80 80"
                backgroundColor="transparent"
                borderRadius={24}
                glowRadius={30}
                glowIntensity={1.0}
                animated={false}
              >
                <div className="service-card-bg">
                  <Grainient 
                    {...service.colors}
                    timeSpeed={0.45}
                    warpSpeed={4.0}
                    warpStrength={1.5}
                    noiseScale={2.5}
                    grainAmount={0.06}
                    zoom={1.2}
                  />
                </div>

                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Consultation */}

      <section className="about-consultation container">
        <div className="consultation-card">
          <h2>Personal Consultation</h2>
          <p>
            Book a one-on-one session with me for in-depth guidance on any area of your life. Each consultation is personalized, confidential, and focused entirely on your questions and concerns.
          </p>
          <div className="consultation-details">
            <div className="consultation-detail"><Clock size={18} /> 30–60 minutes</div>
            <div className="consultation-detail"><Video size={18} /> Online / Offline</div>
            <div className="consultation-detail"><Globe size={18} /> Hindi & English</div>
          </div>
          <a href="#contact" className="btn btn-primary btn-lg">
            <Phone size={18} /> Book Consultation
          </a>
        </div>
      </section>

      {/* Testimonials */}
      <section className="about-testimonials container">
        <div className="section-header">
          <span className="section-badge">Client Stories</span>
          <h2 className="section-title">What My Clients Say</h2>
          <p className="section-subtitle">Real experiences from people who found clarity and guidance</p>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <BorderGlow
              key={i}
              className="testimonial-card"
              edgeSensitivity={30}
              glowColor="260 80 80"
              backgroundColor="var(--color-bg-card)"
              borderRadius={24}
              glowRadius={30}
              glowIntensity={1.0}
              animated={false}
            >
              <div className="testimonial-stars">
                {[...Array(t.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
              </div>
              <p>"{t.text}"</p>
              <span className="testimonial-author">— {t.author}</span>
            </BorderGlow>
          ))}
        </div>
      </section>

      {/* Social Presence */}
      <section className="about-social container">
        <h2>Connect With Me</h2>
        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '500px', margin: '0 auto 1rem' }}>
          Follow my journey, daily insights, and cosmic guidance on social media
        </p>
        <div className="social-links">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <Globe size={20} /> Instagram
          </a>
          <a href="https://blogspot.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <BookOpen size={20} /> Blog
          </a>
        </div>
      </section>

      {/* Contact Form */}
      <section className="about-contact container" id="contact">
        <div className="section-header">
          <span className="section-badge">Get In Touch</span>
          <h2 className="section-title">Contact Me</h2>
          <p className="section-subtitle">Have a question or want to book a consultation? Reach out below.</p>
        </div>

        <div className="contact-form-wrapper">
          {formStatus === 'success' ? (
            <div className="form-success">
              <CheckCircle size={40} style={{ marginBottom: '1rem' }} />
              <p>Thank you! Your message has been sent. I will get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label><Users size={16} /> Full Name</label>
                <input type="text" required placeholder="Your name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label><Mail size={16} /> Email</label>
                <input type="email" required placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label><Compass size={16} /> Consultation Type</label>
                <select required value={formData.consultationType} onChange={(e) => setFormData({...formData, consultationType: e.target.value})}>
                  <option value="">Select a service</option>
                  <option value="astrology">Astrology</option>
                  <option value="numerology">Numerology</option>
                  <option value="kundali">Kundali Analysis</option>
                  <option value="tarot">Tarot Reading</option>
                  <option value="career">Career Guidance</option>
                  <option value="marriage">Marriage Consultation</option>
                  <option value="health">Health Insights</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label><MessageCircle size={16} /> Message</label>
                <textarea required placeholder="Tell me about your question or concern..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={formStatus === 'sending'}>
                <Send size={18} /> {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {formStatus === 'error' && (
                <p style={{ color: '#ff6b6b', textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
                  Something went wrong. Please try again or email directly.
                </p>
              )}
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default About;
