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

export function printPuzzle(puzzle: number[]) {
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

export function range(first: number, last: number): number[] {
  const array = [];
  for (let i = first; i <= last; i++) {
    array.push(i);
  }
  return array;
}
