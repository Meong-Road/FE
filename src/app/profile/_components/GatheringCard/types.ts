export interface GatheringCardProps {
  children: React.ReactNode;
  bgColor: "white" | "gradient";
}

export interface GatheringCardTitleProps {
  children: React.ReactNode;
}

export interface GatheringCardPeopleProps {
  people: number;
  limit: number;
}

export interface GatheringCardInfoProps {
  location: string;
  date: string;
  time: string;
}
