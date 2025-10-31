import { useGatheringStateContext } from "@/hooks/context/useGatheringStateContext";
import { useGet4Participants } from "@/hooks/queries/gatherings/useGet4Participants";
import { useModalStore } from "@/store/modalStore";

import ParticipantImage from "./ParticipantImage";
import ParticipantImageList from "./ParticipantImageList";

function ParticipantsSummary() {
  const { gathering } = useGatheringStateContext();
  const { data: participants } = useGet4Participants({ id: gathering.id });
  const { openModal } = useModalStore();

  const handleClick = () => {
    openModal({
      title: "참여자 목록",
      content: <ParticipantImageList gatheringId={gathering.id} />,
    });
  };

  return (
    <button className="flex items-center gap-3" onClick={handleClick}>
      <div className="font-semibold">참여자 {gathering.participantCount}명</div>
      <div className="flex h-7 space-x-[-10px]">
        {participants?.reverse().map((participant) => (
          <ParticipantImage
            key={`participant-image-${participant.id}`}
            participant={participant}
          />
        ))}
        {gathering.participantCount > 4 && (
          <div className="bg-secondary text-primary z-10 flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold">
            +{gathering.participantCount - 4}
          </div>
        )}
      </div>
    </button>
  );
}

export default ParticipantsSummary;
