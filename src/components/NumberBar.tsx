import { range } from "../sudokulib/util";

export function NumberBar({
  onNumberClick,
}: {
  onNumberClick: (num: number) => void;
}) {
  return (
    <div style={{ display: "flex" }}>
      {range(1, 9).map((num) => (
        <button key={num} onClick={() => onNumberClick(num)}>
          {num}
        </button>
      ))}
    </div>
  );
}
