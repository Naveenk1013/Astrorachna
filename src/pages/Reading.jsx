import { useState } from 'react';
import { Sparkles, ArrowRight, User, Calendar } from 'lucide-react';
import ThreeCardChoice from '../components/spreads/ThreeCardChoice';
import ThreeCardAnalysis from '../components/interpretation/ThreeCardAnalysis';
import majorArcanaData from '../data/majorArcana.json';
import minorArcanaData from '../data/minorArcana.json';
import { xmur3 } from '../utils/prng';
import '../styles/landing.css'; // For button and form styles

const Reading = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [userSeed, setUserSeed] = useState(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    dob: ''
  });

  // Combine all cards
  const fullDeck = [...majorArcanaData.cards, ...minorArcanaData.cards];

  const handleStartReading = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.dob) return;

    // Validate DOB year
    const year = parseInt(formData.dob.split('-')[0]);
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
      alert("Please enter a valid birth year.");
      return;
    }
    
    // Create deterministic seed based on Name, DOB, and current local date
    // This ensures the reading changes daily, but is fixed for the current day
    const dateStr = new Date().toLocaleDateString();
    const seedString = `${formData.firstName.toLowerCase().trim()}-${formData.dob}-${dateStr}`;
    
    // Generate numeric seed
    const seedGenerator = xmur3(seedString);
    const seed = seedGenerator();
    
    setUserSeed(seed);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadingComplete = (cards) => {
    setSelectedCards(cards);
  };

  const resetReading = () => {
    setSelectedCards([]);
    setUserSeed(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="container" style={{ minHeight: '80vh', paddingTop: '4rem' }}>
      {!userSeed ? (
        <div className="pre-reading-form" style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Your Destiny Awaits</h2>
          <p className="hero-description" style={{ fontSize: '1.2rem', marginBottom: '2.5rem' }}>
            To align the cards with your unique cosmic signature, please provide your details.
          </p>
          
          <form onSubmit={handleStartReading} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(255,255,255,0.4)', padding: '2.5rem', borderRadius: '16px', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 8px 32px rgba(45,31,61,0.08)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
              <label htmlFor="firstName" style={{ fontSize: '0.9rem', fontWeight: '600', color: '#000', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={16} /> First Name
              </label>
              <input 
                type="text" 
                id="firstName"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                placeholder="e.g. Athena"
                style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid rgba(108,99,255,0.2)', background: 'rgba(255,255,255,0.8)', fontSize: '1rem', outline: 'none', transition: 'border 0.2s' }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
              <label htmlFor="dob" style={{ fontSize: '0.9rem', fontWeight: '600', color: '#000', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={16} /> Date of Birth
              </label>
              <input 
                type="date" 
                id="dob"
                required
                min="1900-01-01"
                max={todayStr}
                value={formData.dob}
                onChange={(e) => setFormData({...formData, dob: e.target.value})}
                style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid rgba(108,99,255,0.2)', background: 'rgba(255,255,255,0.8)', fontSize: '1rem', outline: 'none', transition: 'border 0.2s' }}
              />
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
              Shuffle Deck <ArrowRight size={18} />
            </button>
          </form>
        </div>
      ) : selectedCards.length === 0 ? (
        <ThreeCardChoice
          deck={fullDeck}
          seed={userSeed}
          onReadingComplete={handleReadingComplete}
        />
      ) : (
        <>
          <ThreeCardAnalysis cards={selectedCards} userData={formData} />

          <div style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '3rem' }}>
            <button className="btn btn-secondary" onClick={resetReading} style={{ background: 'rgba(255,255,255,0.5)' }}>
              <Sparkles size={16} />
              New Reading
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Reading;
