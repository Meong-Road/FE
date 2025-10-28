import { useGatheringStateContext } from "@/hooks/context/useGatheringStateContext";
import { cn } from "@/lib/utils";
import { formatDate, formatDays } from "@/lib/utils/dateTime";
import { isRegularGathering } from "@/lib/utils/typeGuard";

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

interface GatheringCardInfoProps {
  className?: string;
}

export function GatheringCardInfo({ className }: GatheringCardInfoProps) {
  const { gathering } = useGatheringStateContext();

  return (
    <div
      className={cn(
        "flex flex-row flex-wrap items-center gap-x-2 gap-y-1",
        className,
      )}
    >
      <TextWrapper>
        <Title>위치</Title>
        <Content>{gathering.location}</Content>
      </TextWrapper>
      {isRegularGathering(gathering) ? (
        <>
          <Bar />
          <TextWrapper>
            <Title>요일</Title>
            <Content>{formatDays(gathering.days)}</Content>
          </TextWrapper>
        </>
      ) : (
        <>
          <Bar />
          <TextWrapper>
            <Title>날짜</Title>
            <Content>{formatDate(gathering.dateTime)}</Content>
          </TextWrapper>
        </>
      )}
    </div>
  );
}
