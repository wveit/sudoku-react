import { Children, ReactNode } from "react";
import { cellsInEachSquare } from "../sudokulib/util";

import type { Puzzle } from "../sudokulib/puzzles";

interface SudokuBoardProps {
  puzzle: Puzzle;
  solvedPuzzle?: Puzzle;
  unsolvedPuzzle?: Puzzle;
  onCellClick: (index: number) => void;
  selectedCell: number;
}

export function SudokuBoard({
  puzzle,
  solvedPuzzle,
  unsolvedPuzzle,
  onCellClick,
  selectedCell,
}: SudokuBoardProps) {
  function classNames(value: number, index: number) {
    let className = "SudokuBoard--cellContent";
    if (index === selectedCell)
      className += " SudokuBoard--cellContent-selected";
    if (solvedPuzzle && value && value !== solvedPuzzle[index])
      className += " SudokuBoard--cellContent-mistake";
    else if (unsolvedPuzzle && value && value !== unsolvedPuzzle[index])
      className += " SudokuBoard--cellContent-playerValue";
    return className;
  }

  const puzzleElements: ReactNode = puzzle.map((value, index) => (
    <div
      key={index}
      className={classNames(value, index)}
      onClick={() => onCellClick(index)}
    >
      {value || null}
    </div>
  ));

  return <SudokuGrid>{puzzleElements}</SudokuGrid>;
}

export function SudokuGrid({ children }: { children: ReactNode }) {
  const childArray = Children.toArray(children);
  return (
    <div className="SudokuBoard">
      {cellsInEachSquare.map((square, squareIndex) => (
        <div key={squareIndex} className="SudokuBoard--square">
          {square.map((cellIndex, index) => (
            <div key={index} className="SudokuBoard--cell">
              {childArray[cellIndex]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
