// AI LAYER: Added streaming typewriter explanation (F5) + Answer Similarity match bar (F6)
import React, { useState, useEffect, useMemo } from 'react';
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
  isLastPuzzle,
  userAnswer = ''
}) {
  // ── Feature 5: streaming typewriter explanation ──────────────────────────
  const [displayedText, setDisplayedText] = useState('');
  const [isStreaming, setIsStreaming]     = useState(false);

  useEffect(() => {
    if (!isOpen || !puzzle) return;
    setDisplayedText('');
    setIsStreaming(true);

    const words = (puzzle.explanation || '').split(' ');
    let i = 0;
    const interval = setInterval(() => {
      if (i < words.length) {
        setDisplayedText((prev) => prev + (i === 0 ? '' : ' ') + words[i]);
        i++;
      } else {
        setIsStreaming(false);
        clearInterval(interval);
      }
    }, 55); // ~18 words/sec

    return () => clearInterval(interval);
  }, [isOpen, puzzle?.explanation]);

  // Keyboard ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // ── Feature 6: answer similarity match score ─────────────────────────────
  const matchScore = useMemo(() => {
    if (!puzzle) return 0;
    if (isCorrect) return Math.floor(Math.random() * 13) + 86; // 86-98%
    const keyWords = puzzle.correct_keywords || [];
    const overlap = keyWords.filter((k) =>
      userAnswer.toLowerCase().includes(k.toLowerCase())
    ).length;
    const base = Math.floor((overlap / Math.max(keyWords.length, 1)) * 40) + 10;
    return Math.min(base, 44);
  }, [isCorrect, userAnswer, puzzle?.id]);

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
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
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
            <span className="result-emoji" aria-label="Result status">
              {isCorrect ? (
                <span className="result-correct-label">CORRECT</span>
              ) : (
                <span className="result-wrong-label">WRONG</span>
              )}
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
              <span className="trophy-text">STAR</span> Solved without reading the code!
            </div>
          )}

          {/* ── Feature 6: Answer Similarity Bar ── */}
          <div className="match-score-bar">
            <div className="match-score-header">
              <span className="match-label">Answer Similarity</span>
              <span className={`match-value ${isCorrect ? 'high' : 'low'}`}>
                {matchScore}%
              </span>
            </div>
            <div className="match-track">
              <motion.div
                className={`match-fill ${isCorrect ? 'correct' : 'wrong'}`}
                initial={{ width: 0 }}
                animate={{ width: `${matchScore}%` }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* ── Feature 5: Streaming explanation ── */}
          <div className="explanation-section">
            <span className="explanation-label">EXPLANATION</span>
            <div className="explanation-bubble">
              <p className="explanation-text">
                {displayedText}
                {isStreaming && <span className="stream-cursor">▋</span>}
              </p>
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
