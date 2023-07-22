import { useState } from "react";
import { Difficulty } from "../sudokulib/puzzles";

interface NewGameButtonProps {
  onNewGameRequest: (difficulty: Difficulty) => void;
}

export function NewGameButton({ onNewGameRequest }: NewGameButtonProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  const newGameCallback = (difficulty: Difficulty) => () => {
    setShowDropdown(false);
    onNewGameRequest(difficulty);
  };

  return (
    <div className="NewGameButton">
      <button onClick={toggleDropdown}>New Game</button>
      <div
        className={"NewGameButton--dropdown" + (showDropdown ? "" : " hidden")}
      >
        <div onClick={newGameCallback("EASY")} className="NewGameButton--item">
          Easy
        </div>
        <div
          onClick={newGameCallback("MEDIUM")}
          className="NewGameButton--item"
        >
          Medium
        </div>
        <div onClick={newGameCallback("HARD")} className="NewGameButton--item">
          Hard
        </div>
      </div>
    </div>
  );
}
