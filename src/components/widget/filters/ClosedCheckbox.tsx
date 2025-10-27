import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface ClosedCheckboxProps {
  className?: string;
}

function ClosedCheckbox({ className }: ClosedCheckboxProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Checkbox id="show-closed" className="size-5 rounded-full" />
      <label htmlFor="show-closed" className="font-medium text-[#606060]">
        마감된 모임도 표시
      </label>
    </div>
  );
}

export default ClosedCheckbox;
