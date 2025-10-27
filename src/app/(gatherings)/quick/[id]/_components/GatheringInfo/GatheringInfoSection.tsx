import { GatheringCardProvider } from "@/components/GatheringCard/GatheringCardProvider";
import { useAuth } from "@/hooks/auth/useAuth";
import { useGetMyPets } from "@/hooks/queries/pets/useGetMyPets";
import { GatheringType } from "@/lib/types/gatherings";
import { getGatheringState } from "@/lib/utils/gathering";

import GatheringInfoCard from "./GatheringInfoCard";
import GatheringInfoImage from "./GatheringInfoImage";

interface GatheringInfoSectionProps {
  gathering: GatheringType;
}

export default function GatheringInfoSection({
  gathering,
}: GatheringInfoSectionProps) {
  const { user } = useAuth();
  const { data: pets } = useGetMyPets({ enabled: !!user });
  const hasPet = pets && pets.length > 0;

  const state = getGatheringState(gathering, !!user, !!hasPet);
  const value = {
    gathering,
    state,
    user,
  };

  return (
    <GatheringCardProvider value={value}>
      <section className="mb-12 flex gap-6">
        <GatheringInfoImage />
        <GatheringInfoCard />
      </section>
    </GatheringCardProvider>
  );
}
