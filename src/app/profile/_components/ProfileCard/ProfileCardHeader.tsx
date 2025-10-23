import { type ProfileCardHeaderProps } from "./types";

export function ProfileCardHeader({ children }: ProfileCardHeaderProps) {
  return (
    <h3 className="text-[18px] font-semibold text-zinc-800 select-none">
      {children}
    </h3>
  );
}
