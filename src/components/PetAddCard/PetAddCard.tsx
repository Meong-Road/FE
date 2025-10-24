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
      className={`group border-border bg-background hover:bg-card relative cursor-pointer overflow-hidden border-2 opacity-75 transition-all select-none hover:opacity-100 hover:shadow-md ${className || ""}`}
    >
      <CardContent className="p-5">{children}</CardContent>
    </Card>
  );
}

PetAddCard.AddButton = PetAddCardAddButton;
PetAddCard.Icon = PetAddCardIcon;
PetAddCard.Title = PetAddCardTitle;
PetAddCard.Description = PetAddCardDescription;
