import { ReactNode, useState } from "react";

interface ToggleButtonProps {
  isOn: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export function ToggleButton({ isOn, onToggle, children }: ToggleButtonProps) {
  return (
    <button onClick={onToggle}>
      {children} <input type="checkbox" checked={isOn} />
    </button>
  );
}

export function useToggle(init: boolean): [boolean, () => void] {
  const [isOn, setIsOn] = useState(init);
  function toggle() {
    setIsOn(!isOn);
  }
  return [isOn, toggle];
}
