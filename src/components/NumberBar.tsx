import { range } from "../sudokulib/util";
import { DivButton } from "./DivButton";

interface NumberBarProps {
  onNumberClick: (num: number) => void;
  howManyLeft: number[];
}
export function NumberBar({ onNumberClick, howManyLeft }: NumberBarProps) {
  return (
    <div className="NumberBar">
      {range(1, 9).map((num) => (
        <DivButton
          key={num}
          onClick={() => onNumberClick(num)}
          disabled={!howManyLeft[num]}
        >
          {num}
        </DivButton>
      ))}
    </div>
  );
}
