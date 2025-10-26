"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { PATH } from "@/lib/constants/path";
import { EGatheringType } from "@/lib/types/gatherings";

import { ReviewCardGatheringTitleProps } from "../types";

export function GatheringTitle({
  children,
  gatheringId,
}: ReviewCardGatheringTitleProps) {
  return (
    <Link
      href={PATH.DETAIL(gatheringId, EGatheringType.REGULAR)}
      className="group/link flex size-fit items-center gap-1 transition-colors"
    >
      <h3 className="group-hover/link:text-primary line-clamp-1 text-lg font-semibold text-zinc-900 transition-colors sm:text-xl">
        {children}
      </h3>
      <ChevronRight className="group-hover/link:text-primary size-4 flex-shrink-0 text-zinc-400 transition-colors" />
    </Link>
  );
}
