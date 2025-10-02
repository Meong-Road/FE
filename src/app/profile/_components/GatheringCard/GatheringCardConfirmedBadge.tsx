import Check from "@/assets/images/check.svg";

export function GatheringCardConfirmedBadge() {
  return (
    <div className="bg-gradient-primary inline-block rounded-3xl p-[1px]">
      <div className="flex h-8 items-center gap-0.5 rounded-3xl bg-white px-2">
        <Check width={24} height={24} />
        <span className="text-primary text-sm font-semibold">개설확정</span>
      </div>
    </div>
  );
}
