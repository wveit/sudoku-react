import { useState } from "react";
import { SudokuBoard } from "./components/SudokuBoard";
import { NumberBar } from "./components/NumberBar";
import {
  usePlayerPuzzle,
  useSolvedPuzzle,
  useUnsolvedPuzzle,
} from "./hooks/puzzleHooks";
import { NewGameButton } from "./components/NewGameButton";

export default function App() {
  const [selectedCell, setSelectedCell] = useState(0);
  const { unsolvedPuzzle, difficulty, makeNewPuzzle } = useUnsolvedPuzzle();
  const { solvedPuzzle } = useSolvedPuzzle(unsolvedPuzzle);
  const { puzzle, updatePuzzle } = usePlayerPuzzle(unsolvedPuzzle);

  function handleNumberClick(num: number) {
    if (puzzle[selectedCell] !== solvedPuzzle[selectedCell])
      updatePuzzle(selectedCell, num);
  }

  return (
    <div>
      <h1>Sudoku</h1>
      <div className="flex">
        <NewGameButton onNewGameRequest={makeNewPuzzle} />
        <div>{difficulty}</div>
      </div>
      <SudokuBoard
        puzzle={puzzle}
        solvedPuzzle={solvedPuzzle}
        unsolvedPuzzle={unsolvedPuzzle}
        onCellClick={setSelectedCell}
        selectedCell={selectedCell}
      />
      <NumberBar onNumberClick={handleNumberClick} />
    </div>
  );
}
