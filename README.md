# Spot the Bug — Code Puzzle Challenge

An interactive, university-themed Printed Circuit Board (PCB) style coding puzzle game. Players analyze buggy code snippets, compare expected vs actual outputs side by side, and spot logic errors through freeform text input or quick pick selections. 

## Features

- **50 Unique Logic Puzzles**: Handcrafted bugs distributed across Python, JavaScript, Java, and C++.
- **Academic PCB Aesthetic**: Clean styling system based on HSL tailored greens, circuit nodes, and typography layout.
- **Scoreboard Persistence**: Automatically records correct, wrong, and streak statistics in `localStorage`.
- **Keyboard Shortcuts**: Supports rapid submissions, hint displays, and code visualizers.
- **Pure CSS**: Fully responsive layouts without external layout utility bloat.
- **Trophy System**: Unlocks special rewards for solving puzzles directly without checking source code blocks.

---

## Folder Structure

```text
spot-the-bug/
├── public/
│   ├── austpic-logo-dark-FMZn71O5.png   ← University Logo File
│   └── favicon.svg                       ← SVG Bug Icon
├── src/
│   ├── components/
│   │   ├── GameHeader/          ← Sticky Header containing Logos & Scores
│   │   ├── FilterBar/           ← Category and language pill navigations
│   │   ├── PuzzleCard/          ← Snippet outputs and toggle panels
│   │   ├── CodeBlock/           ← Syntax highlighting preprocessors
│   │   ├── DifficultyBadge/     ← Color-coded levels indicators
│   │   ├── GuessPanel/          ← Textareas and Quick Pick grids
│   │   ├── ResultModal/         ← Plain text explanation reveals
│   │   ├── Scoreboard/          ← Hot streak trackers and resets
│   │   ├── ProgressBar/         ← Percentage counters
│   │   └── EmptyState/          ← Warning pages
│   ├── data/
│   │   └── puzzles.js           ← 50 hand-crafted bug objects
│   ├── utils/
│   │   ├── shuffle.js           ← Fisher-Yates array shuffling
│   │   ├── score.js             ← localStorage interfaces
│   │   └── checker.js           ← Keywords parsing engines
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── vercel.json
├── package.json
└── README.md
```

---

## Setup & Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/) version 18.0.0 or higher.

### Installation Steps

1. **Clone or Navigate to the Workspace**
   ```bash
   cd e:/aust_pic/aust_pic
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Verify Logo Assets**
   Ensure the file `austpic-logo-dark-FMZn71O5.png` is placed inside the `/public/` directory:
   - `/public/austpic-logo-dark-FMZn71O5.png`

4. **Launch Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

---

## Modifying & Extending

### Adding Puzzles

To add new logic puzzles to the game, open [src/data/puzzles.js](file:///e:/aust_pic/aust_pic/src/data/puzzles.js) and append a new puzzle object following this schema:

```javascript
{
  id: "puzzle_unique_id",
  title: "A Descriptive Title",
  language: "python | javascript | java | cpp",
  difficulty: "beginner | intermediate | advanced | expert",
  category: "loop_error | variable_scope | syntax_error | type_mismatch | ...",
  code_snippet: `// The snippet with the bug`,
  input_given: "Input arguments string description",
  expected_output: "What the code should yield",
  actual_output: "What it yields instead with the bug",
  bug_type: "off_by_one | wrong_operator | ...",
  hint: "A tiny guiding clue.",
  explanation: "A plain-English explanation outlining the bug and the simple fix.",
  correct_keywords: ["array", "index", "loop", "comparison", "range"],
  quick_picks: [
    "Option 1 description",
    "Option 2 description (Correct)",
    "Option 3 description",
    "Option 4 description"
  ],
  correct_quick_pick: 1 // index of correct answer in quick_picks
}
```

---

## Production & Deployment

### Build Bundle

To compile the production assets into static assets:
```bash
npm run build
```
This yields optimized HTML, CSS, and JS code inside the `/dist/` folder.

### Vercel Deployment

This project is a 100% static React single-page application.
- No environment variables (`.env`) are required.
- Deployment can be completed by importing the project on [Vercel](https://vercel.com) directly from your connected GitHub repository. The `vercel.json` routing configuration is already bundled.
