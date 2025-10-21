"use client";

import {
  EmptyState,
  ErrorState,
  ListContainer,
  LoadingState,
  SectionWrapper,
} from "@/components/common";
import PetInfoModal from "@/components/Modal/PetInfoModal";
import { useGetMyPets } from "@/hooks/queries/pets";
import { PetType } from "@/lib/types/pets";
import { processPetInfo } from "@/lib/utils/pet";
import { usePetInfoModalStore } from "@/store/modalStore";

import { PetAdd } from "./PetAdd";
import { PetCard } from "./PetCard";

const PetCardItem = ({ pet }: { pet: ReturnType<typeof processPetInfo> }) => {
  return (
    <PetCard>
      <PetCard.Image image={pet.image} />
      <PetCard.Info
        name={pet.name}
        age={pet.age}
        gender={pet.genderText}
        type={pet.breed}
      />
      <PetCard.EditBtn petId={pet.id} />
    </PetCard>
  );
};

const PetList = ({ pets }: { pets: PetType[] }) => (
  <ListContainer className="flex flex-wrap gap-6">
    {pets.map((pet) => (
      <PetCardItem key={pet.id} pet={processPetInfo(pet)} />
    ))}
    <PetAdd>
      <PetAdd.Image />
      <PetAdd.Btn />
    </PetAdd>
  </ListContainer>
);

const PetEmptyState = () => (
  <>
    <PetAdd>
      <PetAdd.Image />
      <PetAdd.Btn />
    </PetAdd>
    <EmptyState message="등록된 반려견 정보가 없습니다." minHeight="200px" />
  </>
);

export default function PetCardSection() {
  const { isOpen, modalType, petId, closeModal } = usePetInfoModalStore();
  const { data: pets, isLoading, error } = useGetMyPets();

  if (isLoading) return <LoadingState message="로딩 중..." />;
  if (error) return <ErrorState message="데이터를 불러오는데 실패했습니다." />;

  return (
    <>
      {pets?.length ? (
        <SectionWrapper>
          <PetList pets={pets} />
        </SectionWrapper>
      ) : (
        <PetEmptyState />
      )}

      {isOpen && modalType && (
        <PetInfoModal type={modalType} onClose={closeModal} petId={petId} />
      )}
    </>
  );
}
