import React from 'react';
import { motion } from 'framer-motion';
import ProgressBar from '../ProgressBar/ProgressBar';
import DifficultyBadge from '../DifficultyBadge/DifficultyBadge';
import CodeBlock from '../CodeBlock/CodeBlock';
import './PuzzleCard.css';

export default function PuzzleCard({
  puzzle,
  showCode,
  showHint,
  onToggleCode,
  onToggleHint,
  currentIndex,
  totalCount
}) {
  if (!puzzle) return null;

  return (
    <motion.div
      key={puzzle.id}
      className="puzzle-card-wrapper"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* ProgressBar sits above the card body visually */}
      <ProgressBar current={currentIndex + 1} total={totalCount} />

      <article className="puzzle-card">
        {/* Top Header Information Row */}
        <div className="puzzle-card-top-row">
          <div className="title-area">
            <h2 className="puzzle-title">{puzzle.title}</h2>
            <span className="category-chip">{puzzle.category.replace(/_/g, ' ')}</span>
          </div>
          <div className="badge-area">
            <DifficultyBadge difficulty={puzzle.difficulty} />
            <span className="language-pill">{puzzle.language}</span>
          </div>
        </div>

        <div className="puzzle-card-divider" aria-hidden="true" />

        {/* Comparison Section Label */}
        <div className="comparison-section-header">
          Compare the outputs
        </div>

        {/* Side-by-Side Outputs */}
        <div className="output-comparison-grid">
          <div className="output-compare-box output-expected">
            <span className="compare-box-label">Expected Output</span>
            <pre className="compare-box-value">{puzzle.expected_output}</pre>
          </div>
          <div className="output-compare-box output-actual">
            <span className="compare-box-label">Actual Output</span>
            <pre className="compare-box-value">{puzzle.actual_output}</pre>
          </div>
        </div>

        {/* Input parameters row */}
        {puzzle.input_given && (
          <div className="puzzle-input-row">
            <span className="puzzle-input-label">Input Given: </span>
            <code className="puzzle-input-value">{puzzle.input_given}</code>
          </div>
        )}

        {/* Actions layout bar */}
        <div className="puzzle-actions-row">
          <button 
            type="button" 
            className={`action-btn-ghost ${showHint ? 'action-btn-ghost-active' : ''}`}
            onClick={onToggleHint}
          >
            <span></span> {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
          
          <button 
            type="button" 
            className={`action-btn-ghost ${showCode ? 'action-btn-ghost-active' : ''}`}
            onClick={onToggleCode}
          >
            <span>{"</>"}</span> {showCode ? 'Hide Code' : 'Show Code'}
          </button>
        </div>

        {/* Conditionally rendered blocks with slide down animations */}
        {showHint && (
          <div className="puzzle-reveal-container reveal-hint">
            <div className="hint-banner-content">
              <p className="hint-text-para">
                <em>{puzzle.hint}</em>
              </p>
            </div>
          </div>
        )}

        {showCode && (
          <div className="puzzle-reveal-container reveal-code">
            <CodeBlock code={puzzle.code_snippet} language={puzzle.language} />
          </div>
        )}
      </article>
    </motion.div>
  );
}
