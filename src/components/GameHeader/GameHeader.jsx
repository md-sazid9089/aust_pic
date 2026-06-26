// UPDATED: floating centered pill HUD with logo, scoreboard, and reset
import React from 'react';
import Scoreboard from '../Scoreboard/Scoreboard';
import './GameHeader.css';

export default function GameHeader({ score, onResetScore }) {
  return (
    <header className="game-header-hud">
      <div className="hud-pill">
        <div className="hud-left">
          <img
            src="/austpic-logo-dark-FMZn71O5.png"
            alt="University Logo"
            className="hud-logo"
          />
          <div className="hud-divider" aria-hidden="true"></div>
          <div className="hud-brand">
            <h1 className="hud-title">Spot the Bug</h1>
            <span className="hud-tagline">Code Puzzle Challenge</span>
          </div>
        </div>

        <div className="hud-right">
          <Scoreboard score={score} onResetScore={onResetScore} />
        </div>
      </div>
    </header>
  );
}
