"use client";

import Modal from "@/components/Modal/Modal";
import PetInfoModal from "@/components/Modal/PetInfoModal";
import { useGetMyPetInfo } from "@/hooks/queries/pets";
import { PetType } from "@/lib/types/pets";
import { useModalStore } from "@/store/modalStore";

import { PetAdd } from "./PetAdd";
import { PetCard } from "./PetCard";

export default function PetCardSection() {
  const { isOpen, modalType, closeModal } = useModalStore();
  const { data: pets, isLoading, error } = useGetMyPetInfo();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-400">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-red-400">데이터를 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  return (
    <>
      <ul className="flex flex-wrap gap-6">
        {pets && pets.length > 0
          ? pets.map((pet: PetType) => {
              // 나이 계산
              const currentYear = new Date().getFullYear();
              const age = currentYear - parseInt(pet.birthYear);
              const ageText = `${age}살`;

              // 성별 한글 변환
              const genderText = pet.gender === "MALE" ? "남" : "여";

              return (
                <PetCard key={pet.id}>
                  <PetCard.Image image={pet.image} />
                  <PetCard.Info
                    name={pet.name}
                    age={ageText}
                    gender={genderText}
                    type={pet.breed}
                  />
                </PetCard>
              );
            })
          : null}
        <PetAdd>
          <PetAdd.Image />
          <PetAdd.Btn />
        </PetAdd>
      </ul>

      {pets && pets.length === 0 && (
        <div className="flex min-h-[200px] w-full items-center justify-center">
          <p className="text-slate-400">등록된 반려견 정보가 없습니다.</p>
        </div>
      )}

      {/* 추가 */}
      {isOpen && modalType && (
        <Modal hasCloseButton>
          <PetInfoModal type={modalType} onClose={closeModal} />
        </Modal>
      )}
    </>
  );
}
