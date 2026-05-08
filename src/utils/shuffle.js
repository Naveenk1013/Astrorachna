/**
 * Fisher-Yates Shuffle Algorithm
 * Randomizes the order of an array in place
 */
export function shuffleDeck(deck, includeReversals = true) {
  const shuffled = [...deck];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];

    // Add reversal chance (50%)
    if (includeReversals && Math.random() > 0.5) {
      shuffled[i] = {
        ...shuffled[i],
        orientation: "reversed",
      };
    } else {
      shuffled[i] = {
        ...shuffled[i],
        orientation: "upright",
      };
    }
  }

  return shuffled;
}

/**
 * Draw random cards from deck
 */
export function drawCards(deck, count = 1, includeReversals = true) {
  const shuffled = shuffleDeck(deck, includeReversals);
  return shuffled.slice(0, count);
}

/**
 * Get a single random card
 */
export function drawSingleCard(deck, includeReversals = true) {
  return drawCards(deck, 1, includeReversals)[0];
}

/**
 * Combine Major and Minor Arcana into full deck
 */
export function createFullDeck(majorArcana, minorArcana) {
  return [...majorArcana, ...minorArcana];
}
