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
  location,
  date,
  time,
}: GatheringCardInfoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <TextWrapper>
        <Title>위치</Title>
        <Content>{location}</Content>
      </TextWrapper>
      <Bar />
      <TextWrapper>
        <Title>날짜</Title>
        <Content>{date}</Content>
      </TextWrapper>
      <Bar />
      <TextWrapper>
        <Title>시간</Title>
        <Content>{time}</Content>
      </TextWrapper>
    </div>
  );
}
