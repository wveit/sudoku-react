import type { Puzzle } from "./puzzles";

export function isDigit(character: string): boolean {
  if (character.length === 1 && character >= "0" && character <= "9")
    return true;
  return false;
}

const squareStartingCells = [0, 3, 6, 27, 30, 33, 54, 57, 60];
export const cellsInEachSquare = Object.freeze(
  squareStartingCells.map((x) => [
    x,
    x + 1,
    x + 2,
    x + 9,
    x + 10,
    x + 11,
    x + 18,
    x + 19,
    x + 20,
  ])
);

export function printPuzzle(puzzle: Puzzle) {
  let str = "";
  for (let row = 0; row < 9; row++) {
    if (row % 3 === 0) str += "--------------------\n";
    for (let col = 0; col < 9; col++) {
      if (col % 3 === 0) str += " | ";
      str += puzzle[row * 9 + col];
    }
    str += " | \n";
  }
  str += "--------------------\n";
  console.log(str);
}

export function range(first: number, last: number): Puzzle {
  const array = [];
  for (let i = first; i <= last; i++) {
    array.push(i);
  }
  return array;
}

export function getRowNumber(index: number) {
  return Math.floor(index / 9);
}
export function getColumnNumber(index: number) {
  return index % 9;
}
export function getSquareNumber(index: number) {
  const row = getRowNumber(index);
  const column = getColumnNumber(index);
  return Math.floor(row / 3) * 3 + Math.floor(column / 3);
}

export function getRowCells(row: number) {
  return range(row * 9, row * 9 + 8);
}

export function getColumnCells(column: number) {
  return range(0, 8).map((val) => val * 9 + column);
}

export function getSquareCells(square: number) {
  return cellsInEachSquare[square];
}

export function getAllCellNeighbors(cell: number) {
  const set = new Set<number>([
    ...getRowCells(getRowNumber(cell)),
    ...getColumnCells(getColumnNumber(cell)),
    ...getSquareCells(getSquareNumber(cell)),
  ]);
  return Array.from(set);
}

export function calculateHowManyLeft(puzzle: Puzzle, solved: Puzzle) {
  const valueMap = "9".repeat(10).split("").map(Number);
  puzzle.forEach((val: number, index: number) => {
    if (val === solved[index]) valueMap[val]--;
  });
  return valueMap;
}

export function randomInt(first: number, last: number) {
  return Math.floor(Math.random() * (last - first + 1) + first);
}
