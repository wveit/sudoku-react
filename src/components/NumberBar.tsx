import { range } from "../sudokulib/util";

interface NumberBarProps {
  onNumberClick: (num: number) => void;
  howManyLeft: number[];
}
export function NumberBar({ onNumberClick, howManyLeft }: NumberBarProps) {
  return (
    <div className="NumberBar">
      {range(1, 9).map((num) => (
        <button
          key={num}
          onClick={() => onNumberClick(num)}
          disabled={!howManyLeft[num]}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
