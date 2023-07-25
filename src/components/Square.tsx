import { HTMLAttributes, ReactNode, useEffect, useRef } from "react";

interface SquareProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Square(props: SquareProps) {
  const { children, className, ...rest } = props;
  const outerDiv = useRef<HTMLDivElement | null>(null);

  const resizeObserverRef = useRef(
    new ResizeObserver((entries) => {
      if (!outerDiv.current) return;
      const size = Math.floor(entries[0].contentRect.width);
      outerDiv.current.style.setProperty("--sudoku-board-size", `${size}px`);
    })
  );

  useEffect(() => {
    if (!outerDiv.current) return;
    const outerDivCurrent = outerDiv.current;
    resizeObserverRef.current.observe(outerDivCurrent);
    return () => {
      resizeObserverRef.current.unobserve(outerDivCurrent);
    };
  }, [outerDiv.current]);

  return (
    <div
      className={"Square--outer" + (className ? ` ${className}` : "")}
      ref={outerDiv}
      {...rest}
    >
      <div className="Square--inner">{children}</div>
    </div>
  );
}
