import { Children, ReactElement } from "react";
import { cellsInEachSquare } from "../sudokulib/util";

type Puzzle = number[];

interface SudokuBoardProps {
  puzzle: Puzzle;
  onCellClick: (index: number) => void;
  selectedCell: number;
}

export function SudokuBoard({
  puzzle,
  onCellClick,
  selectedCell,
}: SudokuBoardProps) {
  function classNames(value: number, index: number) {
    let className = "SudokuBoard--cellContent";
    if (index === selectedCell)
      className += " SudokuBoard--cellContent-selected";
    return className;
  }

  const puzzleElements: ReactElement[] = puzzle.map((value, index) => (
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
