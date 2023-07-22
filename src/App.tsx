import { SudokuBoard } from "./components/SudokuBoard";
import { puzzle1String, parsePuzzle } from "./sudokulib/puzzles";

const puzzle = parsePuzzle(puzzle1String);

export default function App() {
  return (
    <div>
      <h1>Sudoku</h1>
      <SudokuBoard puzzle={puzzle} />
    </div>
  );
}
