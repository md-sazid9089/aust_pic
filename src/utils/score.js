const LOCAL_STORAGE_KEY = 'spotTheBugScore';

/**
 * Loads score object from localStorage, falling back to a default.
 * @returns {Object} Score object with correct, total, and streak metrics.
 */
export function loadScore() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (
        typeof parsed.correct === 'number' &&
        typeof parsed.total === 'number' &&
        typeof parsed.streak === 'number'
      ) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load score from localStorage:', err);
  }
  return { correct: 0, total: 0, streak: 0 };
}

/**
 * Saves the current score object to localStorage.
 * @param {Object} score Score state.
 */
export function saveScore(score) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(score));
  } catch (err) {
    console.error('Failed to save score to localStorage:', err);
  }
}

/**
 * Clears score key from localStorage.
 */
export function resetScore() {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear score in localStorage:', err);
  }
}
