import { useState, useEffect } from 'react';
import TarotCard from '../cards/TarotCard';
import { mulberry32, deterministicShuffle } from '../../utils/prng';
import '../../styles/spreads.css';

const ThreeCardChoice = ({ deck, seed, onReadingComplete }) => {
  const [spreadCards, setSpreadCards] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState([]);
  
  // Shuffle and pick 10 cards to display (visually random)
  const initializeSpread = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    const cards = shuffled.slice(0, 10).map((card, idx) => ({
      ...card,
      id: `random-${idx}`,
      orientation: Math.random() > 0.5 ? 'upright' : 'reversed'
    }));
    setSpreadCards(cards);
    setSelectedIndices([]);
    setRevealedIndices([]);
    setIsRevealing(false);
  };
  
  // Initialize spread when deck loads
  useEffect(() => {
    if (deck && deck.length > 0 && spreadCards.length === 0) {
      initializeSpread();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck, spreadCards.length]);

  const getDestinyCards = () => {
    if (!seed || !deck) return null;
    const prng = mulberry32(seed);
    const deterministicDeck = deterministicShuffle([...deck], prng);
    
    // Pick the 3 deterministic cards for this user today
    return deterministicDeck.slice(0, 3).map((card, idx) => ({
      ...card,
      id: `destiny-${idx}`,
      orientation: prng() > 0.5 ? 'upright' : 'reversed'
    }));
  };
  
  const handleCardClick = (index) => {
    // Ignore clicks if already revealing or card already selected
    if (isRevealing || selectedIndices.includes(index)) return;
    
    // Ignore if already selected 3 cards
    if (selectedIndices.length >= 3) return;
    
    const newSelected = [...selectedIndices, index];
    setSelectedIndices(newSelected);
    
    // If 3 cards selected, start reveal after short delay
    if (newSelected.length === 3) {
      // THE ILLUSION OF CHOICE: Override the 3 slots with their deterministic Destiny Cards
      if (seed) {
        const destinyCards = getDestinyCards();
        if (destinyCards) {
          setSpreadCards(prev => {
            const updated = [...prev];
            updated[newSelected[0]] = destinyCards[0];
            updated[newSelected[1]] = destinyCards[1];
            updated[newSelected[2]] = destinyCards[2];
            return updated;
          });
        }
      }

      setTimeout(() => {
        setIsRevealing(true);
        revealCardsSequentially(newSelected);
      }, 500);
    }
  };
  
  const revealCardsSequentially = (indices) => {
    indices.forEach((cardIndex, i) => {
      setTimeout(() => {
        setRevealedIndices(prev => [...prev, cardIndex]);
        
        // After last card revealed, trigger completion
        if (i === 2) {
          setTimeout(() => {
            // Need to grab the actual cards from the state since we mutated them
            setSpreadCards(currentSpread => {
              const selectedCards = indices.map(idx => currentSpread[idx]);
              onReadingComplete && onReadingComplete(selectedCards);
              return currentSpread;
            });
          }, 800);
        }
      }, i * 600);
    });
  };
  
  const handleReset = () => {
    setSpreadCards([]);
    setSelectedIndices([]);
    setRevealedIndices([]);
    setIsRevealing(false);
  };
  
  const getSelectionNumber = (index) => {
    const position = selectedIndices.indexOf(index);
    return position !== -1 ? position + 1 : null;
  };
  
  return (
    <div className="reading-container">
      <div className="reading-header">
        <h2>Choose Your Three Cards</h2>
        <p>Trust your intuition and select 3 cards that call to you</p>
      </div>
      
      {/* Selection Counter */}
      <div className="selection-counter">
        {isRevealing ? (
          <span className="revealing-text">✨ Revealing your destiny...</span>
        ) : (
          <span>Selected: <strong>{selectedIndices.length}</strong> / 3</span>
        )}
      </div>
      
      {/* Card Grid */}
      <div className="card-grid">
        {spreadCards.map((card, index) => {
          const isSelected = selectedIndices.includes(index);
          const isRevealed = revealedIndices.includes(index);
          const selectionNum = getSelectionNumber(index);
          const isDisabled = selectedIndices.length >= 3 && !isSelected;
          
          return (
            <div 
              key={card.id}
              className={`card-slot ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              <TarotCard 
                card={card}
                isFlipped={isRevealed}
                size="normal"
              />
              {isSelected && !isRevealing && (
                <div className="selection-badge">{selectionNum}</div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Position Labels during reveal */}
      {isRevealing && revealedIndices.length > 0 && (
        <div className="revealed-cards-section">
          <h3>Your Chosen Path</h3>
          <div className="revealed-cards-row">
            {selectedIndices.map((cardIndex, i) => (
              <div key={cardIndex} className="revealed-card-position">
                <TarotCard 
                  card={spreadCards[cardIndex]}
                  isFlipped={revealedIndices.includes(cardIndex)}
                  size="large"
                />
                <span className="position-label">
                  {['Past', 'Present', 'Future'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Reset Button */}
      {selectedIndices.length > 0 && !isRevealing && (
        <button className="btn btn-secondary reset-btn" onClick={handleReset}>
          Start Over
        </button>
      )}
    </div>
  );
};

export default ThreeCardChoice;
