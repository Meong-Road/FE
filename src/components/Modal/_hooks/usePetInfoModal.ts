import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getPetInfo, postPetInfo, putPetInfo } from "@/api/pets";

import { PetInfoModalProps } from "../types/petInfoModal";

import { PetInfoFormSchema, PetInfoUpdateSchema } from "./usePetInfoForm";

export function usePetInfoModal({ type, onClose }: PetInfoModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [initialData, setInitialData] = useState<PetInfoFormSchema | null>(
    null,
  );
  const { id } = useParams();

  useEffect(() => {
    if (type === "edit-pet" && id) {
      const loadPetData = async () => {
        try {
          const petData = await getPetInfo(Number(id));
          if (!petData) return;

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
        } catch (error) {
          console.error("반려견 정보 로딩 실패 : ", error);
        }
      };
      loadPetData();
    }
  }, [type, id]);

  const hasChanges = (currentData: PetInfoUpdateSchema) => {
    if (!initialData) return true;

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
    setIsLoading(true);

    try {
      if (type === "edit-pet") {
        // 해당 반려동물 수정 버튼을 누르면 petId가 path에 뜬다고 가정
        await putPetInfo(Number(id), data as PetInfoUpdateSchema);
        onClose();
      } else {
        await postPetInfo(data as PetInfoFormSchema);
        // 성공 토스트가 있으면 좋을 듯
        onClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleSubmit,
    initialData,
    hasChanges: type === "edit-pet" ? hasChanges : undefined,
  };
}
