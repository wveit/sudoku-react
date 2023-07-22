import { cellsInEachSquare } from "../sudokulib/util";

type Puzzle = number[];

interface SudokuBoardProps {
  puzzle: Puzzle;
}

export function SudokuBoard({ puzzle }: SudokuBoardProps) {
  return (
    <div className="SudokuBoard">
      {cellsInEachSquare.map((square, squareIndex) => (
        <div key={squareIndex} className="SudokuBoard--square">
          {square.map((cellIndex, index) => (
            <div key={index} className="SudokuBoard--cell">
              {puzzle[cellIndex] || " "}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
