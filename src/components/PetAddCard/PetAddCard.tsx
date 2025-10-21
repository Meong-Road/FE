import { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { usePetInfoModalStore } from "@/store/modalStore";

import { PetAddCardAddButton } from "./PetAddCardAddButton";
import { PetAddCardDescription } from "./PetAddCardDescription";
import { PetAddCardIcon } from "./PetAddCardIcon";
import { PetAddCardTitle } from "./PetAddCardTitle";

interface PetAddCardProps {
  children: ReactNode;
  className?: string;
}

export function PetAddCard({ children, className }: PetAddCardProps) {
  const { setModalData, openModal } = usePetInfoModalStore();

  const handleClick = () => {
    setModalData("add-pet");
    openModal();
  };

  return (
    <Card
      onClick={handleClick}
      className={`group border-secondary/50 bg-secondary/10 hover:border-primary/50 hover:bg-primary/5 relative cursor-pointer overflow-hidden border-2 border-dashed transition-all select-none ${className || ""}`}
    >
      <CardContent className="p-5">{children}</CardContent>
    </Card>
  );
}

PetAddCard.AddButton = PetAddCardAddButton;
PetAddCard.Icon = PetAddCardIcon;
PetAddCard.Title = PetAddCardTitle;
PetAddCard.Description = PetAddCardDescription;
