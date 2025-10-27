import { type ProfileCardHeaderProps } from "./types";

export function ProfileCardHeader({ children }: ProfileCardHeaderProps) {
  return (
    <h3 className="mb-4 text-[18px] leading-none font-semibold text-zinc-800 select-none">
      {children}
    </h3>
  );
}
