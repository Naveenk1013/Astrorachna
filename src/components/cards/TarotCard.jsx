import { Flame, Droplets, Wind, Mountain, Star, Wand2, Moon, Crown, Sword, BookOpen, Sparkles } from 'lucide-react';
import '../../styles/cards.css';
import EvilEye from '../ui/EvilEye';

const TarotCard = ({ card, isFlipped = false, onClick, size = 'normal' }) => {
  const orientation = card?.orientation || 'upright';
  const isReversed = orientation === 'reversed';
  
  // Size classes
  const sizeClasses = {
    small: 'tarot-card-small',
    normal: 'tarot-card-normal',
    large: 'tarot-card-large'
  };
  
  return (
    <div 
      className={`tarot-card ${sizeClasses[size]} ${isFlipped ? 'flipped' : ''}`}
      onClick={onClick}
    >
      <div className={`tarot-card-inner ${isReversed && isFlipped ? 'reversed' : ''}`}>
        {/* Card Back - Evil Eye tracking cursor! */}
        <div className="tarot-card-back">
          <EvilEye
            eyeColor="#021c9e"
            intensity={1.5}
            pupilSize={0.6}
            irisWidth={0.25}
            glowIntensity={0.35}
            scale={1.2}
            noiseScale={1.2}
            pupilFollow={1.2}
            flameSpeed={0.8}
            backgroundColor="#EDE9FF"
          />
        </div>
        
        {/* Card Face - Only visible when flipped */}
        <div className="tarot-card-face">
          <div className="card-content">
            {card?.arcana === 'Major' && (
              <div className="card-number">{card?.number}</div>
            )}
            
            <div className="card-image-wrapper">
              <div 
                className="card-image-placeholder"
                style={{ background: getCardGradient(card) }}
              >
                {getCardIcon(card)}
              </div>
            </div>
            
            {card?.suit && (
              <div className="card-suit">{card.suit}</div>
            )}
            
            <div className="card-name">{card?.name || 'Unknown'}</div>
            
            {isReversed && (
              <div className="reversed-indicator">Reversed</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get card gradient based on element
function getCardGradient(card) {
  const element = card?.astrology?.element;
  const gradients = {
    Fire: 'linear-gradient(135deg, #ff6b6b 0%, #ffa502 100%)',
    Water: 'linear-gradient(135deg, #4dabf7 0%, #74b9ff 100%)',
    Air: 'linear-gradient(135deg, #ffd700 0%, #f9ca24 100%)',
    Earth: 'linear-gradient(135deg, #51cf66 0%, #7bed9f 100%)'
  };
  return gradients[element] || 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)';
}

// Helper function to get Lucide icon representation
function getCardIcon(card) {
  if (card?.arcana === 'Major') {
    switch (card.name) {
      case 'The Fool': return <Star size={32} color="#ffffff" />;
      case 'The Magician': return <Wand2 size={32} color="#ffffff" />;
      case 'The High Priestess': return <Moon size={32} color="#ffffff" />;
      case 'The Empress': return <Crown size={32} color="#ffffff" />;
      case 'The Emperor': return <Sword size={32} color="#ffffff" />;
      case 'The Hierophant': return <BookOpen size={32} color="#ffffff" />;
      default: return <Sparkles size={32} color="#ffffff" />;
    }
  }
  
  if (card?.suit) {
    switch (card.suit) {
      case 'Wands': return <Flame size={32} color="#ffffff" />;
      case 'Cups': return <Droplets size={32} color="#ffffff" />;
      case 'Swords': return <Wind size={32} color="#ffffff" />;
      case 'Pentacles': return <Mountain size={32} color="#ffffff" />;
      default: return <Sparkles size={32} color="#ffffff" />;
    }
  }
  
  return <Sparkles size={32} color="#ffffff" />;
}

export default TarotCard;
