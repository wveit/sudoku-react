import { useEffect, useState } from "react";
import { Puzzle } from "../sudokulib/puzzles";

type Mistake = { index: number; value: number };
const defaultMistake: Mistake = { index: -1, value: -1 };
function mistakesAreSame(m1: Mistake, m2: Mistake) {
  return m1.index === m2.index && m1.value === m2.value;
}

function findMistakes(solvedPuzzle: Puzzle, puzzle: Puzzle) {
  const mistakes: Mistake[] = [];
  solvedPuzzle.forEach((correctValue, index) => {
    const puzzleValue = puzzle[index];
    if (puzzleValue && puzzleValue !== correctValue) {
      mistakes.push({ index, value: puzzleValue });
    }
  });
  return mistakes;
}

export function useMistakes(solvedPuzzle: Puzzle, puzzle: Puzzle) {
  const [lastMistake, setLastMistake] = useState(defaultMistake);
  const [mistakeCount, setMistakeCount] = useState(0);

  const currentMistake =
    findMistakes(solvedPuzzle, puzzle)[0] ?? defaultMistake;
  const mistakeIsPresent = currentMistake.index !== -1;
  if (!mistakesAreSame(currentMistake, lastMistake)) {
    if (currentMistake.index !== -1) {
      setMistakeCount((mistakeCount) => mistakeCount + 1);
    }
    setLastMistake(currentMistake);
  }

  useEffect(() => {
    setLastMistake(defaultMistake);
    setMistakeCount(0);
  }, [solvedPuzzle]);

  return { mistakeCount, mistakeIsPresent, currentMistake };
}
