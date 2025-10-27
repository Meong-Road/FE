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
      className={`group bg-card border-primary/30 hover:border-primary/50 relative overflow-hidden border-2 transition-all duration-300 select-none hover:shadow-md ${className || ""}`}
    >
      <CardContent className="px-0 py-5">{children}</CardContent>
    </Card>
  );
}

PetCard.Image = PetCardImage;
PetCard.Name = PetCardName;
PetCard.Info = PetCardInfo;
PetCard.EditBtn = PetCardEditButton;
