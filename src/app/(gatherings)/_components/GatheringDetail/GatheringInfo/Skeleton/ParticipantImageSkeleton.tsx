import { VariantProps } from "class-variance-authority";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import { participantImageVariants } from "../Participants/ParticipantImage";

function ParticipantImageSkeleton({
  size = "sm",
}: VariantProps<typeof participantImageVariants>) {
  return (
    <Skeleton
      className={cn(
        "relative overflow-hidden rounded-full",
        participantImageVariants({ size }),
      )}
    />
  );
}

export default ParticipantImageSkeleton;
