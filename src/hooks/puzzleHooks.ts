import { useEffect, useState } from "react";
import {
  Difficulty,
  Puzzle,
  parsePuzzle,
  puzzle1String,
} from "../sudokulib/puzzles";
import { solve } from "../sudokulib/puzzle-solver";

const defaultPuzzle = parsePuzzle(puzzle1String);

export function useUnsolvedPuzzle() {
  const [unsolvedPuzzle, setUnsolvedPuzzle] = useState<Puzzle>(defaultPuzzle);

  function makeNewPuzzle(difficulty: Difficulty) {
    const newPuzzle = [...defaultPuzzle]; // TODO: replace this with actual puzzle generation
    setUnsolvedPuzzle(newPuzzle);
  }

  return { unsolvedPuzzle, makeNewPuzzle };
}

export function useSolvedPuzzle(unsolvedPuzzle: Puzzle) {
  const [solvedPuzzle, setSolvedPuzzle] = useState(unsolvedPuzzle);
  useEffect(() => {
    const solved = solve(unsolvedPuzzle);
    setSolvedPuzzle(solved);
  }, [unsolvedPuzzle]);
  return { solvedPuzzle };
}

export function usePlayerPuzzle(unsolvedPuzzle: Puzzle) {
  const [puzzle, setPuzzle] = useState(unsolvedPuzzle);
  useEffect(() => {
    setPuzzle(unsolvedPuzzle);
  }, [unsolvedPuzzle]);

  function updatePuzzle(index: number, value: number) {
    const newPuzzle = [...puzzle];
    newPuzzle[index] = value;
    setPuzzle(newPuzzle);
  }
  return { puzzle, updatePuzzle };
}
