import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePetInfoModalStore } from "@/store/modalStore";

interface PetCardEditButtonProps {
  petId: number;
  className?: string;
}

export function PetCardEditButton({
  petId,
  className,
}: PetCardEditButtonProps) {
  const { setModalData, openModal } = usePetInfoModalStore();

  const handleClick = () => {
    setModalData("edit-pet", petId);
    openModal();
  };

  return (
    <Button
      size="icon"
      variant="default"
      onClick={handleClick}
      className={`bg-primary text-primary-foreground hover:bg-primary/90 absolute top-3 right-3 h-8 w-8 cursor-pointer rounded-full opacity-50 transition-opacity group-hover:opacity-100 ${className || ""}`}
    >
      <Pencil className="h-3.5 w-3.5" />
      <span className="sr-only">반려견 정보 수정</span>
    </Button>
  );
}
