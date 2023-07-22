import { useEffect, useState } from "react";
import { SudokuBoard } from "./components/SudokuBoard";
import { NumberBar } from "./components/NumberBar";
import {
  useNotes,
  usePlayerPuzzle,
  useSolvedPuzzle,
  useUnsolvedPuzzle,
} from "./hooks/puzzleHooks";
import { NewGameButton } from "./components/NewGameButton";
import { ToggleButton, useToggle } from "./components/ToggleButton";
import { puzzleIsSolved } from "./sudokulib/puzzle-solver";
import { calculateHowManyLeft } from "./sudokulib/util";
export default function App() {
  const [selectedCell, setSelectedCell] = useState(0);
  const { unsolvedPuzzle, difficulty, makeNewPuzzle } = useUnsolvedPuzzle();
  const { solvedPuzzle } = useSolvedPuzzle(unsolvedPuzzle);
  const { puzzle, updatePuzzle } = usePlayerPuzzle(unsolvedPuzzle);
  const [notesOn, toggleNotes] = useToggle(false);
  const { notes, updateNotes, reactNotesToCellChange } =
    useNotes(unsolvedPuzzle);
  const gameIsWon = puzzleIsSolved(puzzle);
  const howManyLeft = calculateHowManyLeft(puzzle, solvedPuzzle);

  useEffect(() => {
    if (gameIsWon) alert("You won!!!");
  }, [gameIsWon]);

  function handleNumberClick(num: number) {
    if (notesOn && !puzzle[selectedCell]) {
      updateNotes(selectedCell, num);
    } else if (
      !notesOn &&
      puzzle[selectedCell] !== solvedPuzzle[selectedCell]
    ) {
      updatePuzzle(selectedCell, num);
      if (num === solvedPuzzle[selectedCell])
        reactNotesToCellChange(selectedCell, num);
    }
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
        notes={notes}
      />
      <div className="flex">
        <ToggleButton isOn={notesOn} onToggle={toggleNotes}>
          Notes
        </ToggleButton>
      </div>
      <NumberBar onNumberClick={handleNumberClick} howManyLeft={howManyLeft} />
    </div>
  );
}
