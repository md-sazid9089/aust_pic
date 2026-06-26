/**
 * Checks if the user's guess (either quick pick index or textual description) matches the puzzle.
 * 
 * @param {Object} puzzle Current puzzle object.
 * @param {string} userGuess Freeform string input by the user.
 * @param {number|null} selectedQuickPick Index (0-3) of the selected quick pick, or null.
 * @returns {boolean} True if the answer is correct, false otherwise.
 */
export function checkGuess(puzzle, userGuess, selectedQuickPick) {
  if (!puzzle) return false;

  // 1. If quick pick is selected, do a strict index comparison
  if (selectedQuickPick !== null && selectedQuickPick !== undefined) {
    return Number(selectedQuickPick) === Number(puzzle.correct_quick_pick);
  }

  // 2. If text guess is provided, check if it contains any of the correct keywords
  if (typeof userGuess === 'string' && userGuess.trim().length > 0) {
    const lowerGuess = userGuess.toLowerCase();
    const keywords = puzzle.correct_keywords || [];
    return keywords.some((keyword) => lowerGuess.includes(keyword.toLowerCase()));
  }

  return false;
}
