// import { formatTime } from "@/lib/utils/dateTime";
// ->> 지금 모임시간을 "17:30", "18:40" 등 형식으로 받아와야되는데 api가 '분' 없이 시간만 받아와서 포맷팅 불가능함
// ->> 그래서 분을 00으로 추가해서 임시로 포맷팅 함
import { cn } from "@/lib/utils";

import { ReviewCardInfoProps } from "./types";

function Divider({ size = "sm" }: { size?: "sm" | "md" }) {
  return (
    <span
      className={cn(
        size === "sm"
          ? "h-[11px] w-[1px] bg-slate-200"
          : "h-[16px] w-[3px] bg-slate-100",
      )}
    />
  );
}

function InfoItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-sm font-medium text-slate-600">{value}</span>
    </div>
  );
}

export function ReviewCardInfo({ location, days }: ReviewCardInfoProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      {location && (
        <>
          <Divider size="md" />
          <InfoItem label="위치" value={location} />
        </>
      )}
      {days && (
        <>
          <Divider size="sm" />
          <InfoItem label="요일" value={days} />
        </>
      )}
    </div>
  );
}
