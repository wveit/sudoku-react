export function GameIsWon({ show, onOk }: { show: boolean; onOk: () => void }) {
  if (!show) return null;
  return (
    <div className="GameIsWon--background">
      <div className="GameIsWon--foreground">
        <div>You won!</div>
        <div>
          <button onClick={onOk}>ok</button>
        </div>
      </div>
    </div>
  );
}
