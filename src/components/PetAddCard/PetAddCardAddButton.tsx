import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePetInfoModalStore } from "@/store/modalStore";

interface PetAddCardAddButtonProps {
  className?: string;
}

export function PetAddCardAddButton({ className }: PetAddCardAddButtonProps) {
  const { setModalData, openModal } = usePetInfoModalStore();

  const handleClick = () => {
    setModalData("add-pet");
    openModal();
  };

  return (
    <Button
      size="lg"
      variant="default"
      onClick={handleClick}
      className={`bg-primary text-primary-foreground hover:bg-primary/90 h-8 w-full rounded-xl opacity-0 transition-opacity group-hover:opacity-100 ${className || ""}`}
    >
      <Plus className="h-3.5 w-3.5" />
      <span className="sr-only">반려견 추가</span>
    </Button>
  );
}
