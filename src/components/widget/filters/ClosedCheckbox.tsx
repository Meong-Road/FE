import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface ClosedCheckboxProps {
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

function ClosedCheckbox({
  className,
  checked,
  onCheckedChange,
}: ClosedCheckboxProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Checkbox
        id="show-closed"
        className="size-5 rounded-full bg-[#EEEEEE]"
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <label
        htmlFor="show-closed"
        className="text-sm font-medium text-[#606060]"
      >
        마감된 모임도 표시
      </label>
    </div>
  );
}

export default ClosedCheckbox;
