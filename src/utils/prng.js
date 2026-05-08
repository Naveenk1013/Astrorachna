/**
 * Generates a numeric hash from a string
 * @param {string} str 
 * @returns {number}
 */
export function xmur3(str) {
  for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = h << 13 | h >>> 19;
  }
  return function() {
    h = Math.imul(h ^ h >>> 16, 2246822507);
    h = Math.imul(h ^ h >>> 13, 3266489909);
    return (h ^= h >>> 16) >>> 0;
  }
}

/**
 * Seeded PRNG (Mulberry32)
 * @param {number} a Seed
 * @returns {function} A function that returns a random number between 0 and 1
 */
export function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

/**
 * Helper to get a random integer between min and max (inclusive) using a PRNG
 */
export function randomInt(prng, min, max) {
  return Math.floor(prng() * (max - min + 1)) + min;
}

/**
 * Deterministically shuffles an array in-place using a PRNG
 */
export function deterministicShuffle(array, prng) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
