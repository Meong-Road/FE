import Dog from "@/assets/images/dog.svg";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { GatheringType } from "@/lib/types/gatherings";

import GatheringInfoCard from "./GatheringInfoCard";

interface GatheringInfoSectionProps {
  gathering: GatheringType;
}

export default function GatheringInfoSection({
  gathering,
}: GatheringInfoSectionProps) {
  return (
    <section className="mb-12 flex gap-6">
      <div className="relative flex h-[357px] w-[456px] items-center justify-center overflow-hidden rounded-[20px] border border-[#ddd] bg-white">
        <ImageWithFallback
          src={gathering.image}
          alt={gathering.name}
          fill
          sizes="188px"
          className="object-cover"
          renderFallback={() => <Dog className="size-28" />}
        />
      </div>
      <GatheringInfoCard gathering={gathering} />
    </section>
  );
}
