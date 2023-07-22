import { useState } from "react";
import { SudokuBoard } from "./components/SudokuBoard";
import { puzzle1String, parsePuzzle } from "./sudokulib/puzzles";

const puzzle = parsePuzzle(puzzle1String);

export default function App() {
  const [selectedCell, setSelectedCell] = useState(0);

  return (
    <div>
      <h1>Sudoku</h1>
      <SudokuBoard
        puzzle={puzzle}
        onCellClick={setSelectedCell}
        selectedCell={selectedCell}
      />
    </div>
  );
}
