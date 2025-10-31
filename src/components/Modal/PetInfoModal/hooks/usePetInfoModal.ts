import { useEffect, useMemo } from "react";

import type { PetInfoModalProps } from "@/components/Modal/PetInfoModal/types/petInfoModal";
import { useGetPet } from "@/hooks/queries/pets";
import { transformPetToFormData } from "@/lib/utils/pet";

import { usePetInfoForm } from "./usePetInfoForm";

export function usePetInfoModal({
  type,
  petId,
}: Pick<PetInfoModalProps, "type" | "petId">) {
  const isEditMode = type === "edit-pet";
  const shouldFetchPet = isEditMode && !!petId;

  const { data: petData, isPending: isPetPending } = useGetPet(petId || 0, {
    enabled: shouldFetchPet,
  });

  const initialData = useMemo(() => {
    if (!shouldFetchPet || !petData) return null;
    return transformPetToFormData(petData);
  }, [shouldFetchPet, petData]);

  // 항상 빈 폼으로 시작 (defaultValues만 사용)
  const form = usePetInfoForm();

  // edit 모드일 때만 initialData로 폼 업데이트
  useEffect(() => {
    if (isEditMode && initialData) {
      form.reset(initialData);
    } else if (!isEditMode) {
      // add 모드일 때는 명시적으로 빈 값으로 리셋
      form.reset({
        image: null,
        name: "",
        gender: undefined,
        neuter: undefined,
        birthYear: "",
        breed: "",
        petType: "dog",
      });
    }
  }, [isEditMode, initialData, form]);

  return {
    form,
    isPending: shouldFetchPet ? isPetPending : false,
    initialData,
    isDirty: form.formState.isDirty,
  };
}
