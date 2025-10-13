import { EDayOfWeek } from "@/lib/types/date";
import { cn } from "@/lib/utils";

import { GatheringCardInfoProps } from "./types";

function TextWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-1.5">{children}</div>;
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h5 className="text-muted-foreground text-sm font-medium">{children}</h5>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-medium text-slate-500">{children}</span>;
}

function Bar() {
  return <div className="h-2 w-0.5 bg-slate-200"></div>;
}

export function GatheringCardInfo({
  className,
  location,
  date,
  time,
  days,
}: GatheringCardInfoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <TextWrapper>
        <Title>위치</Title>
        <Content>{location}</Content>
      </TextWrapper>
      {date && (
        <>
          <Bar />
          <TextWrapper>
            <Title>날짜</Title>
            <Content>{date}</Content>
          </TextWrapper>
        </>
      )}
      {days && (
        <>
          <Bar />
          <TextWrapper>
            <Title>요일</Title>
            <Content>
              {(JSON.parse(days) as (keyof typeof EDayOfWeek)[])
                .map((d) => EDayOfWeek[d])
                .join(", ")}
            </Content>
          </TextWrapper>
        </>
      )}
      {time && (
        <>
          <Bar />
          <TextWrapper>
            <Title>시간</Title>
            <Content>{time}</Content>
          </TextWrapper>
        </>
      )}
    </div>
  );
}
