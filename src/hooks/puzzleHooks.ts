import { useEffect, useState } from "react";
import type { Difficulty, Puzzle } from "../sudokulib/puzzles";
import { solve } from "../sudokulib/puzzle-solver";
import { generatePuzzle } from "../sudokulib/puzzle-generator";
import {
  Notes,
  makeNotesReact,
  modifyNotes,
  newNotes,
} from "../sudokulib/notes";

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

function copyNotes(notes: Notes) {
  return modifyNotes(modifyNotes(notes, 0, 1), 0, 1);
}

function notesEqual(notes1: Notes, notes2: Notes): boolean {
  if (notes1.length !== notes2.length) return false;
  for (let i = 0; i < notes1.length; i++) {
    if (notes1[i].length !== notes2[i].length) return false;
    for (let j = 0; j < notes1[i].length; j++) {
      if (notes1[i][j] !== notes2[i][j]) return false;
    }
  }
  return true;
}

export function useNotes(unsolvedPuzzle: Puzzle) {
  const [notes, setNotes] = useState(() => newNotes());

  function updateNotes(index: number, value: number) {
    const oldNotes = copyNotes(notes);
    const newNotes = modifyNotes(notes, index, value);
    if (notesEqual(oldNotes, notes)) {
      console.log("notes were not modified");
    } else {
      console.log("notes were modified");
    }
    setNotes(newNotes);
  }

  function reactNotesToCellChange(index: number, value: number) {
    const newNotes = makeNotesReact(notes, index, value);
    setNotes(newNotes);
  }

  useEffect(() => {
    setNotes(newNotes());
  }, [unsolvedPuzzle]);

  return { notes, updateNotes, reactNotesToCellChange };
}
