// import { formatTime } from "@/lib/utils/dateTime";
// ->> 지금 모임시간을 "17:30", "18:40" 등 형식으로 받아와야되는데 api가 '분' 없이 시간만 받아와서 포맷팅 불가능함
// ->> 그래서 분을 00으로 추가해서 임시로 포맷팅 함
import { cn } from "@/lib/utils";

import { ReviewCardGatheringInfoProps } from "../types";

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
    <div className="flex items-center gap-1.5">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-sm font-medium text-slate-600">{value}</span>
    </div>
  );
}

export function GatheringInfo({
  location,
  days,
}: ReviewCardGatheringInfoProps) {
  const parsedLocation = (() => {
    if (!location) return null;

    try {
      const loc =
        typeof location === "string" ? JSON.parse(location) : location;

      return loc.region_2depth_name || loc.address_name || "위치 정보 없음";
    } catch {
      return typeof location === "string" ? location : "위치 정보 오류";
    }
  })();

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      {location && (
        <>
          <Divider size="md" />
          <InfoItem label="위치" value={parsedLocation} />
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
