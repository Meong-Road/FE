"use client";

import {
  EmptyState,
  ErrorState,
  ListContainer,
  LoadingState,
  SectionWrapper,
} from "@/components/common";
import PetInfoModal from "@/components/Modal/PetInfoModal";
import { PetAddCard } from "@/components/PetAddCard";
import { PetCard } from "@/components/PetCard";
import { useGetMyPets } from "@/hooks/queries/pets";
import { PetType } from "@/lib/types/pets";
import { processPetInfo } from "@/lib/utils/pet";
import { usePetInfoModalStore } from "@/store/modalStore";

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
      <PetAddCard.Description>
        새로운 반려견 정보를
        <br />
        등록해보세요
      </PetAddCard.Description>
    </PetAddCard>
  );
};

const PetList = ({ pets }: { pets: PetType[] }) => {
  if (pets.length === 0)
    return (
      <EmptyState
        message="아직 등록한 반려견 정보가 없어요"
        minHeight="200px"
      />
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
  const { isOpen, modalType, petId, closeModal } = usePetInfoModalStore();
  const { data: pets, isPending, isError } = useGetMyPets();

  if (isPending) return <LoadingState message="로딩 중..." minHeight="200px" />;
  if (!pets || isError)
    return (
      <ErrorState
        message="데이터를 불러오는데 실패했습니다."
        minHeight="200px"
      />
    );

  return (
    <>
      <SectionWrapper>
        <PetList pets={pets} />
      </SectionWrapper>

      {isOpen && modalType && (
        <PetInfoModal type={modalType} onClose={closeModal} petId={petId} />
      )}
    </>
  );
}
