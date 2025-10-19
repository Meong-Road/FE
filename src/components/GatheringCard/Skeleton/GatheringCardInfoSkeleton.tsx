import { Skeleton } from "@/components/ui/skeleton";
import { EGatheringType } from "@/lib/types/gatherings";

function TextWrapperSkeleton({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-1.5">{children}</div>;
}

function TitleSkeleton() {
  return <Skeleton fontSize="sm" className="w-10" />;
}

function ContentSkeleton() {
  return <Skeleton fontSize="sm" className="w-14" />;
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
      {type === EGatheringType.QUICK && (
        <>
          <TextWrapperSkeleton>
            <TitleSkeleton />
            <ContentSkeleton />
          </TextWrapperSkeleton>
          <BarSkeleton />
          <TextWrapperSkeleton>
            <TitleSkeleton />
            <ContentSkeleton />
          </TextWrapperSkeleton>
        </>
      )}
      {type === EGatheringType.REGULAR && (
        <>
          <BarSkeleton />
          <TextWrapperSkeleton>
            <TitleSkeleton />
            <ContentSkeleton />
          </TextWrapperSkeleton>
        </>
      )}
    </div>
  );
}
