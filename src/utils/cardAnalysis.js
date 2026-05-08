import { calculateElementalDignity } from './elementalDignity';

/**
 * Analyze three cards together for combined interpretation
 */
export function analyzeThreeCards(cards) {
  if (!cards || cards.length !== 3) {
    return null;
  }

  const elementalAnalysis = calculateElementalDignity(cards);
  
  return {
    overallTheme: determineTheme(cards),
    elementalBalance: elementalAnalysis,
    cardRelationships: findCardRelationships(cards),
    positions: {
      past: interpretPosition(cards[0], 'past'),
      present: interpretPosition(cards[1], 'present'),
      future: interpretPosition(cards[2], 'future')
    },
    combinedMessage: generateCombinedNarrative(cards, elementalAnalysis),
    actionableAdvice: extractActionableAdvice(cards),
    warnings: extractWarnings(cards)
  };
}

/**
 * Determine the overall theme based on card types and meanings
 */
function determineTheme(cards) {
  const themes = {
    love: 0,
    career: 0,
    spiritual: 0,
    material: 0,
    challenge: 0
  };
  
  cards.forEach(card => {
    // Check suits for Minor Arcana
    if (card.suit) {
      switch (card.suit) {
        case 'Cups':
          themes.love += 2;
          themes.spiritual += 1;
          break;
        case 'Pentacles':
          themes.material += 2;
          themes.career += 1;
          break;
        case 'Wands':
          themes.career += 2;
          themes.spiritual += 1;
          break;
        case 'Swords':
          themes.challenge += 2;
          themes.career += 1;
          break;
      }
    }
    
    // Check for reversed cards (indicates challenges)
    if (card.orientation === 'reversed') {
      themes.challenge += 1;
    }
  });
  
  // Find dominant theme
  const dominantTheme = Object.entries(themes)
    .reduce((max, [theme, score]) => score > max.score ? { theme, score } : max, 
      { theme: 'general', score: 0 });
  
  return {
    primary: dominantTheme.theme,
    description: getThemeDescription(dominantTheme.theme),
    scores: themes
  };
}

function getThemeDescription(theme) {
  const descriptions = {
    love: 'Your reading focuses on matters of the heart, relationships, and emotional connections.',
    career: 'The cards speak to your professional path, ambitions, and material pursuits.',
    spiritual: 'This reading illuminates your spiritual journey and personal growth.',
    material: 'Financial matters and material stability are highlighted in your reading.',
    challenge: 'The cards indicate challenges to overcome and lessons to learn.',
    general: 'Your reading touches on various aspects of life and overall life direction.'
  };
  
  return descriptions[theme] || descriptions.general;
}

/**
 * Find relationships between the three cards
 */
function findCardRelationships(cards) {
  const relationships = [];
  
  // Check for same suits (strong connection)
  const suits = cards.filter(c => c.suit).map(c => c.suit);
  const uniqueSuits = [...new Set(suits)];
  if (suits.length === 3 && uniqueSuits.length === 1) {
    relationships.push({
      type: 'harmony',
      description: `All cards are from the suit of ${suits[0]}, indicating a strong, focused energy in this area.`
    });
  }
  
  // Check for all Major Arcana (significant spiritual message)
  const allMajor = cards.every(c => c.arcana === 'Major');
  if (allMajor) {
    relationships.push({
      type: 'significant',
      description: 'All Major Arcana cards suggest this reading carries significant spiritual weight and life-changing potential.'
    });
  }
  
  // Check for reversed cards
  const reversedCount = cards.filter(c => c.orientation === 'reversed').length;
  if (reversedCount === 3) {
    relationships.push({
      type: 'challenge',
      description: 'All cards are reversed, suggesting internal blocks or resistance that needs to be addressed.'
    });
  } else if (reversedCount === 2) {
    relationships.push({
      type: 'mixed',
      description: 'Two reversed cards indicate some obstacles, but there is hope and positive energy present.'
    });
  }
  
  // Check for numerical progression (in Minor Arcana)
  const numbers = cards.filter(c => c.number && !isNaN(c.number)).map(c => parseInt(c.number));
  if (numbers.length === 3) {
    const isSequential = numbers.every((num, idx) => idx === 0 || num === numbers[idx - 1] + 1);
    if (isSequential) {
      relationships.push({
        type: 'progression',
        description: 'Your cards form a numerical sequence, suggesting a natural progression or journey.'
      });
    }
  }
  
  return relationships.length > 0 ? relationships : [{
    type: 'diverse',
    description: 'The cards show diverse energies working together in your life.'
  }];
}

/**
 * Interpret card in its position (Past, Present, Future)
 */
function interpretPosition(card, position) {
  const orientation = card.orientation || 'upright';
  const meanings = card.meanings?.[orientation];
  
  const positionContext = {
    past: {
      prefix: 'In the past',
      context: 'This card represents influences and events that have shaped your current situation.'
    },
    present: {
      prefix: 'Currently',
      context: 'This card reflects your present circumstances and immediate energies.'
    },
    future: {
      prefix: 'Looking ahead',
      context: 'This card suggests the likely outcome or direction based on your current path.'
    }
  };
  
  return {
    card: card.name,
    orientation,
    position: position,
    meaning: meanings?.general || 'No meaning available',
    context: positionContext[position]?.context || ''
  };
}

/**
 * Generate combined narrative from all three cards
 */
function generateCombinedNarrative(cards, elementalAnalysis) {
  const narrativeParts = [];
  
  // Opening based on elemental balance
  if (elementalAnalysis.balanced) {
    narrativeParts.push('Your reading shows balanced energies, suggesting harmony across different areas of your life.');
  } else if (elementalAnalysis.dominantElement) {
    const elementMeanings = {
      Fire: 'passion and action are driving forces',
      Water: 'emotions and intuition guide your path',
      Air: 'thoughts and communication shape your journey',
      Earth: 'practical matters and material concerns are central'
    };
    narrativeParts.push(
      `With ${elementalAnalysis.dominantElement} as the dominant element, ${elementMeanings[elementalAnalysis.dominantElement]}.`
    );
  }
  
  // Add story arc
  const story = `The journey begins with ${cards[0].name}, moves through ${cards[1].name}, and leads toward ${cards[2].name}.`;
  narrativeParts.push(story);
  
  // Add elemental relationships
  if (elementalAnalysis.relationships?.supportive?.length > 0) {
    narrativeParts.push(`The cards work in harmony: ${elementalAnalysis.relationships.supportive.join(', ')}.`);
  }
  
  if (elementalAnalysis.relationships?.conflicting?.length > 0) {
    narrativeParts.push(`Be aware of some tension: ${elementalAnalysis.relationships.conflicting.join(', ')}.`);
  }
  
  return narrativeParts.join(' ');
}

/**
 * Extract actionable advice from the three cards
 */
function extractActionableAdvice(cards) {
  const advice = [];
  
  cards.forEach((card, index) => {
    const _position = ['past', 'present', 'future'][index]; // Used for context
    const orientation = card.orientation || 'upright';
    
    if (orientation === 'upright' && index === 2) {
      // Future card upright - emphasize positive action
      advice.push(`Embrace the energy of ${card.name} by taking inspired action toward your goals.`);
    } else if (orientation === 'reversed' && index === 1) {
      // Present card reversed - address blocks
      advice.push(`Address the reversed energy of ${card.name} by examining what's holding you back right now.`);
    }
  });
  
  // Add elemental advice
  const elements = cards.map(c => c.astrology?.element).filter(Boolean);
  if (elements.includes('Fire') && elements.includes('Water')) {
    advice.push('Balance your passionate drive with emotional awareness.');
  }
  if (elements.includes('Air') && elements.includes('Earth')) {
    advice.push('Ground your ideas in practical action.');
  }
  
  return advice.length > 0 ? advice : [
    'Reflect on how these three cards interact in your life.',
    'Consider journaling about the connections you see between past, present, and future.'
  ];
}

/**
 * Extract warnings from reversed or challenging cards
 */
function extractWarnings(cards) {
  const warnings = [];
  
  const reversedCards = cards.filter(c => c.orientation === 'reversed');
  if (reversedCards.length >= 2) {
    warnings.push('Multiple reversed cards suggest resistance or blocks that need attention.');
  }
  
  // Check for specific challenging cards
  const challengingCards = ['The Tower', 'Five of Cups', 'Ten of Swords', 'Five of Pentacles'];
  const hasChallenge = cards.some(c => challengingCards.includes(c.name));
  
  if (hasChallenge) {
    warnings.push('Some cards indicate challenges ahead. Remember, challenges are opportunities for growth.');
  }
  
  return warnings;
}

/**
 * Get a short summary for quick reference
 */
export function getReadingSummary(analysis) {
  if (!analysis) return '';
  
  return `Theme: ${analysis.overallTheme.primary.toUpperCase()} | Element: ${analysis.elementalBalance.dominantElement || 'Balanced'} | Overall: ${analysis.combinedMessage.substring(0, 100)}...`;
}
