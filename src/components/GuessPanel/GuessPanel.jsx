import React from 'react';
import { motion } from 'framer-motion';
import './GuessPanel.css';

export default function GuessPanel({
  puzzle,
  userGuess,
  selectedQuickPick,
  onGuessChange,
  onQuickPickSelect,
  onSubmit,
  guessSubmitted
}) {
  if (!puzzle) return null;

  const isTextDisabled = selectedQuickPick !== null || guessSubmitted;
  const isSubmitDisabled = guessSubmitted || (!userGuess.trim() && selectedQuickPick === null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isSubmitDisabled) {
        onSubmit();
      }
    }
  };

  const quickPickContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } }
  };

  const quickPickItem = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="guess-panel-card">
      <h3 className="guess-panel-title">What do you think is wrong?</h3>

      {/* Quick Picks Segment */}
      <div className="quick-picks-section">
        <span className="quick-picks-label">Quick picks</span>
        <motion.div
          className="quick-picks-grid"
          variants={quickPickContainer}
          initial="hidden"
          animate="show"
        >
          {puzzle.quick_picks.map((pick, index) => {
            const isSelected = selectedQuickPick === index;
            return (
              <motion.button
                key={pick}
                type="button"
                className={`quick-pick-btn ${isSelected ? 'quick-pick-selected' : ''}`}
                onClick={() => onQuickPickSelect(index)}
                disabled={guessSubmitted}
                variants={quickPickItem}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {pick}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Visual text separator */}
      <div className="guess-separator">
        <div className="separator-line"></div>
        <span className="separator-text">or type your answer</span>
        <div className="separator-line"></div>
      </div>

      {/* Free-form typed entry */}
      <textarea
        className="guess-textarea"
        rows={3}
        value={userGuess}
        onChange={(e) => onGuessChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          selectedQuickPick !== null
            ? "Clear your quick pick selection to type an answer..."
            : "Describe what you think the bug is..."
        }
        disabled={isTextDisabled}
      />

      {/* Submission action triggers */}
      <div className="guess-submit-wrapper">
        <motion.button
          type="button"
          id="submit-guess-btn"
          className="guess-submit-btn"
          onClick={onSubmit}
          disabled={isSubmitDisabled}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Submit Guess ↵
        </motion.button>
        <span className="guess-keyboard-hint">
          <kbd>S</kbd> to submit · <kbd>H</kbd> for hint · <kbd>C</kbd> for code
        </span>
      </div>
    </div>
  );
}
