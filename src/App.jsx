import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Sparkle, Sparkles, AlertCircle } from 'lucide-react';
import CustomCursor from './components/ui/CustomCursor';
import SmoothScroller from './components/layout/SmoothScroller';
import Grainient from './components/ui/Grainient';
import Magnetic from './components/ui/Magnetic';
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

function App() {
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

  return (
    <Router>
      <div className="App">
        <CustomCursor />
        {/* WebGL background — desktop only for performance */}
        {!isTouchDevice && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}>
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
        )}
        {/* CSS gradient fallback for mobile */}
        {isTouchDevice && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none', background: 'linear-gradient(135deg, #FDF4FF 0%, #EDE9FF 40%, #FFF0F5 70%, #FFF8EE 100%)' }} />
        )}
        {/* Navigation */}
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

        {/* Routes wrapped in smooth scroll */}
        <main>
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

        {/* Footer */}
        <footer className="main-footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-brand">
                <h3><Sparkle size={18} /> Rachna</h3>
                <p>Creation · Cosmos · Destiny</p>
                <p className="footer-mission">
                  Empowering people with astrological wisdom through science and logic.
                </p>
              </div>

              <div className="footer-links">
                <h4>Explore</h4>
                <Magnetic strength={10}><Link to="/reading">Tarot Reading</Link></Magnetic>
                <Magnetic strength={10}><Link to="/birth-card">Birth Cards</Link></Magnetic>
                <Magnetic strength={10}><Link to="/learn">Learn Astrology</Link></Magnetic>
              </div>

              <div className="footer-links">
                <h4>Learn</h4>
                <Magnetic strength={10}><Link to="/learn">Why Astrology Works</Link></Magnetic>
                <Magnetic strength={10}><Link to="/learn">Zodiac Signs</Link></Magnetic>
                <Magnetic strength={10}><Link to="/learn">Planets &amp; Houses</Link></Magnetic>
              </div>

              <div className="footer-links">
                <h4>Connect</h4>
                <Magnetic strength={10}><a href="#newsletter">Newsletter</a></Magnetic>
                <Magnetic strength={10}><a href="#about">About Us</a></Magnetic>
                <Magnetic strength={10}><a href="#contact">Contact</a></Magnetic>
              </div>
            </div>

            <div className="footer-bottom">
              <p>© 2026 Rachna. All rights reserved.</p>
              <p className="footer-disclaimer">
                <AlertCircle size={13} />
                For entertainment and self-reflection purposes only
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
