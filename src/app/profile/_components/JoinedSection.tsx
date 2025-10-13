import Link from "next/link";

import { GatheringCard } from "../../../components/GatheringCard/GatheringCard";

export default function JoinedSection() {
  const gathering = { id: 1 };
  return (
    <section>
      <ul>
        {/* Regular gathering 일 때 */}
        <Link href={`/regular/${gathering.id}`}>
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
                  location="성북구"
                  date="11월 17일"
                  time="17:30"
                />
              </div>
            </div>
            <GatheringCard.LikeBtn
              id={gathering.id}
              className="absolute top-8 right-6"
            />
            <GatheringCard.JoinBtn className="absolute right-6 bottom-6" />
          </GatheringCard>
        </Link>
      </ul>
    </section>
  );
}
