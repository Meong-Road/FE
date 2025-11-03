"use client";

import {
  EmptyState,
  ErrorState,
  ListContainer,
  SectionWrapper,
} from "@/components/common";
import { PetCard } from "@/components/PetCard";
import { PetCardSkeletonList } from "@/components/PetCard/Skeleton";
import { useGetPetsByUserId } from "@/hooks/queries/pets";
import { PetType } from "@/lib/types/pets";
import { processPetInfo } from "@/lib/utils/pet";

const PetCardItem = ({
  processedPet,
  petOwnerId,
}: {
  processedPet: ReturnType<typeof processPetInfo>;
  petOwnerId: number;
}) => {
  return (
    <PetCard>
      <PetCard.Image
        src={processedPet.image as string}
        alt={processedPet.name}
      />
      <PetCard.Name>{processedPet.name}</PetCard.Name>
      <PetCard.Info
        age={processedPet.age}
        gender={processedPet.genderText}
        breed={processedPet.breed}
      />
      <PetCard.EditBtn petId={processedPet.id} petOwnerId={petOwnerId} />
    </PetCard>
  );
};

const PetList = ({
  pets,
  petOwnerId,
}: {
  pets: PetType[];
  petOwnerId: number;
}) => {
  if (pets.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        등록된 반려견이 없습니다.
      </div>
    );
  }

  return (
    <ListContainer className="sm:grid sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
      {pets.map((pet) => (
        <PetCardItem
          key={pet.id}
          processedPet={processPetInfo(pet)}
          petOwnerId={petOwnerId}
        />
      ))}
    </ListContainer>
  );
};

interface UserPetCardSectionProps {
  userId: number;
}

export default function UserPetCardSection({
  userId,
}: UserPetCardSectionProps) {
  const { data: pets, isPending, isError } = useGetPetsByUserId(userId);

  if (isPending) {
    return (
      <SectionWrapper>
        <PetCardSkeletonList count={3} />
      </SectionWrapper>
    );
  }

  if (isError || !pets) {
    return <ErrorState message="반려견 정보를 불러오는데 실패했습니다." />;
  }

  if (pets.length === 0) {
    return <EmptyState message="등록된 반려견이 없어요" />;
  }

  return (
    <SectionWrapper>
      <PetList pets={pets} petOwnerId={userId} />
    </SectionWrapper>
  );
}
