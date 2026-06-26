export function buildExplainPrompt(puzzle, userGuess) {
  return `[INST] You are a friendly coding teacher explaining bugs to beginners. Keep explanation under 100 words. Use simple English, no technical jargon.

Language: ${puzzle.language}
Code: ${puzzle.code_snippet}
Expected output: ${puzzle.expected_output}
Actual output: ${puzzle.actual_output}
User guessed: ${userGuess}

Explain what the bug is, why it happened, and whether the user's guess was correct or close. Be warm and encouraging. [/INST]`;
}

export function buildGeneratePrompt(difficulty, language) {
  // Generate random 6 characters for the ID
  const randomChars = Math.random().toString(36).substring(2, 8);
  return `[INST] Generate a coding bug puzzle as valid JSON only.
No explanation. No markdown. No code fences. Raw JSON only.

difficulty: ${difficulty}
language: ${language}

Return exactly this shape:
{
  "id": "gen_${randomChars}",
  "title": "short descriptive title",
  "language": "${language}",
  "difficulty": "${difficulty}",
  "category": "loop_error|operator_error|logic_error|type_error|scope_error|edge_case",
  "code_snippet": "the buggy code",
  "input_given": "sample input",
  "expected_output": "correct output",
  "actual_output": "buggy output",
  "bug_type": "short label",
  "hint": "one sentence hint without revealing the bug",
  "tags": ["tag1", "tag2", "tag3"]
} [/INST]`;
}
