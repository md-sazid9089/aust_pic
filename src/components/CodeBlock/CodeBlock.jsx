// AI LAYER: Added glowing scan-line animation on every puzzle load (Feature 3)
import React, { useEffect, useRef, useState } from 'react';
import './CodeBlock.css';

export default function CodeBlock({ code, language, puzzleId }) {
  const codeRef   = useRef(null);
  const [copied,   setCopied]   = useState(false);
  const [scanning, setScanning] = useState(false);

  // Highlight syntax whenever code changes
  useEffect(() => {
    const el = codeRef.current;
    if (window.hljs && el) {
      el.removeAttribute('data-highlighted');
      window.hljs.highlightElement(el);
    }
  }, [code, language]);

  // Re-trigger scan animation on every new puzzle
  useEffect(() => {
    setScanning(true);
    const t = setTimeout(() => setScanning(false), 1800);
    return () => clearTimeout(t);
  }, [puzzleId]);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`code-block-wrapper${scanning ? ' scanning' : ''}`}>
      {/* Scan line sweep */}
      {scanning && <div className="scan-line" />}
      {scanning && (
        <div className="scan-label" aria-hidden="true">
          <span className="scan-dot" />
          Analyzing patterns...
        </div>
      )}

      <div className="code-block-header">
        <span className="code-block-lang">{language}</span>
        <button
          type="button"
          className="code-block-copy-btn"
          onClick={handleCopy}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="code-block-pre">
        <code
          ref={codeRef}
          className={`language-${language}`}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}
