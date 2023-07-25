import {
  antiTranspose,
  flipHorizontal,
  flipVertical,
  shuffleColumns,
  shuffleNumberValues,
  shuffleRows,
  transpose,
} from "./puzzle-shuffler";
import { Difficulty, Puzzle, parsePuzzle } from "./puzzles";
import { randomInt } from "./util";

export const samplePuzzles: Record<Difficulty, string[]> = {
  EASY: [
    "100060074598300061004020005020608009900032700603010002070000040049001627250740008",
    "960370010185429760070001008031000602009050801007003049006002000008705096750000080",
    "902415000005060000370000061210396005406000002003080190649031057500600004807509000",
  ],
  MEDIUM: [
    "090650000000092601760000290408005000000279458000004000040000100080906034500040907",
    "401790500000006900090031008210064000000102403084000100132859000900000000800000059",
    "020031060306005007509070000030000605000120030067080019008300000600800470000760000",
  ],
  HARD: [
    "400070008100002700000850000003004900006305002005000800000000000900003200004007060",
    "680032000004000200209704000070000108001300000906871000000407000300000086090000052",
    "049100000001006000005280090096005308010063400000000000003000980700000010060030000",
  ],
};

function getRandomSamplePuzzle(difficulty: Difficulty): Puzzle {
  const puzzleStringArray = samplePuzzles[difficulty];
  const randomSeedString =
    puzzleStringArray[randomInt(0, puzzleStringArray.length - 1)];
  const seed = parsePuzzle(randomSeedString);
  return seed;
}

const flipFunctions = [flipHorizontal, flipVertical, transpose, antiTranspose];
function randomFlipFunction() {
  return flipFunctions[randomInt(0, flipFunctions.length - 1)];
}

export function shufflePuzzle(puzzle: Puzzle): Puzzle {
  let newPuzzle = shuffleNumberValues(puzzle);
  for (let i = 0; i < 30; i++) {
    newPuzzle = randomFlipFunction()(newPuzzle);
    newPuzzle = shuffleRows(newPuzzle);
    newPuzzle = shuffleColumns(newPuzzle);
  }
  return newPuzzle;
}

export function generatePuzzle(difficulty: Difficulty): Puzzle {
  let puzzle = getRandomSamplePuzzle(difficulty);
  return shufflePuzzle(puzzle);
}
