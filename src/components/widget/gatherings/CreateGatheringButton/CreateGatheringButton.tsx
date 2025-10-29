"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { DesktopOnly, MobileOnly } from "@/components/common";
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
}: CreateGatheringButtonProps) {
  const router = useRouter();

  const handleCreateClick = () => {
    storageUtils.setItem("canEnterCreatePage", type, "sessionStorage");
    const path =
      type === "quick" ? `${PATH.QUICK_CREATE}` : `${PATH.REGULAR_CREATE}`;
    router.push(path);
  };
  return (
    <div>
      <MobileOnly>
        <Button
          onClick={handleCreateClick}
          className={cn(
            buttonVariants({ size: "xl" }),
            "fixed right-4 bottom-4 z-50 h-14 w-14 rounded-full",
            className,
          )}
        >
          <Plus className="size-4 stroke-white" />
        </Button>
      </MobileOnly>

      <DesktopOnly>
        <Button
          onClick={handleCreateClick}
          className={cn(buttonVariants({ size: "xl" }), className)}
        >
          <Plus className="size-4 stroke-white" />
          <span>모임 만들기</span>
        </Button>
      </DesktopOnly>
    </div>
  );
}
