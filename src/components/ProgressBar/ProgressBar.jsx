import React from 'react';
import { motion } from 'framer-motion';
import './ProgressBar.css';

export default function ProgressBar({ current, total }) {
  const percent = total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 0;

  return (
    <div className="progress-bar-container" aria-hidden="true">
      <motion.div
        className="progress-bar-fill"
        initial={false}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </div>
  );
}
