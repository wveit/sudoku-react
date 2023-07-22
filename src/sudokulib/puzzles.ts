import { isDigit } from "./util";

export type Difficulty = "EASY" | "MEDIUM" | "HARD";
export type Puzzle = number[];

export const puzzle1String = `
  003020600
  900305001
  001806400
  008102900
  700000008
  006708200
  002609500
  800203009
  005010300`;

export const puzzle2String = `
  200080300
  060070084
  030500209
  000105408
  000000000
  402706000
  301007040
  720040060
  004010003`;

export function parsePuzzle(str: string) {
  return str.split("").filter(isDigit).map(Number);
}

export const empty = "0".repeat(81).split("").map(Number);
