import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './GeneratePanel.css';

const DIFFICULTIES = ['beginner', 'intermediate', 'advanced', 'expert'];
const LANGUAGES = ['python', 'javascript', 'java', 'cpp'];

export default function GeneratePanel({
  isOpen,
  onClose,
  onPuzzleGenerated,
  isLoading,
  error,
  warmingUp,
}) {
  const [difficulty, setDifficulty] = useState('');
  const [language, setLanguage]     = useState('');
  const [countdown, setCountdown]   = useState(20);
  const [success, setSuccess]       = useState(false);

  // Countdown tick when warming up
  useEffect(() => {
    if (!warmingUp) { setCountdown(20); return; }
    setCountdown(20);
    const id = setInterval(() => setCountdown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(id);
  }, [warmingUp]);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!difficulty || !language) return;
    setSuccess(false);
    const puzzle = await onPuzzleGenerated(difficulty, language);
    if (puzzle) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setDifficulty('');
        setLanguage('');
        onClose();
      }, 1500);
    }
  };

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="gen-overlay" onClick={handleBackdrop}>
      <aside className="gen-panel">
        {/* Header */}
        <div className="gen-panel__header">
          <h2 className="gen-panel__title">Generate a New Puzzle</h2>
          <button type="button" className="gen-panel__close" onClick={onClose} aria-label="Close">×</button>
        </div>
        {/* PCB decorative line */}
        <div className="gen-panel__pcb-line" aria-hidden="true" />

        <div className="gen-panel__body">
          {/* Success state */}
          {success && (
            <div className="gen-state gen-state--success">
              <span className="gen-state__icon"></span>
              <p className="gen-state__msg">Puzzle added! Taking you there now…</p>
            </div>
          )}

          {/* Loading / warmup state */}
          {!success && isLoading && (
            <div className="gen-state">
              {warmingUp ? (
                <>
                  <div className="gen-countdown">
                    <svg className="gen-countdown__ring" viewBox="0 0 52 52">
                      <circle className="gen-countdown__bg" cx="26" cy="26" r="22" />
                      <circle
                        className="gen-countdown__progress"
                        cx="26" cy="26" r="22"
                        strokeDasharray={`${(countdown / 20) * 138.2} 138.2`}
                      />
                    </svg>
                    <span className="gen-countdown__number">{countdown}</span>
                  </div>
                  <p className="gen-state__msg">Model warming up, retrying in {countdown}s…</p>
                </>
              ) : (
                <LoadingSpinner size="lg" label="Generating your puzzle with AI…" />
              )}
            </div>
          )}

          {/* Default form state */}
          {!success && !isLoading && (
            <>
              {/* Error */}
              {error && (
                <div className="gen-error">
                  <span></span>
                  <p>{error}</p>
                </div>
              )}

              {/* Difficulty */}
              <div className="gen-selector">
                <p className="gen-selector__label">Difficulty</p>
                <div className="gen-selector__pills">
                  {DIFFICULTIES.map((d) => (
                    <button
                      key={d}
                      type="button"
                      className={`gen-pill gen-pill--diff ${difficulty === d ? 'gen-pill--selected-primary' : ''}`}
                      onClick={() => setDifficulty(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div className="gen-selector">
                <p className="gen-selector__label">Language</p>
                <div className="gen-selector__pills">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l}
                      type="button"
                      className={`gen-pill gen-pill--lang ${language === l ? 'gen-pill--selected-secondary' : ''}`}
                      onClick={() => setLanguage(l)}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="gen-submit"
                onClick={handleGenerate}
                disabled={!difficulty || !language}
              >
                Generate Puzzle
              </button>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
