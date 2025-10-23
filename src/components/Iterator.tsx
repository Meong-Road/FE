import { ElementType, PropsWithChildren } from "react";

interface IteratorProps extends PropsWithChildren {
  count: number;
  as?: ElementType;
}

export default function Iterator({
  count,
  children,
  as: Component = "div",
}: IteratorProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Component key={index}>{children}</Component>
      ))}
    </>
  );
}
