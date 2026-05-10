import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Sparkle, Sparkles, AlertCircle, BookOpen, Moon, Mail, MessageCircle, Link as LinkIcon, Video } from 'lucide-react';
import CustomCursor from './components/ui/CustomCursor';
import SmoothScroller from './components/layout/SmoothScroller';
import PillNav from './components/ui/PillNav';
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
    { to: '/', label: 'Home', icon: <Sparkle size={18} /> },
    { to: '/about', label: 'About', icon: <AlertCircle size={18} /> },
    { to: '/learn', label: 'Learn Astrology', icon: <BookOpen size={18} /> },
    { to: '/reading', label: 'Tarot Reading', icon: <Sparkles size={18} /> },
    { to: '/birth-card', label: 'Birth Cards', icon: <Moon size={18} /> },
  ];

  const showFooter = location.pathname !== '/about';

  return (
    <div className="App" style={{ position: 'relative', minHeight: '100vh' }}>
      <CustomCursor />
      {/* WebGL background */}
      <div className="global-bg-wrapper" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Grainient
          color1="#FF9FFC"
          color2="#5227FF"
          color3="#B497CF"
          timeSpeed={1.25}
          zoom={0.9}
        />
      </div>
      <PillNav
        logo={<Sparkle size={24} color="#6C63FF" />}
        logoAlt="Rachna Logo"
        items={navLinks.map(link => ({ label: link.label, href: link.to }))}
        activeHref={location.pathname}
        baseColor="#FEFAF5"
        pillColor="#6C63FF"
        pillTextColor="#FEFAF5"
        hoveredPillTextColor="#6C63FF"
        ease="power4.out"
        initialLoadAnimation={true}
      />

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
