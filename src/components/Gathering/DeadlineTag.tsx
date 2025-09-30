import { AlarmClock } from "lucide-react";

import { cn } from "@/lib/utils";
import { getRegistrationDeadlineInfo } from "@/lib/utils/dateTime";

import Tag from "../Tag";

interface DeadlineTagProps {
  registrationEnd: string;
}

export default function DeadlineTag({ registrationEnd }: DeadlineTagProps) {
  const { text, variant } = getRegistrationDeadlineInfo(registrationEnd);

  return (
    <Tag variant={variant} className="flex items-center gap-1">
      <AlarmClock
        className={cn(
          "size-4 shrink-0",
          variant === "primary" && "stroke-primary",
          variant === "secondary" && "stroke-[#737373]",
        )}
      />
      <span className="text-sm font-semibold">{text}</span>
    </Tag>
  );
}
