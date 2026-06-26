import React from 'react';
import './DifficultyBadge.css';

export default function DifficultyBadge({ difficulty }) {
  if (!difficulty) return null;
  
  const lower = difficulty.toLowerCase();
  
  return (
    <span className={`difficulty-badge badge-${lower}`}>
      {difficulty}
    </span>
  );
}
