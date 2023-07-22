import { Children, ReactElement } from "react";
import { cellsInEachSquare } from "../sudokulib/util";

type Puzzle = number[];

interface SudokuBoardProps {
  puzzle: Puzzle;
}

export function SudokuBoard({ puzzle }: SudokuBoardProps) {
  const puzzleElements: ReactElement[] = puzzle.map((val, index) => (
    <div key={index}>{val || " "}</div>
  ));
  return <SudokuGrid>{puzzleElements}</SudokuGrid>;
}

export function SudokuGrid({ children }: { children: ReactElement[] }) {
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
