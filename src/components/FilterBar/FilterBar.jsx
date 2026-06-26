// UPDATED: floating glass-pill filter row detached from header, sliding layoutId highlight
import React from 'react';
import { motion } from 'framer-motion';
import './FilterBar.css';

export default function FilterBar({ filters, onFilterChange, currentIndex, totalCount }) {
  const difficulties = [
    { value: 'all', label: 'All' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const languages = [
    { value: 'all', label: 'All' },
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JS' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' }
  ];

  return (
    <div className="filter-bar-hud">
      <div className="filter-bar-pill">
        <div className="filter-group">
          <span className="filter-group-label">DIFFICULTY</span>
          <div className="filter-pills-row">
            {difficulties.map((d) => (
              <button
                key={d.value}
                type="button"
                className={`filter-pill ${filters.difficulty === d.value ? 'filter-pill-active' : ''}`}
                onClick={() => onFilterChange('difficulty', d.value)}
              >
                {filters.difficulty === d.value && (
                  <motion.span
                    className="filter-pill-highlight"
                    layoutId="active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="filter-pill-label">{d.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-group-label">LANGUAGE</span>
          <div className="filter-pills-row">
            {languages.map((l) => (
              <button
                key={l.value}
                type="button"
                className={`filter-pill ${filters.language === l.value ? 'filter-pill-active' : ''}`}
                onClick={() => onFilterChange('language', l.value)}
              >
                {filters.language === l.value && (
                  <motion.span
                    className="filter-pill-highlight"
                    layoutId="active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="filter-pill-label">{l.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="filter-counter-wrapper">
          <span className="puzzle-counter-text">
            {totalCount > 0 ? `Puzzle ${currentIndex + 1} of ${totalCount}` : '0 of 0'}
          </span>
        </div>
      </div>
    </div>
  );
}
