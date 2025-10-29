import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function TextWrapperSkeleton({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-1.5">{children}</div>;
}

function TitleSkeleton() {
  return <Skeleton fontSize="sm" className="w-10" />;
}

function ContentSkeleton({ className }: { className?: string }) {
  return <Skeleton fontSize="sm" className={className} />;
}

function BarSkeleton() {
  return <Skeleton className="h-2 w-0.5" />;
}

interface GatheringCardInfoSkeletonProps {
  className?: string;
}

export function GatheringCardInfoSkeleton({
  className,
}: GatheringCardInfoSkeletonProps) {
  return (
    <div
      className={cn(
        "flex flex-row flex-wrap items-center gap-x-2 gap-y-1",
        className,
      )}
    >
      {/* 위치 */}
      <TextWrapperSkeleton>
        <TitleSkeleton />
        <ContentSkeleton className="w-16" />
      </TextWrapperSkeleton>
      <BarSkeleton />
      {/* 날짜 */}
      <TextWrapperSkeleton>
        <TitleSkeleton />
        <ContentSkeleton className="w-24" />
      </TextWrapperSkeleton>
    </div>
  );
}
