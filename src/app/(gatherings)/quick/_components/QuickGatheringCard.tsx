import { UserRound } from "lucide-react";
import Image from "next/image";

import DeadlineTag from "@/components/Gathering/DeadlineTag";
import LikeButton from "@/components/Gathering/LikeButton";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/utils/dateTime";
import { QuickGatheringType } from "@/utils/types/gathering";

interface GatheringCardProps {
  gathering: QuickGatheringType;
}

export default function QuickGatheringCard({ gathering }: GatheringCardProps) {
  const handleParticipateButtonClick = () => {
    // TODO
    console.log("참여하기");
  };

  return (
    <Card className="flex flex-row gap-6 p-4">
      <div className="relative aspect-square w-full max-w-40">
        {gathering.image && (
          <Image
            src={gathering.image}
            className="rounded-3xl bg-slate-200 object-cover"
            alt={gathering.name}
            fill
          />
        )}
      </div>

      <div className="flex w-full flex-col gap-10 py-2">
        <div className="flex w-full justify-between gap-2">
          <div className="flex flex-col gap-2">
            <div className="text-xl font-bold">{gathering.name}</div>
            <div>
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                <div className="flex gap-2">
                  <div className="text-sm font-medium text-slate-400">위치</div>
                  <div className="text-sm font-medium text-slate-500">
                    {gathering.location}
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="text-sm font-medium text-slate-400">날짜</div>
                  <div className="text-sm font-medium tracking-tighter text-slate-500">
                    {formatDate(gathering.dateTime)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <LikeButton />
        </div>

        <div className="flex items-end justify-between gap-10">
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <DeadlineTag registrationEnd={gathering.registrationEnd} />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-grow items-center gap-2">
                <UserRound className="size-5 shrink-0 fill-slate-500 stroke-transparent" />
                <ProgressBar
                  percentage={Math.ceil(
                    (gathering.participantCount / gathering.capacity) * 100,
                  )}
                />
              </div>
              <div className="text-sm text-slate-500">
                <span className="text-primary">
                  {gathering.participantCount}
                </span>
                /{gathering.capacity}
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 hover:text-primary cursor-pointer"
            onClick={handleParticipateButtonClick}
          >
            참여하기
          </Button>
        </div>
      </div>
    </Card>
  );
}
