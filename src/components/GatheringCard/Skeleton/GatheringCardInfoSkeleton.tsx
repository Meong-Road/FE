import { Skeleton } from "@/components/ui/skeleton";
import { EGatheringType } from "@/lib/types/gatherings";

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
  type: EGatheringType;
}

export function GatheringCardInfoSkeleton({
  type,
}: GatheringCardInfoSkeletonProps) {
  return (
    <div className="flex items-center gap-2.5">
      {/* 위치 */}
      <TextWrapperSkeleton>
        <TitleSkeleton />
        <ContentSkeleton className="w-16" />
      </TextWrapperSkeleton>
      {type === EGatheringType.QUICK && (
        <>
          <BarSkeleton />
          {/* 날짜 */}
          <TextWrapperSkeleton>
            <TitleSkeleton />
            <ContentSkeleton className="w-24" />
          </TextWrapperSkeleton>
        </>
      )}
      {type === EGatheringType.REGULAR && (
        <>
          <BarSkeleton />
          {/* 요일 */}
          <TextWrapperSkeleton>
            <TitleSkeleton />
            <ContentSkeleton className="w-12" />
          </TextWrapperSkeleton>
        </>
      )}
    </div>
  );
}
