import { formatDateShort } from "@/lib/utils/dateTime";

import { ReviewCardCreatedAtProps } from "../types";

export function CreatedAt({ date }: ReviewCardCreatedAtProps) {
  return (
    <span className="flex-shrink-0 text-xs text-slate-400 sm:text-sm">
      {formatDateShort(date)}
    </span>
  );
}
