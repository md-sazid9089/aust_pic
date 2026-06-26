import { useState, useCallback } from 'react';
import { buildExplainPrompt, buildGeneratePrompt } from '../utils/promptBuilder';

export function useHuggingFace() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [warmingUp, setWarmingUp] = useState(false);

  const fetchWithRetry = useCallback(async (prompt, isJsonMode = false) => {
    const apiKey = import.meta.env.VITE_HF_API_KEY;
    const url = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3";

    if (!apiKey) {
      throw new Error("Hugging Face API key is missing. Please add VITE_HF_API_KEY to your .env file.");
    }

    const makeRequest = async () => {
      return await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            return_full_text: false,
            max_new_tokens: isJsonMode ? 800 : 300,
            temperature: 0.3
          }
        })
      });
    };

    let response = await makeRequest();

    if (response.status === 503) {
      setWarmingUp(true);
      setError("Model is warming up, retrying in 20 seconds...");
      await new Promise(resolve => setTimeout(resolve, 20000));
      response = await makeRequest();
      setWarmingUp(false);
    }

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    let text = "";
    if (Array.isArray(data) && data[0]) {
      text = data[0].generated_text || "";
    } else if (data.generated_text) {
      text = data.generated_text;
    } else {
      throw new Error("Invalid response format from Hugging Face API.");
    }

    // Clean up instruction prompt if returned
    if (text.includes("[/INST]")) {
      text = text.substring(text.lastIndexOf("[/INST]") + 7).trim();
    }
    return text;
  }, []);

  const explainBug = useCallback(async (puzzle, userGuess) => {
    setIsLoading(true);
    setError(null);
    try {
      const prompt = buildExplainPrompt(puzzle, userGuess);
      const explanation = await fetchWithRetry(prompt, false);

      const cleanGuess = userGuess.toLowerCase().trim();
      const isCorrect = puzzle.tags.some(tag => cleanGuess.includes(tag.toLowerCase())) || 
                        cleanGuess.includes(puzzle.bug_type.toLowerCase().replace(/_/g, ' ')) ||
                        cleanGuess.includes(puzzle.bug_type.toLowerCase());

      setIsLoading(false);
      return { explanation, isCorrect };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return null;
    }
  }, [fetchWithRetry]);

  const generatePuzzle = useCallback(async (difficulty, language) => {
    setIsLoading(true);
    setError(null);
    try {
      const prompt = buildGeneratePrompt(difficulty, language);
      const responseText = await fetchWithRetry(prompt, true);

      // Clean up markdown fences
      let cleanedText = responseText.replace(/```json/i, '').replace(/```/g, '').trim();
      
      // Extract exact JSON boundaries
      const firstBrace = cleanedText.indexOf('{');
      const lastBrace = cleanedText.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        cleanedText = cleanedText.substring(firstBrace, lastBrace + 1);
      }

      const puzzle = JSON.parse(cleanedText);

      // Simple structural validation
      if (!puzzle.id || !puzzle.title || !puzzle.code_snippet) {
        throw new Error("Generated puzzle structure was invalid.");
      }

      setIsLoading(false);
      return puzzle;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return null;
    }
  }, [fetchWithRetry]);

  return {
    explainBug,
    generatePuzzle,
    isLoading,
    error,
    warmingUp
  };
}
