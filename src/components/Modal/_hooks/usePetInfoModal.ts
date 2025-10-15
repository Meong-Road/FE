import { useState } from "react";
import { useParams } from "next/navigation";

import { postPetInfo, putPetInfo } from "@/api/pets";

import { PetInfoModalProps } from "../types/petInfoModal";

import { PetInfoFormSchema } from "./usePetInfoForm";

export function usePetInfoModal({ type, onClose }: PetInfoModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const handleSubmit = async (data: PetInfoFormSchema) => {
    setIsLoading(true);

    try {
      if (type === "edit-pet") {
        // 해당 반려동물 수정 버튼을 누르면 petId가 path에 뜬다고 가정
        await putPetInfo(Number(id), data);
        onClose();
      } else {
        await postPetInfo(data);
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
  };
}
