import { useParams } from "next/navigation";
import { toast } from "sonner";

import { useGetPet, usePostPet, usePutPet } from "@/hooks/queries/pets";
import { hasPetFormChanges, transformPetToFormData } from "@/lib/utils/pet";

import { PetInfoModalProps } from "../types/petInfoModal";

import { PetInfoFormSchema, PetInfoUpdateSchema } from "./usePetInfoForm";

export function usePetInfoModal({ type, onClose }: PetInfoModalProps) {
  const { id } = useParams();
  const petId = id ? Number(id) : undefined;

  // 편집 모드이고 펫 아이디가 있으면 조회
  const { data: petData, isLoading: isPetLoading } = useGetPet(petId || 0, {
    enabled: type === "edit-pet" && !!petId,
  });

  // 펫 생성 뮤테이션
  const createPetMutation = usePostPet();

  // 펫 수정 뮤테이션
  const updatePetMutation = usePutPet();

  // 초기 데이터
  const initialData =
    type === "edit-pet" && petData ? transformPetToFormData(petData) : null;

  // 폼 제출 핸들러
  const handleSubmit = (data: PetInfoFormSchema | PetInfoUpdateSchema) => {
    // 편집 모드에서 변경사항이 없으면 제출하지 않음
    if (
      type === "edit-pet" &&
      initialData &&
      !hasPetFormChanges(data as PetInfoUpdateSchema, initialData)
    ) {
      return;
    }

    if (type === "edit-pet" && petId) {
      updatePetMutation.mutate(
        { id: petId, data: data as PetInfoUpdateSchema },
        {
          onSuccess: () => {
            toast.success("반려동물 정보가 수정되었습니다.");
            onClose();
          },
          onError: (error: Error) => {
            toast.error(`반려동물 정보 수정 실패: ${error.message}`);
          },
        },
      );
    } else {
      createPetMutation.mutate(data as PetInfoFormSchema, {
        onSuccess: () => {
          toast.success("반려동물 정보가 등록되었습니다.");
          onClose();
        },
        onError: (error: Error) => {
          toast.error(`반려동물 정보 등록 실패: ${error.message}`);
        },
      });
    }
  };

  return {
    isLoading:
      isPetLoading ||
      createPetMutation.isPending ||
      updatePetMutation.isPending,
    handleSubmit,
    initialData,
  };
}
