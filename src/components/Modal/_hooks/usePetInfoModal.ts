import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  useGetPetInfo,
  usePostPetInfo,
  usePutPetInfo,
} from "@/hooks/queries/pets";

import { PetInfoModalProps } from "../types/petInfoModal";

import { PetInfoFormSchema, PetInfoUpdateSchema } from "./usePetInfoForm";

export function usePetInfoModal({ type, onClose }: PetInfoModalProps) {
  const [initialData, setInitialData] = useState<PetInfoFormSchema | null>(
    null,
  );
  const { id } = useParams();
  const petId = id ? Number(id) : 0;
  const shouldFetchPet = type === "edit-pet" && !!petId;

  const postPetInfo = usePostPetInfo();
  const putPetInfo = usePutPetInfo();
  const { data: petData } = useGetPetInfo(shouldFetchPet ? petId : 0);

  useEffect(() => {
    if (type === "edit-pet" && petData) {
      setInitialData({
        name: petData.name,
        gender: petData.gender.toLowerCase() as "male" | "female",
        birthYear: petData.birthYear,
        breed: petData.breed,
        neuter:
          petData.neuter === true
            ? "did"
            : petData.neuter === false
              ? "didnot"
              : undefined,
        existingPhotoUrl: petData.image,
      });
    }
  }, [type, petData]);

  const hasChanges = (currentData: PetInfoUpdateSchema) => {
    if (!initialData) return false;

    return Object.keys(currentData).some((key) => {
      const currentValue = currentData[key as keyof typeof currentData];
      const initialValue = initialData[key as keyof typeof initialData];
      return currentValue !== initialValue;
    });
  };

  const handleSubmit = async (
    data: PetInfoFormSchema | PetInfoUpdateSchema,
  ) => {
    if (type === "edit-pet" && !hasChanges(data as PetInfoUpdateSchema)) return;

    try {
      if (type === "edit-pet") {
        await putPetInfo.mutateAsync({
          id: petId,
          data: data as PetInfoUpdateSchema,
        });
      } else {
        await postPetInfo.mutateAsync(data as PetInfoFormSchema);
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    isLoading:
      type === "edit-pet" ? putPetInfo.isPending : postPetInfo.isPending,
    handleSubmit,
    initialData,
    hasChanges: type === "edit-pet" ? hasChanges : undefined,
  };
}
