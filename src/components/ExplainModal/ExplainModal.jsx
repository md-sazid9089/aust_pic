import React, { useEffect } from 'react';
import './ExplainModal.css';

export default function ExplainModal({
  isOpen,
  onClose,
  onNext,
  onGenerate,
  aiResult,
  puzzle,
  solvedWithoutCode,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen || !puzzle) return null;

  const isCorrect = aiResult?.isCorrect ?? false;
  const explanation = aiResult?.explanation ?? 'No explanation available.';
  const showTrophy = solvedWithoutCode && isCorrect;

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdrop} role="dialog" aria-modal="true">
      <div className="modal-card">
        {/* Close button */}
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {/* Result header */}
        <div className="modal-header">
          <span className="modal-result-icon">{isCorrect ? 'Correct' : 'Think again'}</span>
          <h2 className={`modal-result-title ${isCorrect ? 'modal-result-title--correct' : 'modal-result-title--wrong'}`}>
            {isCorrect ? 'Nice catch!' : 'Not quite!'}
          </h2>
        </div>

        {/* Trophy badge */}
        {showTrophy && (
          <div className="modal-trophy">
            <span></span>
            <span>Solved without reading the code!</span>
          </div>
        )}

        {/* Explanation */}
        <div className="modal-explanation">
          <p className="modal-explanation__text">{explanation}</p>
        </div>

        {/* Bug type chip */}
        <div className="modal-bug-type">
          <span className="modal-bug-type__label">Correct Bug Type:</span>
          <span className="modal-bug-type__chip">{puzzle.bug_type.replace(/_/g, ' ')}</span>
        </div>

        {/* Footer buttons */}
        <div className="modal-footer">
          <button
            type="button"
            className="modal-btn modal-btn--ghost"
            onClick={() => { onClose(); onGenerate(); }}
          >
            Generate New Puzzle
          </button>
          <button
            type="button"
            className="modal-btn modal-btn--primary"
            onClick={onNext}
          >
            Next Puzzle →
          </button>
        </div>
      </div>
    </div>
  );
}
