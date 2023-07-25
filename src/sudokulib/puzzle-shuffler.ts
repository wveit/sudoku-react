import { Puzzle } from "./puzzles";
import { getColumnNumber, getRowNumber, randomInt, range } from "./util";

export function shuffleArrayInPlace<T>(
  array: T[],
  firstIndex?: number,
  lastIndex?: number
) {
  const first = firstIndex ?? 0;
  const last = lastIndex ?? array.length - 1;
  for (let i = last; i > first; i--) {
    const j = randomInt(first, last);
    [array[i], array[j]] = [array[j], array[i]];
  }
}
export function shuffleArray<T>(
  array: T[],
  firstIndex?: number,
  lastIndex?: number
) {
  const newArray = [...array];
  shuffleArrayInPlace(newArray, firstIndex, lastIndex);
  return newArray;
}

export function getSafeShuffle9() {
  let arr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];
  arr = arr.map((arr) => shuffleArray(arr));
  arr = shuffleArray(arr);
  return arr.flat();
}

export function shuffleNumberValues(puzzle: Puzzle): Puzzle {
  const valueMap = shuffleArray(range(0, 9), 1, 9);
  return puzzle.map((val) => (val ? valueMap[val] : 0));
}

type IndexConversionFunc = (dest: number) => number;
export function swapCells(
  puzzle: Puzzle,
  sourceIndexFunc: IndexConversionFunc
): Puzzle {
  return puzzle.map((_, index) => puzzle[sourceIndexFunc(index)]);
}

export const flipHorizontal = (puzzle: Puzzle) =>
  swapCells(
    puzzle,
    (index) => (8 - getRowNumber(index)) * 9 + getColumnNumber(index)
  );

export const flipVertical = (puzzle: Puzzle) =>
  swapCells(
    puzzle,
    (index) => getRowNumber(index) * 9 + 8 - getColumnNumber(index)
  );

export const transpose = (puzzle: Puzzle) =>
  swapCells(
    puzzle,
    (index) => getColumnNumber(index) * 9 + getRowNumber(index)
  );

export const antiTransposeFunc: IndexConversionFunc = (index) =>
  (8 - getColumnNumber(index)) * 9 + 8 - getRowNumber(index);
export const antiTranspose = (puzzle: Puzzle) =>
  swapCells(puzzle, antiTransposeFunc);

export const shuffleRows = (puzzle: Puzzle) => {
  const rowMap = getSafeShuffle9();
  return swapCells(
    puzzle,
    (index) => rowMap[getRowNumber(index)] * 9 + getColumnNumber(index)
  );
};

export const shuffleColumns = (puzzle: Puzzle) => {
  const columnMap = getSafeShuffle9();
  return swapCells(
    puzzle,
    (index) => getRowNumber(index) * 9 + columnMap[getColumnNumber(index)]
  );
};
