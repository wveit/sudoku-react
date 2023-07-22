import { useMemo, useState } from "react";
import { SudokuBoard } from "./components/SudokuBoard";
import { puzzle1String, parsePuzzle } from "./sudokulib/puzzles";
import { solve } from "./sudokulib/puzzle-solver";
import { NumberBar } from "./components/NumberBar";

const originalPuzzle = parsePuzzle(puzzle1String);
const solution = solve(originalPuzzle);

export default function App() {
  const [selectedCell, setSelectedCell] = useState(0);
  const [puzzle, setPuzzle] = useState(
    useMemo(() => parsePuzzle(puzzle1String), [])
  );

  function handleNumberClick(num: number) {
    const newPuzzle = [...puzzle];
    newPuzzle[selectedCell] = num;
    setPuzzle(newPuzzle);
  }

  return (
    <div>
      <h1>Sudoku</h1>
      <SudokuBoard
        puzzle={puzzle}
        solutionPuzzle={solution}
        originalPuzzle={originalPuzzle}
        onCellClick={setSelectedCell}
        selectedCell={selectedCell}
      />
      <NumberBar onNumberClick={handleNumberClick} />
    </div>
  );
}
