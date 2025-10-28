import Dog from "@/assets/images/dog.svg";
import { useGatheringStateContext } from "@/hooks/context/useGatheringStateContext";
import { cn } from "@/lib/utils";
import {
  checkIsCanceledGatheringState,
  checkIsClosedGatheringState,
} from "@/lib/utils/gathering";

import ImageWithFallback from "../common/ImageWithFallback";

interface GatheringCardImageProps {
  className?: string;
}
export function GatheringCardImage({ className }: GatheringCardImageProps) {
  const { gathering, state } = useGatheringStateContext();
  const isClosedGathering = checkIsClosedGatheringState(state);
  const isCanceledGathering = checkIsCanceledGatheringState(state);

  return (
    <div
      className={cn(
        "relative flex aspect-video w-full flex-shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-[#DDD] sm:size-[188px]",
        className,
      )}
    >
      {isClosedGathering && (
        <div className="absolute inset-0 z-[1] flex items-center justify-center bg-black/60">
          <span className="text-center font-bold text-white sm:text-base">
            모임이 <br className="sm:hidden" />
            {isCanceledGathering ? "취소" : "마감"}되었어요
          </span>
        </div>
      )}
      <ImageWithFallback
        src={gathering.image}
        alt={gathering.name}
        fill
        sizes="188px"
        className="object-cover"
        renderFallback={() => <Dog className="size-20 sm:size-28" />}
      />
    </div>
  );
}
