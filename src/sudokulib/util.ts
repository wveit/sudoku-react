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
