import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { petsApi } from "@/api/pets";

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
          const petData = await petsApi.getPetInfo(Number(id));
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
    setIsLoading(true);

    try {
      if (type === "edit-pet") {
        // 해당 반려동물 수정 버튼을 누르면 petId가 path에 뜬다고 가정
        await petsApi.putPetInfo(Number(id), data as PetInfoUpdateSchema);
        onClose();
        toast.success("반려견 정보 수정에 성공했습니다!");
      } else {
        await petsApi.postPetInfo(data as PetInfoFormSchema);
        onClose();
        toast.success("반려견 정보 등록에 성공했습니다!");
      }
    } catch (error) {
      console.error(error);
      if (type === "edit-pet") toast.error("반려견 정보 수정에 실패했습니다.");
      else toast.error("반려견 정보 등록에 실패했습니다.");
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
