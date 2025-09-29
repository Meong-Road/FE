interface ProgressBarProps {
  percentage: number; // 50% 일 때, 50 입력
}

export default function ProgressBar({ percentage }: ProgressBarProps) {
  return (
    <div className="relative h-1.5 w-full rounded-full bg-[#eaeaea]">
      <div
        className="from-secondary to-primary absolute h-full rounded-full bg-gradient-to-r"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
