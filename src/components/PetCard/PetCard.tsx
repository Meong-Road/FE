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
      className={`group bg-card hover:bg-primary/5 border-primary/50 relative overflow-hidden transition-all select-none hover:shadow-md ${className || ""}`}
    >
      <CardContent className="pt-4 pb-6">{children}</CardContent>
    </Card>
  );
}

PetCard.Image = PetCardImage;
PetCard.Name = PetCardName;
PetCard.Info = PetCardInfo;
PetCard.EditBtn = PetCardEditButton;
