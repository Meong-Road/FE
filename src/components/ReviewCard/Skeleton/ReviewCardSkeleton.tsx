import { cn } from "@/lib/utils";

import { SkeletonBody } from "./SkeletonBody";
import { SkeletonHeader } from "./SkeletonHeader";
import { SkeletonImage } from "./SkeletonImage";

interface ReviewCardSkeletonProps {
  className?: string;
}

export function ReviewCardSkeleton({ className }: ReviewCardSkeletonProps) {
  return (
    <li className={cn("relative rounded-3xl bg-white shadow-sm", className)}>
      <section className="block h-full w-full p-4 sm:p-5 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-5 md:gap-6">
          <SkeletonImage />
          <div className="flex flex-1 flex-col gap-3">
            <SkeletonHeader />
            <SkeletonBody />
          </div>
        </div>
      </section>
    </li>
  );
}

// 합성 컴포넌트
ReviewCardSkeleton.Image = SkeletonImage;
ReviewCardSkeleton.Header = SkeletonHeader;
ReviewCardSkeleton.Body = SkeletonBody;
