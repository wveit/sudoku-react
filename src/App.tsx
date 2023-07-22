import { useState } from "react";
import { SudokuBoard } from "./components/SudokuBoard";
import { NumberBar } from "./components/NumberBar";
import {
  usePlayerPuzzle,
  useSolvedPuzzle,
  useUnsolvedPuzzle,
} from "./hooks/puzzleHooks";
import { NewGameButton } from "./components/NewGameButton";
import { ToggleButton, useToggle } from "./components/ToggleButton";

export default function App() {
  const [selectedCell, setSelectedCell] = useState(0);
  const { unsolvedPuzzle, difficulty, makeNewPuzzle } = useUnsolvedPuzzle();
  const { solvedPuzzle } = useSolvedPuzzle(unsolvedPuzzle);
  const { puzzle, updatePuzzle } = usePlayerPuzzle(unsolvedPuzzle);
  const [notesOn, toggleNotes] = useToggle(false);

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
      <div className="flex">
        <ToggleButton isOn={notesOn} onToggle={toggleNotes}>
          Notes
        </ToggleButton>
      </div>
      <NumberBar onNumberClick={handleNumberClick} />
    </div>
  );
}
