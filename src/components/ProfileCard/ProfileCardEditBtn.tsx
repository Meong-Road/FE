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
      className={`text-background absolute top-4 right-4 h-8 w-8 cursor-pointer rounded-full bg-zinc-400/50 transition-all group-hover:bg-zinc-400/75 hover:scale-105 hover:bg-zinc-400 active:scale-95 active:bg-zinc-500 ${className || ""}`}
    >
      <Pencil className="size-3.5" />
      <span className="sr-only">프로필 수정</span>
    </Button>
  );
}
