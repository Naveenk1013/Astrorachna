import { useState } from 'react';
import { Moon, User, Calendar, Download } from 'lucide-react';
import { calculateBirthCards } from '../utils/birthCard';
import { downloadBirthCardPDF } from '../utils/pdfGenerator';
import majorArcanaData from '../data/majorArcana.json';
import TarotCard from '../components/cards/TarotCard';

const BirthCard = () => {
  const [formData, setFormData] = useState({ firstName: '', dob: '' });
  const [birthCards, setBirthCards] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);

  const handleCalculate = () => {
    if (formData.dob && formData.firstName) {
      const year = parseInt(formData.dob.split('-')[0]);
      const currentYear = new Date().getFullYear();
      if (year < 1900 || year > currentYear) {
        alert("Please enter a valid birth year.");
        return;
      }

      const cards = calculateBirthCards(formData.dob);
      setBirthCards(cards);
      setSubmittedData({ ...formData });
    }
  };

  const getCard = (cardId) => {
    return majorArcanaData.cards.find(card => card.id === cardId);
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="container">
      <div className="section">
        <h1 style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Moon size={32} color="var(--color-primary)" />
          Discover Your Birth Cards
        </h1>

        <div className="glass-card" style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
          <p style={{ marginBottom: '1.5rem', lineHeight: '1.7', color: 'var(--color-text-secondary)' }}>
            Your birth cards reveal your soul&apos;s journey, personality traits, and life lessons.
            Enter your details to discover the Tarot cards that resonate with your cosmic blueprint.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--color-bg)', padding: '0 1rem', borderRadius: 'var(--radius-md)', border: '2px solid rgba(108, 99, 255, 0.2)' }}>
              <User size={18} color="var(--color-primary)" />
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                style={{ flex: 1, padding: '0.8rem', border: 'none', background: 'transparent', color: 'var(--color-text)', fontSize: '1rem', outline: 'none' }}
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--color-bg)', padding: '0 1rem', borderRadius: 'var(--radius-md)', border: '2px solid rgba(108, 99, 255, 0.2)' }}>
              <Calendar size={18} color="var(--color-primary)" />
              <input
                type="date"
                min="1900-01-01"
                max={todayStr}
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                style={{ flex: 1, padding: '0.8rem', border: 'none', background: 'transparent', color: 'var(--color-text)', fontSize: '1rem', outline: 'none' }}
              />
            </div>
            
            <button className="btn btn-primary" onClick={handleCalculate} style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
              Calculate
            </button>
          </div>
        </div>

        {birthCards && submittedData && (
          <div className="fade-in">
            <div className="interpretation-panel">
              <div style={{ textAlign: 'center' }}>
                <h2>Your Birth Cards</h2>
                
                <div style={{ 
                  justifyContent: 'center', 
                  gap: '1.5rem', 
                  marginBottom: '2rem',
                  padding: '0.8rem 1.5rem',
                  background: 'rgba(108, 99, 255, 0.1)',
                  borderRadius: '50px',
                  display: 'inline-flex',
                  color: 'var(--color-primary-dark)'
                }}>
                  <span style={{ fontWeight: '600' }}>Seeker: <span style={{ fontWeight: '400' }}>{submittedData.firstName}</span></span>
                  <span style={{ opacity: 0.5 }}>|</span>
                  <span style={{ fontWeight: '600' }}>D.O.B: <span style={{ fontWeight: '400' }}>{submittedData.dob}</span></span>
                </div>
              </div>

              <div className="meaning-category">
                <h4 className="meaning-label">Life Path Number</h4>
                <p className="meaning-text">
                  Your life path number is <strong>{birthCards.lifePathNumber}</strong>
                </p>
              </div>

              <div style={{
                display: 'flex',
                gap: '2rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: '2rem'
              }}>
                {birthCards.personalityCardId !== null && (
                  <div>
                    <h4 style={{
                      textAlign: 'center',
                      color: 'var(--color-primary)',
                      marginBottom: '1rem'
                    }}>
                      Personality Card
                    </h4>
                    <TarotCard card={getCard(birthCards.personalityCardId)} isFlipped={true} />
                  </div>
                )}

                {birthCards.soulCardId !== null && birthCards.soulCardId !== birthCards.personalityCardId && (
                  <div>
                    <h4 style={{
                      textAlign: 'center',
                      color: 'var(--color-primary)',
                      marginBottom: '1rem'
                    }}>
                      Soul Card
                    </h4>
                    <TarotCard card={getCard(birthCards.soulCardId)} isFlipped={true} />
                  </div>
                )}

                {birthCards.yearCardId !== null && (
                  <div>
                    <h4 style={{
                      textAlign: 'center',
                      color: 'var(--color-primary)',
                      marginBottom: '1rem'
                    }}>
                      Year Card
                    </h4>
                    <TarotCard card={getCard(birthCards.yearCardId)} isFlipped={true} />
                  </div>
                )}
              </div>

              <div style={{ marginTop: '2rem' }}>
                <div className="meaning-category">
                  <h4 className="meaning-label">What This Means</h4>
                  <p className="meaning-text">
                    Your <strong>Personality Card</strong> represents your outer self and how you interact with the world.
                    Your <strong>Soul Card</strong> reveals your inner essence and spiritual purpose.
                    Your <strong>Year Card</strong> shows the energy and themes for your current year.
                  </p>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <button 
                  className="btn btn-primary" 
                  onClick={() => downloadBirthCardPDF(birthCards, submittedData, majorArcanaData.cards)}
                  style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}
                >
                  <Download size={18} />
                  Download Birth Card PDF
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthCard;
