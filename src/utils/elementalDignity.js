/**
 * Calculate Elemental Dignity between cards
 * Analyzes the balance and relationships between elements
 */

export function calculateElementalDignity(cards) {
  const elementCounts = {
    Fire: 0,
    Water: 0,
    Air: 0,
    Earth: 0
  };
  
  // Count elements
  cards.forEach(card => {
    const element = card.astrology?.element;
    if (element && elementCounts[element] !== undefined) {
      elementCounts[element]++;
    }
  });
  
  // Calculate relationships
  const relationships = {
    supportive: [],
    conflicting: [],
    neutral: []
  };
  
  // Fire supports Air, conflicts with Water
  if (elementCounts.Fire > 0) {
    if (elementCounts.Air > 0) {
      relationships.supportive.push("Fire energizes Air");
    }
    if (elementCounts.Water > 0) {
      relationships.conflicting.push("Fire vs Water tension");
    }
  }
  
  // Water supports Earth, conflicts with Fire
  if (elementCounts.Water > 0) {
    if (elementCounts.Earth > 0) {
      relationships.supportive.push("Water nourishes Earth");
    }
    if (elementCounts.Fire > 0 && !relationships.conflicting.includes("Fire vs Water tension")) {
      relationships.conflicting.push("Water vs Fire tension");
    }
  }
  
  // Air supports Fire, conflicts with Earth
  if (elementCounts.Air > 0) {
    if (elementCounts.Fire > 0 && !relationships.supportive.includes("Fire energizes Air")) {
      relationships.supportive.push("Air fuels Fire");
    }
    if (elementCounts.Earth > 0) {
      relationships.conflicting.push("Air vs Earth disconnect");
    }
  }
  
  // Earth supports Water, conflicts with Air
  if (elementCounts.Earth > 0) {
    if (elementCounts.Water > 0 && !relationships.supportive.includes("Water nourishes Earth")) {
      relationships.supportive.push("Earth grounds Water");
    }
  }
  
  // Calculate balance
  const total = Object.values(elementCounts).reduce((a, b) => a + b, 0);
  const maxCount = Math.max(...Object.values(elementCounts));
  const balanced = total > 0 ? (maxCount / total) < 0.5 : true;
  
  // Find dominant element
  const dominantElement = Object.entries(elementCounts)
    .reduce((max, [element, count]) => count > max.count ? { element, count } : max, 
      { element: null, count: 0 });
  
  return {
    elementCounts,
    relationships,
    balanced,
    dominantElement: dominantElement.element,
    interpretation: generateElementalInterpretation(elementCounts, balanced, dominantElement.element)
  };
}

function generateElementalInterpretation(counts, balanced, dominant) {
  if (balanced) {
    return "Your reading shows elemental balance, suggesting harmony across different life areas.";
  }
  
  const interpretations = {
    Fire: "Fire dominance indicates passion, action, and dynamic energy in your situation.",
    Water: "Water dominance suggests deep emotions, intuition, and flowing circumstances.",
    Air: "Air dominance points to mental activity, communication, and intellectual pursuits.",
    Earth: "Earth dominance reveals practical matters, material concerns, and grounded energy."
  };
  
  return interpretations[dominant] || "Elements are neutrally distributed.";
}
