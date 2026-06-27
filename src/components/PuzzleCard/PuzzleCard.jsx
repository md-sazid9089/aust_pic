// AI LAYER: Added AI detection pattern tag (F7) + passes puzzleId to CodeBlock for scan trigger (F3)
import React from 'react';
import { motion } from 'framer-motion';
import ProgressBar from '../ProgressBar/ProgressBar';
import DifficultyBadge from '../DifficultyBadge/DifficultyBadge';
import CodeBlock from '../CodeBlock/CodeBlock';
import './PuzzleCard.css';

const formatBugType = (type) =>
  type?.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Unknown';

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

  const certainty =
    puzzle.difficulty === 'expert'       ? '94%' :
    puzzle.difficulty === 'advanced'     ? '97%' :
    puzzle.difficulty === 'intermediate' ? '99%' : '99.9%';

  return (
    <motion.div
      key={puzzle.id}
      className="puzzle-card-wrapper"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <ProgressBar current={currentIndex + 1} total={totalCount} />

      <article className="puzzle-card">
        <div className="puzzle-card-top-row">
          <div className="title-area">
            <h2 className="puzzle-title">{puzzle.title}</h2>
            <span className="category-chip">{puzzle.category.replace(/_/g, ' ')}</span>

            {/* ── Feature 7: AI Detected Pattern tag ── */}
            <div className="ai-detection-tag">
              <span className="detection-icon"></span>
              <span className="detection-text">
                AI detected: <strong>{formatBugType(puzzle.bug_type)}</strong> pattern
              </span>
              <span className="detection-confidence">{certainty} certainty</span>
            </div>
          </div>
          <div className="badge-area">
            <DifficultyBadge difficulty={puzzle.difficulty} />
            <span className="language-pill">{puzzle.language}</span>
          </div>
        </div>

        <div className="puzzle-card-divider" aria-hidden="true" />

        <div className="comparison-section-header">
          Compare the outputs
        </div>

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

        {puzzle.input_given && (
          <div className="puzzle-input-row">
            <span className="puzzle-input-label">Input Given: </span>
            <code className="puzzle-input-value">{puzzle.input_given}</code>
          </div>
        )}

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
            <CodeBlock
              code={puzzle.code_snippet}
              language={puzzle.language}
              puzzleId={puzzle.id}
            />
          </div>
        )}
      </article>
    </motion.div>
  );
}
