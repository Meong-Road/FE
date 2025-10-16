"use client";

import Link from "next/link";

import { GatheringCard } from "@/components/GatheringCard/GatheringCard";
import { PATH } from "@/lib/constants/path";
import { mockJoinedGatherings } from "@/mocks/data/profile";

import { formatDateTime } from "../util/date";

export default function JoinedSection() {
  return (
    <section>
      <ul className="flex flex-col gap-6">
        {mockJoinedGatherings.map((gathering) => {
          const { date, time } = formatDateTime(gathering.meetingAt);
          const isConfirmed = gathering.participantCount >= gathering.capacity;

          return (
            <Link key={gathering.id} href={PATH.REGULAR_DETAIL(gathering.id)}>
              <GatheringCard bgColor="white">
                <div className="flex items-center gap-6">
                  <GatheringCard.Image />
                  <div>
                    <div className="mb-4 flex gap-2">
                      <GatheringCard.AttendanceBadge />
                      {isConfirmed && <GatheringCard.ConfirmedBadge />}
                    </div>
                    <GatheringCard.Title>{gathering.name}</GatheringCard.Title>
                    <GatheringCard.People
                      people={gathering.participantCount}
                      limit={gathering.capacity}
                    />
                    <GatheringCard.Info
                      location={gathering.location}
                      date={date}
                      time={time}
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
          );
        })}
      </ul>
    </section>
  );
}
