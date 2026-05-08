import { Link } from 'react-router-dom';
import { FlaskConical, Star, Globe2, BookOpen, BarChart3, Layers, Moon } from 'lucide-react';

const LearnHub = () => {
  const topics = [
    {
      icon: <FlaskConical size={22} />,
      title: 'Why Astrology Works',
      description: 'The scientific perspective on celestial influences and human behavior.',
      link: '/learn/science',
      color: '#8b5cf6'
    },
    {
      icon: <Star size={22} />,
      title: 'The 12 Zodiac Signs',
      description: 'Deep dive into each sun sign — personality, elements, and compatibility.',
      link: '/learn/zodiac',
      color: '#F59E0B'
    },
    {
      icon: <Globe2 size={22} />,
      title: 'Planets & Influences',
      description: 'How each planet shapes different aspects of your personality and life.',
      link: '/learn/planets',
      color: '#FF6B6B'
    },
    {
      icon: <BookOpen size={22} />,
      title: 'The 12 Houses',
      description: 'Understanding life areas governed by each astrological house.',
      link: '/learn/houses',
      color: '#51cf66'
    },
    {
      icon: <BarChart3 size={22} />,
      title: 'Birth Chart Basics',
      description: 'Learn to read and interpret your natal chart step by step.',
      link: '/learn/birth-chart',
      color: '#4dabf7'
    },
    {
      icon: <Layers size={22} />,
      title: 'Tarot Fundamentals',
      description: 'Master the 78 cards — Major Arcana, Minor Arcana, and spreads.',
      link: '/learn/tarot',
      color: '#a78bfa'
    }
  ];

  return (
    <div className="learn-hub-page">
      <section className="learn-hero">
        <div className="container">
          <span className="section-badge">Learning Center</span>
          <h1>Master Astrology &amp; Tarot</h1>
          <p className="hero-subtitle">
            From beginner basics to advanced techniques — science-backed explanations
            that help you understand <em>why</em> astrology works, not just what it says.
          </p>
        </div>
      </section>

      <section className="learn-grid-section">
        <div className="container">
          <div className="learn-topics-grid">
            {topics.map((topic, index) => (
              <Link
                to={topic.link}
                key={index}
                className="learn-topic-card"
                style={{ '--accent-color': topic.color }}
              >
                <div className="topic-icon" style={{ color: topic.color, background: `${topic.color}18` }}>
                  {topic.icon}
                </div>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
                <span className="topic-cta">
                  Start Learning <span className="arrow">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="science-preview">
        <div className="container">
          <div className="science-card">
            <div className="science-content">
              <h2><FlaskConical size={26} /> The Science Behind Astrology</h2>
              <p>
                For thousands of years, humans observed patterns between celestial events
                and earthly phenomena. Modern research in <strong>chronobiology</strong> and
                <strong> circadian rhythms</strong> reveals measurable connections between
                cosmic cycles and human biology.
              </p>
              <ul className="science-points">
                <li>✓ Lunar cycles affect human sleep patterns and behavior</li>
                <li>✓ Solar activity correlates with psychological trends</li>
                <li>✓ Seasonal birth patterns influence personality traits</li>
                <li>✓ Gravitational forces impact biological systems</li>
              </ul>
              <Link to="/learn/science" className="btn btn-primary">
                Explore The Science →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="quick-start">
        <div className="container">
          <h2>Quick Start Guides</h2>
          <div className="quick-start-grid">
            <div className="quick-card">
              <h4><Star size={18} /> Your First Reading</h4>
              <p>New to tarot? Start with our guided 3-card reading.</p>
              <Link to="/reading" className="btn btn-secondary">Try Now</Link>
            </div>
            <div className="quick-card">
              <h4><Moon size={18} /> Find Your Birth Cards</h4>
              <p>Discover the cards connected to your birth date.</p>
              <Link to="/birth-card" className="btn btn-secondary">Calculate</Link>
            </div>
            <div className="quick-card">
              <h4>♈ Know Your Sign</h4>
              <p>Deep dive into your zodiac sign&apos;s traits and tendencies.</p>
              <Link to="/learn/zodiac" className="btn btn-secondary">Explore</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearnHub;
