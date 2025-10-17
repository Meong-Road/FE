import { useMemo } from "react";
import { useParams } from "next/navigation";

import { useGetPet, usePostPet, usePutPet } from "@/hooks/queries/pets";
import { PetType } from "@/lib/types/pets";

import { PetInfoModalProps } from "../types/petInfoModal";

import { PetInfoFormSchema, PetInfoUpdateSchema } from "./usePetInfoForm";

/**
 * 펫 정보를 폼 스키마 형태로 변환하는 유틸 함수
 */
const transformPetToFormData = (pet: PetType): PetInfoFormSchema => ({
  name: pet?.name || "",
  gender: pet?.gender?.toLowerCase() as "male" | "female",
  birthYear: pet?.birthYear || "",
  breed: pet?.breed || "",
  neuter:
    pet?.neuter === true ? "did" : pet?.neuter === false ? "didnot" : undefined,
  existingPhotoUrl: pet?.image,
});

/**
 * 데이터 변경 여부를 확인하는 유틸 함수
 */
const hasChanges = (
  currentData: PetInfoUpdateSchema,
  initialData: PetInfoFormSchema | null,
): boolean => {
  if (!initialData) return false;

  return Object.keys(currentData).some((key) => {
    const currentValue = currentData[key as keyof typeof currentData];
    const initialValue = initialData[key as keyof typeof initialData];
    return currentValue !== initialValue;
  });
};

export function usePetInfoModal({ type, onClose }: PetInfoModalProps) {
  const { id } = useParams();
  const petId = id ? Number(id) : undefined;

  // 편집 모드일 때 펫 정보 조회
  const { data: petData, isLoading: isPetLoading } = useGetPet(petId || 0, {
    enabled: type === "edit-pet" && !!petId,
  });

  // 펫 생성 mutation
  const createPetMutation = usePostPet();

  // 펫 수정 mutation
  const updatePetMutation = usePutPet();

  // 초기 데이터 변환
  const initialData = useMemo(() => {
    if (type === "edit-pet" && petData) {
      return transformPetToFormData(petData);
    }
    return null;
  }, [type, petData]);

  // 변경사항 확인 함수
  const checkChanges = useMemo(
    () =>
      type === "edit-pet"
        ? (currentData: PetInfoUpdateSchema) =>
            hasChanges(currentData, initialData)
        : undefined,
    [type, initialData],
  );

  // 폼 제출 핸들러
  const handleSubmit = async (
    data: PetInfoFormSchema | PetInfoUpdateSchema,
  ) => {
    // 편집 모드에서 변경사항이 없으면 제출하지 않음
    if (
      type === "edit-pet" &&
      checkChanges &&
      !checkChanges(data as PetInfoUpdateSchema)
    ) {
      return;
    }

    try {
      if (type === "edit-pet" && petId) {
        await updatePetMutation.mutateAsync({
          id: petId,
          data: data as PetInfoUpdateSchema,
        });
      } else {
        await createPetMutation.mutateAsync(data as PetInfoFormSchema);
      }
      onClose();
    } catch (error) {
      console.error("Pet submission error:", error);
      // 에러는 mutation 훅에서 toast로 처리됨
    }
  };

  return {
    isLoading:
      isPetLoading ||
      createPetMutation.isPending ||
      updatePetMutation.isPending,
    handleSubmit,
    initialData,
    hasChanges: checkChanges,
  };
}
