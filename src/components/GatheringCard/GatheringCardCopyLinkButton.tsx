"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

import { useGatheringStateContext } from "@/hooks/context/useGatheringStateContext";
import { cn } from "@/lib/utils";

interface GatheringCardCopyLinkButtonProps {
  className?: string;
}

export function GatheringCardCopyLinkButton({
  className,
}: GatheringCardCopyLinkButtonProps) {
  const { gathering } = useGatheringStateContext();

  const handleCopyLink = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success(`[${gathering.name}] 모임 링크를 복사했어요`);
    } catch {
      toast.error(`[${gathering.name}] 모임 링크 복사에 실패했어요`);
    }
  };

  return (
    <button
      type="button"
      aria-label="모임 링크 복사"
      onClick={handleCopyLink}
      className={cn(
        "text-accent-foreground flex size-4 items-center justify-center",
        className,
      )}
    >
      <Copy />
    </button>
  );
}
