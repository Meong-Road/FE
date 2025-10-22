import { useEffect, useMemo } from "react";

import type { PetInfoModalProps } from "@/components/Modal/types/petInfoModal";
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
    return transformPetToFormData(petData);
  }, [shouldFetchPet, petData]);

  const form = usePetInfoForm();

  const watchedValues = form.watch();

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
