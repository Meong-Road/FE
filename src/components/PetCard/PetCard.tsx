import { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { PetCardEditButton } from "./PetCardEditButton";
import { PetCardImage } from "./PetCardImage";
import { PetCardInfo } from "./PetCardInfo";
import { PetCardName } from "./PetCardName";

interface PetCardProps {
  children: ReactNode;
  className?: string;
}

export function PetCard({ children, className }: PetCardProps) {
  return (
    <Card
      className={`group border-secondary/50 bg-secondary/20 hover:border-primary/30 relative overflow-hidden border-2 transition-all hover:shadow-lg ${className || ""}`}
    >
      <CardContent className="p-5">{children}</CardContent>
    </Card>
  );
}

PetCard.Image = PetCardImage;
PetCard.Name = PetCardName;
PetCard.Info = PetCardInfo;
PetCard.EditBtn = PetCardEditButton;
