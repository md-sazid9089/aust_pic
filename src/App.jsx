// AI LAYER: Added neural activity widget (F8) and wired userAnswer to ResultModal (F6)
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import apiAnimation from '../public/API.json';
import GameHeader from './components/GameHeader/GameHeader';
import FilterBar from './components/FilterBar/FilterBar';
import PuzzleCard from './components/PuzzleCard/PuzzleCard';
import GuessPanel from './components/GuessPanel/GuessPanel';
import ResultModal from './components/ResultModal/ResultModal';
import EmptyState from './components/EmptyState/EmptyState';
import HowToPlay from './components/HowToPlay/HowToPlay';
import { puzzles } from './data/puzzles';
import { shuffleArray } from './utils/shuffle';
import { loadScore, saveScore, resetScore } from './utils/score';
import { checkGuess } from './utils/checker';
import './App.css';

/* ─── Error Boundary ──────────────────────────────────────── */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an unhandled error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-wrapper">
          <div className="error-boundary-card">
            <span className="error-boundary-icon" role="img" aria-label="Error symbol"></span>
            <h2 className="error-boundary-title">Something went wrong</h2>
            <p className="error-boundary-msg">
              {this.state.error?.message || 'An unexpected runtime error has occurred.'}
            </p>
            <button
              type="button"
              className="error-boundary-reload-btn"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/* ─── Main App component ──────────────────────────────────── */
function MainApp() {
  const [allPuzzles, setAllPuzzles] = useState(() => shuffleArray(puzzles));
  const [filters, setFilters] = useState({ difficulty: 'all', language: 'all' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [selectedQuickPick, setSelectedQuickPick] = useState(null);
  const [guessSubmitted, setGuessSubmitted] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [codeWasViewed, setCodeWasViewed] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(() => loadScore());

  // Derived filtered puzzles using useMemo
  const filteredPuzzles = useMemo(() => {
    return allPuzzles.filter((p) => {
      const diffOk = filters.difficulty === 'all' || p.difficulty === filters.difficulty;
      const langOk = filters.language === 'all' || p.language === filters.language;
      return diffOk && langOk;
    });
  }, [allPuzzles, filters]);

  // Current Puzzle selection
  const currentPuzzle = useMemo(() => {
    return filteredPuzzles[currentIndex] || null;
  }, [filteredPuzzles, currentIndex]);

  const isLastPuzzle = currentIndex === filteredPuzzles.length - 1;

  // Reset state values between questions
  const resetPuzzleState = useCallback(() => {
    setUserGuess('');
    setSelectedQuickPick(null);
    setGuessSubmitted(false);
    setShowCode(false);
    setShowHint(false);
    setCodeWasViewed(false);
    setIsCorrect(false);
  }, []);

  // Filter change handlers
  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentIndex(0);
    resetPuzzleState();
  }, [resetPuzzleState]);

  const clearFilters = useCallback(() => {
    setFilters({ difficulty: 'all', language: 'all' });
    setCurrentIndex(0);
    resetPuzzleState();
  }, [resetPuzzleState]);

  // Code visualizer toggle
  const handleToggleCode = useCallback(() => {
    setShowCode((prev) => {
      const nextVal = !prev;
      if (nextVal) {
        setCodeWasViewed(true);
      }
      return nextVal;
    });
  }, []);

  const handleToggleHint = useCallback(() => {
    setShowHint((prev) => !prev);
  }, []);

  // Selection events
  const handleQuickPickSelect = useCallback((index) => {
    setSelectedQuickPick((prev) => (prev === index ? null : index));
    setUserGuess('');
  }, []);

  const handleGuessChange = useCallback((value) => {
    setUserGuess(value);
    setSelectedQuickPick(null);
  }, []);

  // Guess submission
  const handleSubmit = useCallback(() => {
    if (!currentPuzzle || guessSubmitted) return;
    if (!userGuess.trim() && selectedQuickPick === null) return;

    const correct = checkGuess(currentPuzzle, userGuess, selectedQuickPick);
    setIsCorrect(correct);
    setGuessSubmitted(true);
    setShowResultModal(true);

    const newScore = {
      correct: score.correct + (correct ? 1 : 0),
      total: score.total + 1,
      streak: correct ? score.streak + 1 : 0
    };

    setScore(newScore);
    saveScore(newScore);
  }, [currentPuzzle, userGuess, selectedQuickPick, guessSubmitted, score]);

  // Reset all state (Task 4E)
  const handleReset = useCallback(() => {
    resetScore();
    setScore({ correct: 0, total: 0, streak: 0 });
    setFilters({ difficulty: 'all', language: 'all' });
    setCurrentIndex(0);
    resetPuzzleState();
    setShowResultModal(false);
    setShowHowToPlay(false);
  }, [resetPuzzleState]);

  // Keep for GameHeader reset compatibility
  const handleResetScore = handleReset;

  // Moving to the next question
  const handleNext = useCallback(() => {
    setShowResultModal(false);
    if (currentIndex < filteredPuzzles.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
      setAllPuzzles(shuffleArray(puzzles));
    }
    resetPuzzleState();
  }, [currentIndex, filteredPuzzles.length, resetPuzzleState]);

  // Keyboard shortcut bounds
  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = e.target.tagName;
      if (tag === 'TEXTAREA' || tag === 'INPUT') return;

      const key = e.key.toUpperCase();
      if (key === 'S') {
        e.preventDefault();
        handleSubmit();
      } else if (key === 'N' && showResultModal) {
        e.preventDefault();
        handleNext();
      } else if (key === 'H') {
        e.preventDefault();
        handleToggleHint();
      } else if (key === 'C') {
        e.preventDefault();
        handleToggleCode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSubmit, handleNext, showResultModal, handleToggleHint, handleToggleCode]);

  return (
    <div className="app-layout">
      {/* ── Feature: How To Play floating HUD ── */}
      <motion.div
        className="hud-float hud-meta"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{ position: 'absolute', top: 20, right: 30, zIndex: 10, display: 'flex', gap: '12px', alignItems: 'center' }}
      >
        <button
          className="hud-how-to-play-btn"
          onClick={() => setShowHowToPlay(true)}
        >
          ? How To Play
        </button>
      </motion.div>

      <GameHeader score={score} onResetScore={handleResetScore} />
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        currentIndex={currentIndex}
        totalCount={filteredPuzzles.length}
      />

      <main className="app-main-content">
        {filteredPuzzles.length > 0 && currentPuzzle ? (
          <div className="gameplay-area">
            <AnimatePresence mode="wait">
              <div className="gameplay-split" key={currentPuzzle.id}>
                <div className="gameplay-col gameplay-col--puzzle">
                  <div className="glass-card glass-card--puzzle">
                    <PuzzleCard
                      puzzle={currentPuzzle}
                      showCode={showCode}
                      showHint={showHint}
                      onToggleCode={handleToggleCode}
                      onToggleHint={handleToggleHint}
                      currentIndex={currentIndex}
                      totalCount={filteredPuzzles.length}
                    />
                  </div>
                </div>

                <div className="gameplay-col gameplay-col--lottie" aria-hidden="true">
                  <Lottie
                    animationData={apiAnimation}
                    loop
                    autoplay
                    className="lottie-divider"
                  />
                </div>

                <div className="gameplay-col gameplay-col--guess">
                  <div className="glass-card glass-card--guess">
                    <GuessPanel
                      puzzle={currentPuzzle}
                      userGuess={userGuess}
                      selectedQuickPick={selectedQuickPick}
                      onGuessChange={handleGuessChange}
                      onQuickPickSelect={handleQuickPickSelect}
                      onSubmit={handleSubmit}
                      guessSubmitted={guessSubmitted}
                    />
                  </div>
                </div>
              </div>
            </AnimatePresence>
          </div>
        ) : (
          <EmptyState onClearFilters={clearFilters} />
        )}
      </main>

      <ResultModal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        onNext={handleNext}
        puzzle={currentPuzzle}
        isCorrect={isCorrect}
        solvedWithoutCode={!codeWasViewed}
        score={score}
        isLastPuzzle={isLastPuzzle}
        userAnswer={
          selectedQuickPick !== null
            ? (currentPuzzle?.quick_picks?.[selectedQuickPick] || '')
            : userGuess
        }
      />
      <HowToPlay
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <MainApp />
    </ErrorBoundary>
  );
}
