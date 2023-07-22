import { useEffect, useState } from "react";
import type { Difficulty, Puzzle } from "../sudokulib/puzzles";
import { solve } from "../sudokulib/puzzle-solver";
import { generatePuzzle } from "../sudokulib/puzzle-generator";
import { modifyNotes, newNotes } from "../sudokulib/notes";

export function useUnsolvedPuzzle() {
  const [difficulty, setDifficulty] = useState<Difficulty>("EASY");
  const [unsolvedPuzzle, setUnsolvedPuzzle] = useState<Puzzle>(() =>
    generatePuzzle(difficulty)
  );

  function makeNewPuzzle(difficulty: Difficulty) {
    const newPuzzle = generatePuzzle(difficulty);
    setDifficulty(difficulty);
    setUnsolvedPuzzle(newPuzzle);
  }

  return { unsolvedPuzzle, difficulty, makeNewPuzzle };
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

export function useNotes(unsolvedPuzzle: Puzzle) {
  const [notes, setNotes] = useState(() => newNotes());

  function updateNotes(index: number, value: number) {
    const newNotes = modifyNotes(notes, index, value);
    setNotes(newNotes);
  }

  useEffect(() => {
    setNotes(newNotes());
  }, [unsolvedPuzzle]);

  return { notes, updateNotes };
}
