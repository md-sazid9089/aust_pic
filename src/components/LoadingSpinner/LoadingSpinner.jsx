import React from 'react';
import './LoadingSpinner.css';

export default function LoadingSpinner({ size = 'md', label, color }) {
  return (
    <div className="spinner-wrapper">
      <div
        className={`spinner spinner--${size}`}
        style={color ? { borderTopColor: color } : undefined}
        role="status"
        aria-label="Loading"
      />
      {label && <p className="spinner-label">{label}</p>}
    </div>
  );
}
