import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Sparkle, Sparkles, AlertCircle, Mail, MessageCircle, Link as LinkIcon, Video } from 'lucide-react';
import CustomCursor from './components/ui/CustomCursor';
import SmoothScroller from './components/layout/SmoothScroller';
import Grainient from './components/ui/Grainient';
import Magnetic from './components/ui/Magnetic';
import LineWaves from './components/ui/LineWaves';
import Home from './pages/Home';
import Reading from './pages/Reading';
import BirthCard from './pages/BirthCard';
import LearnHub from './pages/LearnHub';
import About from './pages/About';
import './styles/index.css';
import './styles/cards.css';
import './styles/spreads.css';
import './styles/home.css';
import './styles/landing.css';
import './styles/about.css';

function AppContent() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isTouchDevice] = useState(
    typeof window !== 'undefined' ? window.matchMedia("(pointer: coarse)").matches : false
  );

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/learn', label: 'Learn Astrology' },
    { to: '/reading', label: 'Tarot Reading' },
    { to: '/birth-card', label: 'Birth Cards' },
  ];

  const showFooter = location.pathname !== '/about';

  return (
    <div className="App" style={{ position: 'relative', minHeight: '100vh' }}>
      <CustomCursor />
      {/* WebGL background — Now correctly layered for iOS visibility */}
      <div className="global-bg-wrapper" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <Grainient
          color1="#FF9FFC"
          color2="#5227FF"
          color3="#B497CF"
          timeSpeed={1.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.5}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      {/* Navigation — Layered above bg */}
      <nav className="main-nav">
        <div className="container nav-container">
          <Link to="/" className="nav-logo">
            <span className="logo-symbol"><Sparkle size={20} /></span>
            <span className="logo-text">Rachna</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-links desktop-nav">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <Link to="/reading" className="nav-cta desktop-nav">
            <Sparkles size={14} />
            Free Reading
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/reading"
            className="btn btn-primary mobile-cta"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Sparkles size={14} />
            Free Reading
          </Link>
        </div>
      </nav>

      {/* Main Content — Layered above bg */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <SmoothScroller>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/learn" element={<LearnHub />} />
            <Route path="/reading" element={<Reading />} />
            <Route path="/birth-card" element={<BirthCard />} />
          </Routes>
        </SmoothScroller>
      </main>

      {/* Conditional Footer — Layered above bg */}
      {showFooter && (
        <footer className="main-footer" style={{ position: 'relative', zIndex: 1 }}>
          {!isTouchDevice && (
            <div className="footer-waves-bg">
              <LineWaves
                speed={0.2}
                innerLineCount={28}
                outerLineCount={32}
                warpIntensity={0.8}
                rotation={-30}
                edgeFadeWidth={0.0}
                colorCycleSpeed={0.6}
                brightness={0.15}
                color1="#6C63FF"
                color2="#8B5CF6"
                color3="#A78BFA"
                enableMouseInteraction={true}
                mouseInfluence={1.5}
              />
            </div>
          )}

          <div className="container">
            <div className="footer-top">
              <Link to="/" className="nav-logo footer-logo">
                <span className="logo-symbol"><Sparkles size={28} /></span>
                <span className="logo-text">Rachna</span>
              </Link>
              <p className="footer-tagline">
                Where ancient wisdom meets modern clarity.
              </p>
            </div>

            <div className="footer-divider" />

            <div className="footer-grid">
              <div className="footer-brand">
                <p className="footer-mission">
                  Guiding lives with authenticity, clarity, and cosmic wisdom through the fusion of ancient tradition and logical insight.
                </p>
                <div className="footer-socials">
                  <Magnetic strength={15}><a href="#" aria-label="Email"><Mail size={18} /></a></Magnetic>
                  <Magnetic strength={15}><a href="#" aria-label="Chat"><MessageCircle size={18} /></a></Magnetic>
                  <Magnetic strength={15}><a href="#" aria-label="LinkedIn"><LinkIcon size={18} /></a></Magnetic>
                  <Magnetic strength={15}><a href="#" aria-label="YouTube"><Video size={18} /></a></Magnetic>
                </div>
              </div>

              <div className="footer-links">
                <h4>Cosmic Services</h4>
                <Magnetic strength={10}><Link to="/reading">Tarot Reading</Link></Magnetic>
                <Magnetic strength={10}><Link to="/birth-card">Birth Cards</Link></Magnetic>
                <Magnetic strength={10}><Link to="/learn">Numerology</Link></Magnetic>
                <Magnetic strength={10}><Link to="/learn">Kundali Analysis</Link></Magnetic>
              </div>

              <div className="footer-links">
                <h4>Explorations</h4>
                <Magnetic strength={10}><Link to="/learn">Why it Works</Link></Magnetic>
                <Magnetic strength={10}><Link to="/learn">Zodiac Wisdom</Link></Magnetic>
                <Magnetic strength={10}><Link to="/learn">Planetary Loops</Link></Magnetic>
                <Magnetic strength={10}><Link to="/learn">Learning Hub</Link></Magnetic>
              </div>

              <div className="footer-links">
                <h4>Support & Legal</h4>
                <Magnetic strength={10}><Link to="/about">About Rachna</Link></Magnetic>
                <Magnetic strength={10}><a href="#contact">Contact Hub</a></Magnetic>
                <Magnetic strength={10}><a href="#privacy">Privacy Policy</a></Magnetic>
                <Magnetic strength={10}><a href="#terms">Terms of Service</a></Magnetic>
              </div>
            </div>

            <div className="footer-bottom">
              <p className="footer-copyright">
                © 2026 Rachna Kumari. Crafted for the Cosmos.
              </p>
              <p className="footer-disclaimer">
                <AlertCircle size={14} />
                Interpretations are for self-reflection & entertainment only.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}


export default App;
