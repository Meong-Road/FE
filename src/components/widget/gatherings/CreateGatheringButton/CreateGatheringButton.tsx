"use client";

import { useRouter } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import { PATH } from "@/lib/constants/path";
import { cn } from "@/lib/utils";
import { storageUtils } from "@/lib/utils/storage";

interface CreateGatheringButtonProps {
  type: "quick" | "regular";
  className?: string;
  children?: React.ReactNode;
}

export function CreateGatheringButton({
  type,
  className,
  children = "+ 모임 만들기",
}: CreateGatheringButtonProps) {
  const router = useRouter();

  const handleCreateClick = () => {
    storageUtils.setItem("canEnterCreatePage", type, "sessionStorage");
    const path =
      type === "quick" ? `${PATH.QUICK_CREATE}` : `${PATH.REGULAR_CREATE}`;
    router.push(path);
  };
  return (
    <Button
      onClick={handleCreateClick}
      className={cn(buttonVariants({ size: "xl" }), className)}
    >
      {children}
    </Button>
  );
}
