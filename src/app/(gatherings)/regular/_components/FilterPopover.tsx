import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DAY_OF_WEEK } from "@/lib/constants/date";
import { cn } from "@/lib/utils";

export default function FilterPopover() {
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          buttonVariants({
            variant: "outline",
          }),
          "cursor-pointer bg-transparent",
        )}
      >
        상세 필터
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-8" align="start">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium">참여 조건</div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Checkbox id="pet-required" />
              <label htmlFor="pet-required" className="text-sm">
                반드시 반려견과 함께
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="pet-not-required" />
              <label htmlFor="pet-not-required" className="text-sm">
                반려견 없이 참여 가능
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium">요일</div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {DAY_OF_WEEK.map((day) => (
              <div key={day.key} className="flex items-center gap-2">
                <Checkbox id={`day-of-week-${day.key}`} />
                <label htmlFor={`day-of-week-${day.key}`} className="text-sm">
                  {day.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="show-closed" />
          <label htmlFor="show-closed" className="text-sm">
            마감된 모임도 표시
          </label>
        </div>
      </PopoverContent>
    </Popover>
  );
}
