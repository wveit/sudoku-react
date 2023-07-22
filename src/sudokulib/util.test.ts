import { it, expect } from "vitest";
import {
  getColumnCells,
  getColumnNumber,
  getRowCells,
  getRowNumber,
  getSquareCells,
  getSquareNumber,
} from "./util";

it("getRowNumber(index)", () => {
  expect(getRowNumber(0)).toBe(0);
  expect(getRowNumber(7)).toBe(0);
  expect(getRowNumber(9)).toBe(1);
  expect(getRowNumber(80)).toBe(8);
  expect(getRowNumber(71)).toBe(7);
});

it("getColumnNumber(index)", () => {
  expect(getColumnNumber(0)).toBe(0);
  expect(getColumnNumber(3)).toBe(3);
  expect(getColumnNumber(8)).toBe(8);
  expect(getColumnNumber(9)).toBe(0);
  expect(getColumnNumber(80)).toBe(8);
});

it("getSquareNumber(index)", () => {
  expect(getSquareNumber(0)).toBe(0);
  expect(getSquareNumber(2)).toBe(0);
  expect(getSquareNumber(3)).toBe(1);
  expect(getSquareNumber(9)).toBe(0);
  expect(getSquareNumber(26)).toBe(2);
  expect(getSquareNumber(27)).toBe(3);
  expect(getSquareNumber(12)).toBe(1);
  expect(getSquareNumber(80)).toBe(8);
});

it("getRowCells(row)", () => {
  expect(getRowCells(2)).toEqual([18, 19, 20, 21, 22, 23, 24, 25, 26]);
});

it("getColumnCells(column)", () => {
  expect(getColumnCells(3)).toEqual([3, 12, 21, 30, 39, 48, 57, 66, 75]);
});

it("getSquareCells(square)", () => {
  expect(getSquareCells(1)).toEqual([3, 4, 5, 12, 13, 14, 21, 22, 23]);
  expect(getSquareCells(6)).toEqual([54, 55, 56, 63, 64, 65, 72, 73, 74]);
});
