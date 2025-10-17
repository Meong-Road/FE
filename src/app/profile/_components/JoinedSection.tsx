"use client";

import Link from "next/link";

import { useGetJoinedGatherings } from "@/hooks/queries/gatherings";
import { PATH } from "@/lib/constants/path";
import { formatDate, formatDays } from "@/lib/utils/dateTime";

import { GatheringCard } from "../../../components/GatheringCard/GatheringCard";

export default function JoinedSection() {
  const { data: gatherings, isLoading } = useGetJoinedGatherings({
    page: 0,
    size: 10,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-400">로딩 중...</p>
      </div>
    );
  }

  if (!gatherings || gatherings.content.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-400">참석한 모임이 없습니다.</p>
      </div>
    );
  }

  return (
    <section>
      <ul className="space-y-3 sm:space-y-4">
        {gatherings.content.map((gathering) => {
          const isRegular = gathering.type === "REGULAR";
          const detailPath = isRegular
            ? PATH.REGULAR_DETAIL(gathering.id)
            : PATH.QUICK_DETAIL(gathering.id);

          // 날짜 및 시간 정보 추출
          const dateInfo = isRegular
            ? formatDays(gathering.days)
            : formatDate(gathering.dateTime);

          return (
            <Link key={gathering.id} href={detailPath}>
              <GatheringCard bgColor="white">
                <div className="flex items-center gap-6">
                  <GatheringCard.Image />
                  <div>
                    <div className="mb-4 flex gap-2">
                      <GatheringCard.AttendanceBadge />
                      <GatheringCard.ConfirmedBadge />
                    </div>
                    <GatheringCard.Title>{gathering.name}</GatheringCard.Title>
                    <GatheringCard.People
                      people={gathering.participantCount}
                      limit={gathering.capacity}
                    />
                    <GatheringCard.Info
                      location={gathering.location}
                      date={dateInfo}
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
