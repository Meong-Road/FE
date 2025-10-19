import { useMemo } from "react";

import type { PetInfoModalProps } from "@/components/Modal/types/petInfoModal";
import { useGetPet } from "@/hooks/queries/pets";
import { hasPetFormChanges, transformPetToFormData } from "@/lib/utils/pet";

import { PetInfoUpdateSchema, usePetInfoForm } from "./usePetInfoForm";

export function usePetInfoModal({
  type,
  petId,
}: Pick<PetInfoModalProps, "type" | "petId">) {
  // 편집 모드이고 펫 아이디가 있으면 조회
  const { data: petData, isLoading: isPetLoading } = useGetPet(petId || 0, {
    enabled: type === "edit-pet" && !!petId,
  });

  // 초기 데이터
  const initialData =
    type === "edit-pet" && petData ? transformPetToFormData(petData) : null;

  // 편집모드이고 초기데이터가 있으면 그걸로 채운 폼 생성
  const form = usePetInfoForm(
    type === "edit-pet" && initialData ? initialData : undefined,
  );

  // 변경사항 체크 함수 (Option 2)
  const hasChanges = useMemo(() => {
    if (type === "first-login") return undefined; // first-login은 변경사항 체크 안함
    if (type === "edit-pet" && initialData) {
      return hasPetFormChanges(
        form.getValues() as PetInfoUpdateSchema,
        initialData,
      );
    }
    return undefined;
  }, [type, initialData, form]);

  return {
    form,
    isLoading: isPetLoading,
    initialData,
    hasChanges,
  };
}
