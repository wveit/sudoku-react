import type { Puzzle } from "./puzzles";

export function solveInPlace(puzzle: Puzzle, index: number = 0): boolean {
  if (index >= 81) return true;
  if (puzzle[index]) return solveInPlace(puzzle, index + 1);

  for (let i = 1; i <= 9; i++) {
    puzzle[index] = i;
    if (!cellIsValid(puzzle, index)) continue;
    if (!solveInPlace(puzzle, index + 1)) continue;
    return true;
  }

  puzzle[index] = 0;
  return false;
}

export function solve(puzzle: Puzzle): Puzzle {
  const newPuzzle = [...puzzle];
  solveInPlace(newPuzzle);
  return newPuzzle;
}

export function puzzleIsSolved(puzzle: Puzzle) {
  return puzzleIsFilled(puzzle) && puzzleIsValid(puzzle);
}

export function puzzleIsFilled(puzzle: Puzzle) {
  return (
    puzzle.length === 81 &&
    puzzle.filter((value) => value > 0 && value <= 9).length === 81
  );
}

export function puzzleIsValid(puzzle: Puzzle) {
  return (
    puzzle.length === 81 &&
    puzzle.filter((_, index) => cellIsValid(puzzle, index)).length === 81
  );
}

export function cellIsValid(puzzle: Puzzle, index: number) {
  const value = puzzle[index];
  if (value === 0) return true;

  // cell valid in row
  const row = Math.floor(index / 9);
  const startOfRow = row * 9;
  const endOfRow = startOfRow + 8;
  for (let i = startOfRow; i <= endOfRow; i++) {
    if (i === index) continue;
    if (puzzle[i] === value) return false;
  }

  // cell valid in column
  const column = index % 9;
  const startOfColumn = column;
  for (let i = startOfColumn; i < 81; i += 9) {
    if (i === index) continue;
    if (puzzle[i] === value) return false;
  }

  // cell valid in square
  const start = Math.floor(row / 3) * 3 * 9 + Math.floor(column / 3) * 3;
  for (let i of squareIndices(start)) {
    if (i === index) continue;
    if (puzzle[i] === value) return false;
  }

  return true;
}

function squareIndices(start: number) {
  return [
    start,
    start + 1,
    start + 2,
    start + 9,
    start + 10,
    start + 11,
    start + 18,
    start + 19,
    start + 20,
  ];
}
