import { parsePuzzle, puzzle1String } from "./puzzles";
import type { Puzzle, Difficulty } from "./puzzles";

const difficultyMap: Record<Difficulty, number> = {
  EASY: 0,
  MEDIUM: 2,
  HARD: 4,
};

const seed = parsePuzzle(puzzle1String);

export function generatePuzzle(difficulty: Difficulty): Puzzle {
  const newPuzzle = [...seed];
  removeCells(newPuzzle, difficultyMap[difficulty]);

  for (let i = 0; i < 40; i++) {
    shuffleCells(newPuzzle);
  }

  return newPuzzle;
}

function removeCells(puzzle: Puzzle, count: number) {
  for (let i = 0; i < count; i++) {
    while (true) {
      const index = Math.floor(Math.random() * 81);
      if (puzzle[index]) {
        puzzle[index] = 0;
        break;
      }
    }
  }
  return puzzle;
}

function swapColumns(puzzle: Puzzle, col1: number, col2: number) {
  const start1 = col1;
  const start2 = col2;

  for (let i = 0; i < 9; i++) {
    const cell1 = start1 + i * 9;
    const cell2 = start2 + i * 9;
    const temp = puzzle[cell1];
    puzzle[cell1] = puzzle[cell2];
    puzzle[cell2] = temp;
  }
}

function randomInt(first: number, last: number) {
  return Math.floor(Math.random() * (last - first + 1) + first);
}

function randomTwoDifferentInts(first: number, last: number) {
  const num1 = randomInt(first, last);
  let num2 = randomInt(first, last);
  while (num1 === num2) num2 = randomInt(first, last);
  return [num1, num2];
}

function swapRandomColumns(puzzle: Puzzle) {
  const squareColumn = randomInt(0, 2);
  const [col1Offset, col2Offset] = randomTwoDifferentInts(0, 2);
  const col1 = squareColumn * 3 + col1Offset;
  const col2 = squareColumn * 3 + col2Offset;
  swapColumns(puzzle, col1, col2);
}

function swapRows(puzzle: Puzzle, row1: number, row2: number) {
  const start1 = row1 * 9;
  const start2 = row2 * 9;

  for (let i = 0; i < 9; i++) {
    const cell1 = start1 + i;
    const cell2 = start2 + i;
    const temp = puzzle[cell1];
    puzzle[cell1] = puzzle[cell2];
    puzzle[cell2] = temp;
  }
}

function swapRandomRows(puzzle: Puzzle) {
  const squareRow = randomInt(0, 2);
  const [row1Offset, row2Offset] = randomTwoDifferentInts(0, 2);
  const row1 = squareRow * 3 + row1Offset;
  const row2 = squareRow * 3 + row2Offset;
  swapRows(puzzle, row1, row2);
}

function swapSquareRows(
  puzzle: Puzzle,
  squareRow1: number,
  squareRow2: number
) {
  const row1 = squareRow1 * 3;
  const row2 = squareRow2 * 3;
  for (let i = 0; i < 3; i++) {
    swapRows(puzzle, row1 + i, row2 + i);
  }
}

function swapRandomSquareRows(puzzle: Puzzle) {
  const [squareRow1, squareRow2] = randomTwoDifferentInts(0, 2);
  swapSquareRows(puzzle, squareRow1, squareRow2);
}

function swapSquareColumns(
  puzzle: Puzzle,
  squareCol1: number,
  squareCol2: number
) {
  const col1 = squareCol1 * 3;
  const col2 = squareCol2 * 3;
  for (let i = 0; i < 2; i++) {
    swapColumns(puzzle, col1, col2);
  }
}

function swapRandomSquareColumns(puzzle: Puzzle) {
  const [squareCol1, squareCol2] = randomTwoDifferentInts(0, 2);
  swapSquareColumns(puzzle, squareCol1, squareCol2);
}

const shuffleFns = [
  swapRandomColumns,
  swapRandomRows,
  swapRandomSquareColumns,
  swapRandomSquareRows,
];

function shuffleCells(puzzle: Puzzle) {
  const i = Math.floor(Math.random() * shuffleFns.length);
  const shuffle = shuffleFns[i];
  shuffle(puzzle);
}
