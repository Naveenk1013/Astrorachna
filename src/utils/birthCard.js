/**
 * Calculate birth cards based on birthdate
 * Uses numerology to determine personality and soul cards
 */

function reduceToSingleDigit(num) {
  while (num > 22) {
    num = String(num).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return num;
}

export function calculateBirthCards(birthDate) {
  // birthDate should be in format: YYYY-MM-DD
  const [year, month, day] = birthDate.split('-').map(Number);
  
  // Calculate Life Path Number
  const yearSum = String(year).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  const lifePath = reduceToSingleDigit(day + month + yearSum);
  
  // Calculate Personality Card (based on life path)
  const personalityCard = lifePath > 22 ? reduceToSingleDigit(lifePath) : lifePath;
  
  // Calculate Soul Card (further reduction)
  const soulCard = personalityCard > 9 ? reduceToSingleDigit(personalityCard) : personalityCard;
  
  // Calculate Year Card (for current year)
  const currentYear = new Date().getFullYear();
  const currentYearSum = String(currentYear).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  const yearCard = reduceToSingleDigit(day + month + currentYearSum);
  
  // Shadow Card (complement to personality card)
  const shadowCard = 22 - personalityCard;
  
  return {
    lifePathNumber: lifePath,
    personalityCardId: personalityCard,
    soulCardId: soulCard,
    yearCardId: yearCard,
    shadowCardId: shadowCard > 0 ? shadowCard : null
  };
}

/**
 * Get birth card details from deck
 */
export function getBirthCardFromDeck(deck, cardId) {
  return deck.find(card => card.id === cardId);
}
