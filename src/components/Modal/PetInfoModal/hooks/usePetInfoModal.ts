import { useEffect, useMemo } from "react";

import type { PetInfoModalProps } from "@/components/Modal/PetInfoModal/types/petInfoModal";
import { useGetPet } from "@/hooks/queries/pets";
import { hasPetFormChanges, transformPetToFormData } from "@/lib/utils/pet";

import { PetInfoUpdateSchema, usePetInfoForm } from "./usePetInfoForm";

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
    if (!isEditMode) return null;
    return transformPetToFormData(petData);
  }, [shouldFetchPet, petData, isEditMode]);

  const form = usePetInfoForm(initialData ?? undefined);

  const watchedValues = form.watch();

  // add 모드일 때는 항상 빈 폼으로 리셋
  // (type이 변경될 때 form 인스턴스는 재생성되지 않으므로)
  useEffect(() => {
    if (!isEditMode) {
      form.reset({
        name: "",
        birthYear: "",
        image: null,
        breed: "",
        gender: undefined,
        neuter: undefined,
        petType: "dog",
      });
    }
  }, [form, isEditMode, type]);

  // initialData가 비동기로 로드되면 form을 해당 값으로 리셋
  // (edit 모드일 때만 실행)
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const hasChanges = useMemo(() => {
    if (!isEditMode) return true;
    if (!initialData) return false;

    return hasPetFormChanges(watchedValues as PetInfoUpdateSchema, initialData);
  }, [isEditMode, initialData, watchedValues]);

  return {
    form,
    isPending: shouldFetchPet ? isPetPending : false,
    initialData,
    hasChanges,
  };
}
