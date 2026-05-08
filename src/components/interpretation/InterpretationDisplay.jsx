import '../../styles/spreads.css';

const InterpretationDisplay = ({ cards }) => {
  if (!cards || cards.length === 0) {
    return null;
  }
  
  const card = cards[0]; // For single card reading
  const orientation = card.orientation || 'upright';
  const meanings = card.meanings?.[orientation];
  
  return (
    <div className="interpretation-panel fade-in">
      <div className="interpretation-header">
        <h3>{card.name}</h3>
        <p style={{ color: orientation === 'reversed' ? '#ff6b6b' : '#51cf66' }}>
          {orientation === 'upright' ? '🔆 Upright' : '🔄 Reversed'}
        </p>
      </div>
      
      <div className="card-meaning">
        {meanings?.general && (
          <div className="meaning-category">
            <h4 className="meaning-label">General Meaning</h4>
            <p className="meaning-text">{meanings.general}</p>
          </div>
        )}
        
        {meanings?.love && (
          <div className="meaning-category">
            <h4 className="meaning-label">Love & Relationships</h4>
            <p className="meaning-text">{meanings.love}</p>
          </div>
        )}
        
        {meanings?.career && (
          <div className="meaning-category">
            <h4 className="meaning-label">Career & Work</h4>
            <p className="meaning-text">{meanings.career}</p>
          </div>
        )}
        
        {meanings?.finances && (
          <div className="meaning-category">
            <h4 className="meaning-label">Finances</h4>
            <p className="meaning-text">{meanings.finances}</p>
          </div>
        )}
        
        {meanings?.keywords && meanings.keywords.length > 0 && (
          <div className="keywords">
            {meanings.keywords.map((keyword, index) => (
              <span key={index} className="keyword-tag">{keyword}</span>
            ))}
          </div>
        )}
      </div>
      
      {/* Astrology Panel */}
      {card.astrology && (
        <div className="astrology-panel">
          <h4 className="astrology-title">✨ Astrological Correspondences</h4>
          <div className="astrology-grid">
            {card.astrology.element && (
              <div className="astrology-item">
                <span className="astrology-label">Element</span>
                <span className="astrology-value">{card.astrology.element}</span>
              </div>
            )}
            
            {card.astrology.primary_planet && (
              <div className="astrology-item">
                <span className="astrology-label">Ruling Planet</span>
                <span className="astrology-value">{card.astrology.primary_planet}</span>
              </div>
            )}
            
            {card.astrology.zodiac_sign && (
              <div className="astrology-item">
                <span className="astrology-label">Zodiac Sign</span>
                <span className="astrology-value">{card.astrology.zodiac_sign}</span>
              </div>
            )}
            
            {card.correspondences?.chakra && (
              <div className="astrology-item">
                <span className="astrology-label">Chakra</span>
                <span className="astrology-value">
                  {Array.isArray(card.correspondences.chakra) 
                    ? card.correspondences.chakra.join(', ') 
                    : card.correspondences.chakra}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Disclaimer */}
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: 'rgba(255, 215, 0, 0.1)',
        borderRadius: '8px',
        fontSize: '0.85rem',
        color: 'var(--color-text-muted)',
        textAlign: 'center'
      }}>
        ⚠️ For entertainment and self-reflection purposes only. Not intended for making life-altering decisions.
      </div>
    </div>
  );
};

export default InterpretationDisplay;
