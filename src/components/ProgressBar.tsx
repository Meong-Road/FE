import { cn } from "@/lib/utils";

interface ProgressBarProps {
  percentage: number; // 50% 일 때, 50 입력
  max?: number | string;
  className?: string;
}

export default function ProgressBar({
  percentage,
  max,
  className,
}: ProgressBarProps) {
  return (
    <div
      className={cn("relative h-1 w-full rounded-full bg-[#eaeaea]", className)}
    >
      <div
        className="from-secondary to-primary absolute h-full rounded-full bg-gradient-to-r"
        style={{ width: `${percentage}%` }}
      ></div>
      {max && (
        <div className="absolute top-4 right-0 text-sm font-medium text-gray-700">
          {max}
        </div>
      )}
    </div>
  );
}
