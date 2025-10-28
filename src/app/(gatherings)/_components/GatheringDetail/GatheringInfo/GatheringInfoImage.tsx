import Dog from "@/assets/images/dog.svg";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { useGatheringStateContext } from "@/hooks/context/useGatheringStateContext";
import {
  checkIsCanceledGatheringState,
  checkIsClosedGatheringState,
} from "@/lib/utils/gathering";

export default function GatheringInfoImage() {
  const { gathering, state } = useGatheringStateContext();
  const isClosedGathering = checkIsClosedGatheringState(state);
  const isCanceledGathering = checkIsCanceledGatheringState(state);

  return (
    <div className="relative flex h-[357px] w-[456px] items-center justify-center overflow-hidden rounded-[20px] border border-[#ddd] bg-white">
      {isClosedGathering && (
        <div className="absolute inset-0 z-[5] flex items-center justify-center bg-black/60">
          <span className="text-base font-bold text-white">
            {isCanceledGathering
              ? "모임이 취소되었어요"
              : "모집이 마감되었어요"}
          </span>
        </div>
      )}
      <ImageWithFallback
        src={gathering.image}
        alt={gathering.name}
        fill
        sizes="456px"
        className="object-cover"
        renderFallback={() => <Dog className="size-28" />}
      />
    </div>
  );
}
