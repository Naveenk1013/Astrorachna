import { useState } from 'react';
import TarotCard from '../cards/TarotCard';
import '../../styles/spreads.css';

const SingleCardSpread = ({ deck, onReadingComplete }) => {
  const [drawnCard, setDrawnCard] = useState(null);
  
  const drawCard = () => {
    if (deck && deck.length > 0) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const card = {
        ...deck[randomIndex],
        orientation: Math.random() > 0.5 ? 'upright' : 'reversed'
      };
      setDrawnCard(card);
    }
  };
  
  const handleCardFlip = () => {
    if (drawnCard && onReadingComplete) {
      onReadingComplete([drawnCard]);
    }
  };
  
  return (
    <div className="spread-container">
      <h2 className="spread-title">Single Card Reading</h2>
      
      {!drawnCard ? (
        <button className="btn" onClick={drawCard}>
          Draw Your Card
        </button>
      ) : (
        <div className="single-card-spread">
          <TarotCard card={drawnCard} onFlip={handleCardFlip} />
        </div>
      )}
      
      {drawnCard && (
        <button 
          className="btn btn-secondary" 
          onClick={drawCard}
          style={{ marginTop: '2rem' }}
        >
          Draw Another Card
        </button>
      )}
    </div>
  );
};

export default SingleCardSpread;
