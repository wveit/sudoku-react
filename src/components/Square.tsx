import { HTMLAttributes, ReactNode } from "react";

interface SquareProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Square(props: SquareProps) {
  const { children, className, ...rest } = props;
  return (
    <div
      className={"Square--outer" + (className ? ` ${className}` : "")}
      {...rest}
    >
      <div className="Square--inner">{children}</div>
    </div>
  );
}
