import { ReviewCardLocationProps } from "./types";

export function ReviewCardLoacation({ children }: ReviewCardLocationProps) {
  return (
    <div className="mb-3 flex items-center gap-2 pl-1">
      <span className="block h-4 w-0.5 bg-slate-100"></span>
      <span className="font-medium text-slate-400">{children}</span>
    </div>
  );
}
