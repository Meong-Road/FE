import { cva, VariantProps } from "class-variance-authority";

import ProfileSvg from "@/assets/images/profile.svg";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { UserType } from "@/lib/types/user";
import { cn } from "@/lib/utils";

interface ParticipantImageProps
  extends VariantProps<typeof participantImageVariants> {
  participant: UserType;
}

const SIZE_MAP = {
  sm: 28,
  md: 40,
  lg: 48,
};

export const participantImageVariants = cva("", {
  variants: {
    size: {
      sm: "size-7",
      md: "size-10",
      lg: "size-12",
    },
  },
});

export default function ParticipantImage({
  participant,
  size = "sm",
}: ParticipantImageProps) {
  return (
    <div
      className={cn(
        "relative flex size-7 items-center justify-center overflow-hidden rounded-full border border-[#DDDDDD]",
        participantImageVariants({ size }),
      )}
    >
      <ImageWithFallback
        src={participant.image}
        alt={participant.name}
        fill
        sizes={`${SIZE_MAP[size!]}px`}
        className="object-cover"
        renderFallback={() => (
          <ProfileSvg
            className={cn(
              "rounded-full bg-white",
              participantImageVariants({ size }),
            )}
          />
        )}
      />
    </div>
  );
}
