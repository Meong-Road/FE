import Dog from "@/assets/images/dog.svg";
import { useGatheringStateContext } from "@/hooks/context/useGatheringStateContext";
import { checkIsClosedGatheringState } from "@/lib/utils/gathering";

import ImageWithFallback from "../common/ImageWithFallback";

export function GatheringCardImage() {
  const { gathering, state } = useGatheringStateContext();
  const isClosedGathering = checkIsClosedGatheringState(state);

  return (
    <div className="relative flex size-[188px] items-center justify-center overflow-hidden rounded-3xl">
      {isClosedGathering && (
        <div className="absolute inset-0 z-[5] flex items-center justify-center bg-black/60">
          <span className="text-base font-bold text-white">
            모집이 마감되었어요
          </span>
        </div>
      )}
      <ImageWithFallback
        src={gathering.image}
        alt={gathering.name}
        fill
        sizes="188px"
        className="object-cover"
        renderFallback={() => <Dog className="size-28" />}
      />
    </div>
  );
}
