import { cn } from "@/lib/utils";

interface ReviewCardDividerProps {
  className?: string;
}

export default function ReviewCardDivider({
  className,
}: ReviewCardDividerProps) {
  return <div className={cn("h-px w-full bg-[#ddd]", className)} />;
}
