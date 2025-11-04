import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth";
import { usePetInfoModalStore } from "@/store/modalStore";

interface PetCardEditButtonProps {
  petId: number;
  petOwnerId: number;
  className?: string;
}

export function PetCardEditButton({
  petId,
  petOwnerId,
  className,
}: PetCardEditButtonProps) {
  const { user } = useAuth();
  const { setModalData, openModal } = usePetInfoModalStore();

  // 본인의 반려견이 아니면 버튼 숨김
  if (user?.id !== petOwnerId) {
    return null;
  }

  const handleClick = () => {
    setModalData("edit-pet", petId);
    openModal();
  };

  return (
    <Button
      size="icon"
      variant="default"
      onClick={handleClick}
      className={`bg-primary/50 text-primary-foreground hover:bg-primary group-hover:bg-primary active:bg-primary/75 absolute top-3 right-3 h-8 w-8 cursor-pointer rounded-full transition-all hover:scale-105 active:scale-95 ${className || ""}`}
    >
      <Pencil className="size-3.5" />
      <span className="sr-only">반려견 정보 수정</span>
    </Button>
  );
}
