import { PropsWithChildren } from "react";

interface IteratorProps extends PropsWithChildren {
  count: number;
}

export default function Iterator({ count, children }: IteratorProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{children}</div>
      ))}
    </>
  );
}
