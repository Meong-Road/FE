import { GatheringType } from "@/lib/types/gathering";

export interface GatheringCardProps {
  className?: string;
  children: React.ReactNode;
  bgColor: "white" | "gradient";
}

export interface GatheringCardTitleProps {
  className?: string;
  children: React.ReactNode;
}

export interface GatheringCardPeopleProps {
  people: number;
  limit: number;
}

export interface GatheringCardInfoProps {
  className?: string;
  location: GatheringType["location"];
  date?: string;
  time?: string;
  days?: string;
}

export interface GatheringCardDeadlineBadgeProps {
  registrationEnd: GatheringType["registrationEnd"];
}
