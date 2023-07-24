import { JSX } from "react";

type DivButtonProps = JSX.IntrinsicElements["button"] & {};

export function DivButton(props: DivButtonProps) {
  const { children, className, ...rest } = props;

  const classNames = "DivButton" + (className ? ` ${className}` : "");

  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );
}
