// AI LAYER: Added BugDetect AI model header (F1), per-pick confidence scores (F2), AI thinking overlay (F4)
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './GuessPanel.css';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const STAGES = ['scanning', 'parsing', 'evaluating', 'done'];
const STAGE_ICONS  = { scanning: '[SCAN]', parsing: '[PARSE]', evaluating: '[EVAL]', done: '[DONE]' };
const STAGE_LABELS = {
  scanning:   'Scanning answer...',
  parsing:    'Parsing bug patterns...',
  evaluating: 'Evaluating logic...',
  done:       'Analysis complete',
};

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

  const [thinkingStage, setThinkingStage] = useState(null);

  const isTextDisabled  = selectedQuickPick !== null || guessSubmitted || thinkingStage !== null;
  const isSubmitDisabled = guessSubmitted || thinkingStage !== null || (!userGuess.trim() && selectedQuickPick === null);

  // ── Feature 2: stable confidence scores seeded by puzzle id ──────────────
  const confidenceScores = useMemo(() => {
    const base = [72, 81, 64, 89];
    const seed = puzzle.id.charCodeAt(puzzle.id.length - 1);
    // deterministic shuffle using seed
    const shuffled = [...base].map((v, i) => ({ v, sort: (seed * (i + 3)) % 7 }))
      .sort((a, b) => a.sort - b.sort)
      .map((o) => o.v);
    // correct pick always gets the highest value
    const max = Math.max(...shuffled);
    if (shuffled[puzzle.correct_quick_pick] !== max) {
      const maxIdx = shuffled.indexOf(max);
      [shuffled[puzzle.correct_quick_pick], shuffled[maxIdx]] =
        [shuffled[maxIdx], shuffled[puzzle.correct_quick_pick]];
    }
    return shuffled;
  }, [puzzle.id, puzzle.correct_quick_pick]);

  // ── Feature 4: intercept submit → show AI thinking sequence ─────────────
  const handleSubmitWithThinking = async () => {
    if (isSubmitDisabled) return;
    setThinkingStage('scanning');
    await delay(500);
    setThinkingStage('parsing');
    await delay(500);
    setThinkingStage('evaluating');
    await delay(600);
    setThinkingStage('done');
    await delay(300);
    setThinkingStage(null);
    onSubmit();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isSubmitDisabled) handleSubmitWithThinking();
    }
  };

  const quickPickContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } }
  };
  const quickPickItem = {
    hidden: { opacity: 0, x: -20 },
    show:   { opacity: 1, x: 0 }
  };

  const currentStageIdx = STAGES.indexOf(thinkingStage);

  return (
    <div className="guess-panel-card" style={{ position: 'relative' }}>

      {/* ── Feature 1: AI Model header ───────────────────────────────── */}
      <div className="ai-model-header">
        <div className="ai-model-pulse" />
        <span className="ai-model-name">BugDetect AI</span>
        <span className="ai-model-version">v2.1 · Pattern Analysis Engine</span>
        <div className="ai-status-dot" />
        <span className="ai-status-text">Model Active</span>
      </div>

      <h3 className="guess-panel-title">What do you think is wrong?</h3>

      {/* ── Quick Picks with confidence scores ───────────────────────── */}
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
                disabled={guessSubmitted || thinkingStage !== null}
                variants={quickPickItem}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="pick-text">{pick}</span>
                <span className="pick-confidence">{confidenceScores[index]}%</span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Separator */}
      <div className="guess-separator">
        <div className="separator-line" />
        <span className="separator-text">or type your answer</span>
        <div className="separator-line" />
      </div>

      {/* Free-form textarea */}
      <textarea
        className="guess-textarea"
        rows={3}
        value={userGuess}
        onChange={(e) => onGuessChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          selectedQuickPick !== null
            ? 'Clear your quick pick selection to type an answer...'
            : 'Describe what you think the bug is...'
        }
        disabled={isTextDisabled}
      />

      {/* Submit */}
      <div className="guess-submit-wrapper">
        <motion.button
          type="button"
          id="submit-guess-btn"
          className="guess-submit-btn"
          onClick={handleSubmitWithThinking}
          disabled={isSubmitDisabled}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Submit Guess ↵
        </motion.button>
        <span className="guess-keyboard-hint">
          <kbd>S</kbd> to submit · <kbd>H</kbd> for hint · <kbd>C</kbd> for code
        </span>
      </div>

      {/* ── Feature 4: AI Thinking overlay ───────────────────────────── */}
      <AnimatePresence>
        {thinkingStage && (
          <motion.div
            className="ai-thinking-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="thinking-stages">
              {STAGES.map((stage, i) => (
                <div
                  key={stage}
                  className={`thinking-stage ${currentStageIdx >= i ? 'active' : 'pending'}`}
                >
                  <span className="stage-icon">{STAGE_ICONS[stage]}</span>
                  <span className="stage-label">{STAGE_LABELS[stage]}</span>
                  {currentStageIdx === i && (
                    <span className="stage-dots">
                      <span /><span /><span />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
