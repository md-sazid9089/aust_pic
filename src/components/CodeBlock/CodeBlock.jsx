import React, { useEffect, useRef, useState } from 'react';
import './CodeBlock.css';

export default function CodeBlock({ code, language }) {
  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = codeRef.current;
    if (window.hljs && el) {
      el.removeAttribute('data-highlighted');
      window.hljs.highlightElement(el);
    }
  }, [code, language]);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-block-wrapper">
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
