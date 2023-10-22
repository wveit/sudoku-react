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
import { useMistakes } from "./hooks/use-mistakes";
import { useTimer } from "./timer/use-timer";
import { Timer } from "./components/Timer";
import { Square } from "./components/Square";

export default function App() {
  const [selectedCell, setSelectedCell] = useState(0);
  const { unsolvedPuzzle, difficulty, makeNewPuzzle } = useUnsolvedPuzzle();
  const { solvedPuzzle } = useSolvedPuzzle(unsolvedPuzzle);
  const { puzzle, updatePuzzle } = usePlayerPuzzle(unsolvedPuzzle);
  const [notesOn, toggleNotes] = useToggle(false);
  const { notes, updateNotes, reactNotesToCellChange, fillOutNotes } =
    useNotes(unsolvedPuzzle);
  const { mistakeCount, mistakeIsPresent, currentMistake } = useMistakes(
    solvedPuzzle,
    puzzle
  );
  const gameIsWon = puzzleIsSolved(puzzle);
  const howManyLeft = calculateHowManyLeft(puzzle, solvedPuzzle);
  const timer = useTimer();
  useEffect(() => {
    timer.reset();
    timer.resume();
  }, [unsolvedPuzzle]);

  useEffect(() => {
    if (gameIsWon) {
      alert("You won!!!");
      timer.stop();
    }
  }, [gameIsWon]);

  function handleNumberClick(num: number) {
    if (mistakeIsPresent) return;
    if (
      puzzle[selectedCell] &&
      puzzle[selectedCell] === solvedPuzzle[selectedCell]
    ) {
      const index = puzzle.findIndex(
        (val, index) => val === num && val === solvedPuzzle[index]
      );
      if (index !== -1) setSelectedCell(index);
    }
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

  function handleEraseMistake() {
    const mistakeIndex = currentMistake.index;
    if (mistakeIndex !== -1) {
      updatePuzzle(mistakeIndex, 0);
    }
  }

  return (
    <div className="App">
      <main>
        <h1>Sudoku</h1>
        <div className="flex-row">
          <NewGameButton onNewGameRequest={makeNewPuzzle} />
          <div>Level: {onlyCapitalizeFirstLetter(difficulty)}</div>
          <div>Mistakes: {mistakeCount}</div>
          <Timer {...timer} />
        </div>
        <Square>
          <SudokuBoard
            puzzle={puzzle}
            solvedPuzzle={solvedPuzzle}
            unsolvedPuzzle={unsolvedPuzzle}
            onCellClick={setSelectedCell}
            selectedCell={selectedCell}
            notes={notes}
          />
          {timer.isPaused ? <div className="paused-screen">Paused</div> : null}
        </Square>
        <div className="flex-row underboard-controls">
          <ToggleButton isOn={notesOn} onToggle={toggleNotes}>
            Notes
          </ToggleButton>
          <button
            onClick={handleEraseMistake}
            className={"mistake-button"}
            disabled={!mistakeIsPresent}
          >
            Erase Mistake
          </button>
          <button onClick={() => fillOutNotes(puzzle)}>Fill in notes</button>
        </div>
        <NumberBar
          onNumberClick={handleNumberClick}
          howManyLeft={howManyLeft}
        />
      </main>
    </div>
  );
}

/* Helpers */
function onlyCapitalizeFirstLetter(str: string) {
  return str[0].toUpperCase() + str.substring(1).toLowerCase();
}
