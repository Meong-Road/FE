import { GatheringCard } from "./GatheringCard/GatheringCard";

export default function JoinedSection() {
  return (
    <ul>
      <GatheringCard bgColor="white">
        <div className="flex items-center gap-6">
          <GatheringCard.Image />
          <div>
            <div className="mb-4 flex gap-2">
              <GatheringCard.AttendanceBadge />
              <GatheringCard.ConfirmedBadge />
            </div>
            <GatheringCard.Title>리트리버 모여라</GatheringCard.Title>
            <GatheringCard.People people={20} limit={20} />
            <GatheringCard.Info
              location="을지로 3가"
              date="11월 17일"
              time="17:30"
            />
          </div>
        </div>
      </GatheringCard>
    </ul>
  );
}
