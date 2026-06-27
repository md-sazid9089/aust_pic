import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HowToPlay.css';

export default function HowToPlay({ isOpen, onClose }) {
  if (!isOpen) return null;

  const steps = [
    {
      number: '01',
      title: 'Read the Puzzle',
      description: 'Study the buggy code snippet on the left card. Compare the Expected Output vs Actual Output to understand what the code should do vs what it actually does.'
    },
    {
      number: '02',
      title: 'Spot the Bug',
      description: 'Identify the logic error causing the wrong output. Use the Input Given field and the AI-detected pattern tag as context clues.'
    },
    {
      number: '03',
      title: 'Submit Your Answer',
      description: 'Either click a Quick Pick option on the right card, or type your own explanation in the text area. Then hit Submit Guess or press S.'
    },
    {
      number: '04',
      title: 'Review the Feedback',
      description: 'The AI will analyze your answer and show a similarity score. Read the explanation to understand the exact bug and how to fix it.'
    },
    {
      number: '05',
      title: 'Build Your Streak',
      description: 'Solve puzzles consecutively to build your streak. Use filters to focus on specific language or difficulty levels. All progress is saved automatically.'
    }
  ];

  const shortcuts = [
    { key: 'S', action: 'Submit your guess' },
    { key: 'H', action: 'Show / hide hint' },
    { key: 'C', action: 'Show / hide code' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="htp-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="htp-modal"
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 30 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="htp-header">
            <div className="htp-header-left">
              <div className="htp-ai-dot" />
              <div>
                <h2 className="htp-title">How To Play</h2>
                <p className="htp-subtitle">Spot the Bug — Code Puzzle Challenge</p>
              </div>
            </div>
            <button type="button" className="htp-close-btn" onClick={onClose}>X</button>
          </div>

          {/* Divider */}
          <div className="htp-divider" />

          {/* Steps */}
          <div className="htp-steps">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="htp-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
              >
                <div className="htp-step-number">{step.number}</div>
                <div className="htp-step-content">
                  <h3 className="htp-step-title">{step.title}</h3>
                  <p className="htp-step-desc">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div className="htp-divider" />

          {/* Keyboard Shortcuts */}
          <div className="htp-shortcuts-section">
            <p className="htp-shortcuts-label">Keyboard Shortcuts</p>
            <div className="htp-shortcuts-row">
              {shortcuts.map(s => (
                <div key={s.key} className="htp-shortcut-chip">
                  <kbd className="htp-kbd">{s.key}</kbd>
                  <span className="htp-shortcut-action">{s.action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="htp-divider" />

          {/* Scoring info */}
          <div className="htp-scoring">
            <div className="htp-score-item correct">
              <span className="htp-score-val">+1</span>
              <span className="htp-score-desc">Correct answer</span>
            </div>
            <div className="htp-score-sep" />
            <div className="htp-score-item wrong">
              <span className="htp-score-val">+1</span>
              <span className="htp-score-desc">Wrong answer tracked</span>
            </div>
            <div className="htp-score-sep" />
            <div className="htp-score-item streak">
              <span className="htp-score-val">x</span>
              <span className="htp-score-desc">Consecutive correct = streak</span>
            </div>
          </div>

          {/* CTA */}
          <button type="button" className="htp-start-btn" onClick={onClose}>
            Start Playing
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
