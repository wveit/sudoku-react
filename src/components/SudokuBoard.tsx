import { Children, ReactNode } from "react";
import { cellsInEachSquare, range } from "../sudokulib/util";

import type { Puzzle } from "../sudokulib/puzzles";
import { Notes, hasNote } from "../sudokulib/notes";
import { Square } from "./Square";

interface SudokuBoardProps {
  puzzle: Puzzle;
  solvedPuzzle?: Puzzle;
  unsolvedPuzzle?: Puzzle;
  onCellClick: (index: number) => void;
  selectedCell: number;
  notes?: Notes;
}

export function SudokuBoard({
  puzzle,
  solvedPuzzle,
  unsolvedPuzzle,
  onCellClick,
  selectedCell,
  notes,
}: SudokuBoardProps) {
  const selectedValue = puzzle[selectedCell] || -1;

  function classNames(value: number, index: number) {
    let className = "SudokuBoard--cellContent";
    if (index === selectedCell)
      className += " SudokuBoard--cellContent-selected";
    if (value === selectedValue)
      className += " SudokuBoard--cellContent-selectedValue";
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
      {value || (
        <CellNotes
          notes={notes}
          cellIndex={index}
          highlightValue={selectedValue}
        />
      )}
    </div>
  ));

  return <SudokuGrid>{puzzleElements}</SudokuGrid>;
}

export function SudokuGrid({ children }: { children: ReactNode }) {
  const childArray = Children.toArray(children);
  return (
    <Square>
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
    </Square>
  );
}

interface CellNotesProps {
  notes?: Notes;
  cellIndex: number;
  highlightValue: number;
}
function CellNotes({ notes, cellIndex, highlightValue }: CellNotesProps) {
  if (!notes) return null;

  const nums = range(1, 9);
  return (
    <div className="CellNotes">
      {nums.map((num) => {
        const show = hasNote(notes, cellIndex, num);
        return (
          <div
            key={num}
            className={
              "CellNotes--note" +
              (show && highlightValue === num
                ? " CellNotes--note-highlighted"
                : "")
            }
          >
            {show ? num : <span>&zwnj;</span>}
          </div>
        );
      })}
    </div>
  );
}
