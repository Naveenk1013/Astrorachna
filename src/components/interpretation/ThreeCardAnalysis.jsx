import { analyzeThreeCards } from '../../utils/cardAnalysis';
import { Download, Sparkles, BookOpen, Layers, Sun, RotateCcw, FlaskConical, CheckCircle, Scale, Link2, ThumbsUp, Zap, Compass, AlertTriangle, Check } from 'lucide-react';
import { downloadTarotPDF } from '../../utils/pdfGenerator';
import '../../styles/spreads.css';

const ThreeCardAnalysis = ({ cards, userData }) => {
  if (!cards || cards.length !== 3) {
    return null;
  }
  
  const analysis = analyzeThreeCards(cards);
  
  return (
    <div className="interpretation-panel fade-in">
      {/* Header */}
      <div className="interpretation-header">
        <h2>Your Three-Card Reading Analysis</h2>
        
        {userData && (
          <div style={{ 
            justifyContent: 'center', 
            gap: '1.5rem', 
            marginBottom: '1rem',
            padding: '0.8rem 1.5rem',
            background: 'rgba(108, 99, 255, 0.1)',
            borderRadius: '50px',
            display: 'inline-flex',
            color: 'var(--color-primary-dark)'
          }}>
            <span style={{ fontWeight: '600' }}>Seeker: <span style={{ fontWeight: '400' }}>{userData.firstName}</span></span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span style={{ fontWeight: '600' }}>D.O.B: <span style={{ fontWeight: '400' }}>{userData.dob}</span></span>
          </div>
        )}

        <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>
          {cards[0].name} • {cards[1].name} • {cards[2].name}
        </p>
      </div>
      
      {/* Overall Theme */}
      <div className="analysis-section">
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={18} /> Overall Theme
        </h4>
        <div className="theme-badge">{analysis.overallTheme.primary}</div>
        <p className="meaning-text">{analysis.overallTheme.description}</p>
      </div>
      
      {/* Combined Narrative */}
      <div className="analysis-section">
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={18} /> Your Story
        </h4>
        <p className="meaning-text" style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
          {analysis.combinedMessage}
        </p>
      </div>
      
      {/* Position Interpretations */}
      <div className="analysis-section">
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers size={18} /> Card by Card
        </h4>
        
        {/* Past */}
        <div className="meaning-category">
          <h5 className="meaning-label" style={{ color: '#a78bfa', display: 'flex', alignItems: 'center' }}>
            Past: {analysis.positions.past.card}
            <span style={{ 
              marginLeft: '0.5rem', 
              fontSize: '0.9rem',
              color: analysis.positions.past.orientation === 'reversed' ? '#ff6b6b' : '#51cf66',
              display: 'flex',
              alignItems: 'center'
            }}>
              {analysis.positions.past.orientation === 'upright' ? <Sun size={14} /> : <RotateCcw size={14} />}
            </span>
          </h5>
          <p className="meaning-text">{analysis.positions.past.context}</p>
          <p className="meaning-text" style={{ marginTop: '0.5rem' }}>
            {analysis.positions.past.meaning}
          </p>
        </div>
        
        {/* Present */}
        <div className="meaning-category">
          <h5 className="meaning-label" style={{ color: '#ffd700', display: 'flex', alignItems: 'center' }}>
            Present: {analysis.positions.present.card}
            <span style={{ 
              marginLeft: '0.5rem', 
              fontSize: '0.9rem',
              color: analysis.positions.present.orientation === 'reversed' ? '#ff6b6b' : '#51cf66',
              display: 'flex',
              alignItems: 'center'
            }}>
              {analysis.positions.present.orientation === 'upright' ? <Sun size={14} /> : <RotateCcw size={14} />}
            </span>
          </h5>
          <p className="meaning-text">{analysis.positions.present.context}</p>
          <p className="meaning-text" style={{ marginTop: '0.5rem' }}>
            {analysis.positions.present.meaning}
          </p>
        </div>
        
        {/* Future */}
        <div className="meaning-category">
          <h5 className="meaning-label" style={{ color: '#8b5cf6', display: 'flex', alignItems: 'center' }}>
            Future: {analysis.positions.future.card}
            <span style={{ 
              marginLeft: '0.5rem', 
              fontSize: '0.9rem',
              color: analysis.positions.future.orientation === 'reversed' ? '#ff6b6b' : '#51cf66',
              display: 'flex',
              alignItems: 'center'
            }}>
              {analysis.positions.future.orientation === 'upright' ? <Sun size={14} /> : <RotateCcw size={14} />}
            </span>
          </h5>
          <p className="meaning-text">{analysis.positions.future.context}</p>
          <p className="meaning-text" style={{ marginTop: '0.5rem' }}>
            {analysis.positions.future.meaning}
          </p>
        </div>
      </div>
      
      {/* Elemental Balance */}
      <div className="astrology-panel">
        <h4 className="astrology-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FlaskConical size={18} /> Elemental Balance
        </h4>
        <p className="meaning-text" style={{ marginBottom: '1rem' }}>
          {analysis.elementalBalance.interpretation}
        </p>
        
        <div className="astrology-grid">
          <div className="astrology-item">
            <span className="astrology-label">Dominant Element</span>
            <span className="astrology-value">
              {analysis.elementalBalance.dominantElement || 'Balanced'}
            </span>
          </div>
          
          <div className="astrology-item">
            <span className="astrology-label">Balance Status</span>
            <span className="astrology-value" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {analysis.elementalBalance.balanced ? <><CheckCircle size={14} /> Balanced</> : <><Scale size={14} /> Weighted</>}
            </span>
          </div>
          
          {Object.entries(analysis.elementalBalance.elementCounts).map(([element, count]) => (
            count > 0 && (
              <div className="astrology-item" key={element}>
                <span className="astrology-label">{element}</span>
                <span className="astrology-value">
                  {count} {count === 1 ? 'card' : 'cards'}
                </span>
              </div>
            )
          ))}
        </div>
      </div>
      
      {/* Card Relationships */}
      {analysis.cardRelationships && analysis.cardRelationships.length > 0 && (
        <div className="analysis-section">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Link2 size={18} /> Card Relationships
          </h4>
          {analysis.cardRelationships.map((relationship, index) => (
            <div key={index} className="relationship-item">
              <div className="relationship-type">{relationship.type}</div>
              <p style={{ margin: 0, color: 'var(--color-text-light)' }}>
                {relationship.description}
              </p>
            </div>
          ))}
        </div>
      )}
      
      {/* Supportive Energies */}
      {analysis.elementalBalance.relationships?.supportive?.length > 0 && (
        <div className="analysis-section">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ThumbsUp size={18} /> Supportive Energies
          </h4>
          {analysis.elementalBalance.relationships.supportive.map((support, index) => (
            <p key={index} className="meaning-text" style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Check size={14} /> {support}
            </p>
          ))}
        </div>
      )}
      
      {/* Conflicting Energies */}
      {analysis.elementalBalance.relationships?.conflicting?.length > 0 && (
        <div className="analysis-section">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Zap size={18} /> Tensions to Navigate
          </h4>
          {analysis.elementalBalance.relationships.conflicting.map((conflict, index) => (
            <p key={index} className="meaning-text" style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={14} color="#ff6b6b" /> {conflict}
            </p>
          ))}
        </div>
      )}
      
      {/* Actionable Advice */}
      {analysis.actionableAdvice && analysis.actionableAdvice.length > 0 && (
        <div className="analysis-section">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Compass size={18} /> Actionable Guidance
          </h4>
          <ul className="advice-list">
            {analysis.actionableAdvice.map((advice, index) => (
              <li key={index}>{advice}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Warnings */}
      {analysis.warnings && analysis.warnings.length > 0 && (
        <div className="warning-box">
          <h5 style={{ color: '#ffd700', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={18} /> Important Notes
          </h5>
          {analysis.warnings.map((warning, index) => (
            <p key={index}>{warning}</p>
          ))}
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
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        <AlertTriangle size={16} color="#ffd700" /> For entertainment and self-reflection purposes only. Not intended for making life-altering decisions.
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button 
          className="btn btn-primary" 
          onClick={() => downloadTarotPDF(cards, analysis, userData)}
          style={{ background: 'var(--color-primary)', display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}
        >
          <Download size={18} />
          Download PDF Report
        </button>
      </div>
    </div>
  );
};

export default ThreeCardAnalysis;
