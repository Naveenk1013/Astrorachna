import LogoLoop from '../ui/LogoLoop';

// Planetary symbols (Unicode astrological characters — not emoji)
const planets = [
  { node: <span className="planet-icon">☉</span>, title: "Sun" },
  { node: <span className="planet-icon">☽</span>, title: "Moon" },
  { node: <span className="planet-icon">☿</span>, title: "Mercury" },
  { node: <span className="planet-icon">♀</span>, title: "Venus" },
  { node: <span className="planet-icon">♂</span>, title: "Mars" },
  { node: <span className="planet-icon">♃</span>, title: "Jupiter" },
  { node: <span className="planet-icon">♄</span>, title: "Saturn" },
  { node: <span className="planet-icon">⛢</span>, title: "Uranus" },
  { node: <span className="planet-icon">♆</span>, title: "Neptune" },
  { node: <span className="planet-icon">♇</span>, title: "Pluto" },
];

const ZodiacLogoLoop = () => {
  return (
    <section className="zodiac-loop-section">
      <div className="container">
        <div className="zodiac-loop-header">
          <span className="section-badge">The Cosmic Wheel</span>
          <h2 className="section-title">12 Zodiac Constellations</h2>
          <p className="zodiac-subtitle">
            Hover over each sign to discover its cosmic energy
          </p>
        </div>
      </div>

      {/* Planets Loop */}
      <div className="planets-loop-container">
        <LogoLoop
          logos={planets}
          speed={50}
          direction="left"
          logoHeight={60}
          gap={70}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#FEFAF5"
          ariaLabel="Planetary symbols"
        />
      </div>

      <div className="container">
        <div className="zodiac-legend">
          <div className="legend-item">
            <span className="legend-color fire"></span>
            <span>Fire Signs (Aries, Leo, Sagittarius)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color earth"></span>
            <span>Earth Signs (Taurus, Virgo, Capricorn)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color air"></span>
            <span>Air Signs (Gemini, Libra, Aquarius)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color water"></span>
            <span>Water Signs (Cancer, Scorpio, Pisces)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZodiacLogoLoop;
