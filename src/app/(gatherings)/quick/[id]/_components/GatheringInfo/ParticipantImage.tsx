import ProfileSvg from "@/assets/images/profile.svg";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { UserType } from "@/lib/types/user";

interface ParticipantImageProps {
  participant: UserType;
}

export default function ParticipantImage({
  participant,
}: ParticipantImageProps) {
  return (
    <div className="relative size-7 overflow-hidden rounded-full">
      <ImageWithFallback
        src={participant.image}
        alt={participant.name}
        fill
        sizes="28px"
        className="object-cover"
        renderFallback={() => (
          <ProfileSvg className="size-7 rounded-full border border-[#DDDDDD] bg-white" />
        )}
      />
    </div>
  );
}
