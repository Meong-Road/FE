"use client";

import {
  ErrorState,
  ListContainer,
  LoadingState,
  SectionWrapper,
} from "@/components/common";
import { PetAddCard } from "@/components/PetAddCard";
import { PetCard } from "@/components/PetCard";
import { useGetMyPets } from "@/hooks/queries/pets";
import { PetType } from "@/lib/types/pets";
import { processPetInfo } from "@/lib/utils/pet";

const PetCardItem = ({
  processedPet,
}: {
  processedPet: ReturnType<typeof processPetInfo>;
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
      <PetCard.EditBtn petId={processedPet.id} />
    </PetCard>
  );
};

const PetAddCardItem = () => {
  return (
    <PetAddCard>
      <PetAddCard.Icon />
      <PetAddCard.Title>반려견 추가</PetAddCard.Title>
      <PetAddCard.Description>새 반려견을 추가해보세요</PetAddCard.Description>
    </PetAddCard>
  );
};

const PetList = ({ pets }: { pets: PetType[] }) => {
  if (pets.length === 0)
    return (
      <ListContainer className="sm:grid sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        <PetAddCardItem />
      </ListContainer>
    );

  return (
    <ListContainer className="sm:grid sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
      {pets.map((pet) => (
        <PetCardItem key={pet.id} processedPet={processPetInfo(pet)} />
      ))}
      <PetAddCardItem />
    </ListContainer>
  );
};

export default function PetCardSection() {
  const { data: pets, isPending, isError } = useGetMyPets();

  //임시 주석처리
  if (isPending)
    return (
      <LoadingState
        message="반려견 정보를 불러오고 있어요..."
        minHeight="200px"
      />
    );
  if (!pets || isError)
    return (
      <ErrorState
        message="등록한 반려견 정보를 불러오는데 실패했습니다."
        minHeight="200px"
      />
    );

  return (
    <SectionWrapper>
      <PetList pets={pets} />
    </SectionWrapper>
  );
}
