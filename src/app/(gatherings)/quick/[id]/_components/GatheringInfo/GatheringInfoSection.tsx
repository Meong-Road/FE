import { QuickGatheringType } from "@/lib/types/gathering";

import QuickGatheringInfoCard from "./QuickGatheringInfoCard";

interface GatheringInfoSectionProps {
  gathering: QuickGatheringType;
}

export default function GatheringInfoSection({
  gathering,
}: GatheringInfoSectionProps) {
  return (
    <section className="mb-12 flex gap-6">
      <div className="h-[357px] w-[456px] rounded-[20px] bg-gray-200"></div>
      {/* <Image src={data.result.image} alt={data.result.name} /> */}
      <QuickGatheringInfoCard gathering={gathering} />
    </section>
  );
}
