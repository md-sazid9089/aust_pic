import React from 'react';
import { motion } from 'framer-motion';
import './Scoreboard.css';

export default function Scoreboard({ score, onResetScore }) {
  const { correct, total, streak } = score;
  const wrong = total - correct;
  const isHotStreak = streak >= 3;

  return (
    <div className="scoreboard-container">
      <div className="score-chip correct-chip">
        <span className="chip-icon"></span>
        <motion.span
          key={correct}
          className="chip-value"
          initial={{ scale: 1.4, color: "#00ffcc" }}
          animate={{ scale: 1, color: "inherit" }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          {correct}
        </motion.span>
        <span className="chip-label">correct</span>
      </div>

      <div className="score-chip wrong-chip">
        <span className="chip-icon"></span>
        <motion.span
          key={wrong}
          className="chip-value"
          initial={{ scale: 1.4, color: "#00ffcc" }}
          animate={{ scale: 1, color: "inherit" }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          {wrong}
        </motion.span>
        <span className="chip-label">wrong</span>
      </div>

      <div className={`score-chip streak-chip ${isHotStreak ? 'pulse-streak' : ''}`}>
        <span className="chip-icon"></span>
        <motion.span
          key={streak}
          className="chip-value"
          initial={{ scale: 1.4, color: "#00ffcc" }}
          animate={{ scale: 1, color: "inherit" }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          {streak}
        </motion.span>
        <span className="chip-label">streak</span>
      </div>

      <button
        type="button"
        className="score-reset-btn"
        onClick={onResetScore}
        title="Reset Scoreboard"
      >
        ↺ Reset
      </button>
    </div>
  );
}
