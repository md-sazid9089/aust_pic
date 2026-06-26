import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ResultModal.css';

export default function ResultModal({ 
  isOpen, 
  onClose, 
  onNext, 
  puzzle, 
  isCorrect, 
  solvedWithoutCode, 
  score,
  isLastPuzzle
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !puzzle) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={`modal-card ${isCorrect ? 'modal-correct-border' : 'modal-wrong-border'}`}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>

        {/* Header Segment */}
        <div className="modal-header">
          <span className="result-emoji" role="img" aria-label="Result status">
            {isCorrect ? 'Correct' : 'Wrong'}
          </span>
          <div className="result-header-text">
            <h2 className={`result-title ${isCorrect ? 'text-correct' : 'text-wrong'}`}>
              {isCorrect ? 'Nice catch!' : 'Not quite!'}
            </h2>
            <p className="result-subtitle">
              {isCorrect ? 'Your answer was on the right track.' : "Here's what was actually wrong:"}
            </p>
          </div>
        </div>

        {/* Trophy highlight for logic-only solvers */}
        {isCorrect && solvedWithoutCode && (
          <div className="trophy-badge">
            <span role="img" aria-label="Trophy"></span> Solved without reading the code!
          </div>
        )}

        {/* Plain-text Predefined Static Explanation */}
        <div className="explanation-section">
          <span className="explanation-label">EXPLANATION</span>
          <div className="explanation-bubble">
            <p className="explanation-text">{puzzle.explanation}</p>
          </div>
        </div>

        {/* Bug attributes chips */}
        <div className="modal-attributes-row">
          <div className="bug-type-chip">
            Bug type: {puzzle.bug_type.replace(/_/g, ' ')}
          </div>

          <div className={`score-update-message ${isCorrect ? 'text-correct' : 'text-wrong'}`}>
            {isCorrect ? (
              <span>+1 correct &middot; {score.streak} streak</span>
            ) : (
              <span>Streak reset · Keep trying!</span>
            )}
          </div>
        </div>

        {/* Footer controls */}
        <div className="modal-footer-btns">
          <button
            type="button"
            className="next-puzzle-btn"
            onClick={onNext}
          >
            {isLastPuzzle ? 'Play Again from Start' : 'Next Puzzle →'}
          </button>
        </div>
      </motion.div>
    </motion.div>
    </AnimatePresence>
  );
}
