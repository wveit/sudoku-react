import type { Meta, StoryObj } from "@storybook/react";

import { SudokuBoard } from "../components/SudokuBoard";
import { puzzle1String, parsePuzzle } from "../sudokulib/puzzles";
import "../styles/SudokuBoard.css";

const puzzle = parsePuzzle(puzzle1String);

const meta = {
  title: "Sudoku/SudokuBoard",
  component: SudokuBoard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SudokuBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    puzzle,
    onCellClick: () => null,
    selectedCell: 0,
  },
};
