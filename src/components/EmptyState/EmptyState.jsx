import React from 'react';
import './EmptyState.css';

export default function EmptyState({ onClearFilters }) {
  return (
    <div className="empty-state-card">
      <div className="empty-state-icon" role="img" aria-label="Microscope warning"></div>
      <h3 className="empty-state-title">No puzzles match your filters</h3>
      <p className="empty-state-subtitle">
        Try selecting different difficulty or language parameters.
      </p>
      <button 
        type="button" 
        className="empty-state-clear-btn" 
        onClick={onClearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
}
