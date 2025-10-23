import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useUserInfoModalStore } from "@/store/modalStore";

interface ProfileCardEditBtnProps {
  userId: number;
  className?: string;
}

export function ProfileCardEditBtn({
  userId,
  className,
}: ProfileCardEditBtnProps) {
  const { openModal } = useUserInfoModalStore();

  const handleClick = () => {
    openModal("edit-user", userId);
  };

  return (
    <Button
      size="icon"
      variant="default"
      onClick={handleClick}
      className={`bg-primary/50 text-primary-foreground hover:bg-primary group-hover:bg-primary absolute top-3 right-3 h-8 w-8 cursor-pointer rounded-full transition-all hover:scale-105 ${className || ""}`}
    >
      <Pencil className="size-3.5" />
      <span className="sr-only">프로필 수정</span>
    </Button>
  );
}
