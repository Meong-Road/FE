import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ImageUploadRes } from "@/api/types/pets";
import { useUploadPetImage } from "@/hooks/queries/imageUpload";
import { usePostPet, usePutPet } from "@/hooks/queries/pets";
import { useUpdateMyInfo } from "@/hooks/queries/user";
import { PATH } from "@/lib/constants/path";

import { PetInfoModalProps } from "../types/petInfoModal";

import { PetInfoFormSchema, PetInfoUpdateSchema } from "./usePetInfoForm";

export function usePetInfoSubmit({
  type,
  petId,
  onClose,
}: Pick<PetInfoModalProps, "type" | "petId" | "onClose">) {
  const router = useRouter();

  const createPetMutation = usePostPet();
  const updateMyInfoMutation = useUpdateMyInfo(); // first-login 시 isPetInfoSubmitted true로 수정
  const updatePetMutation = usePutPet();
  const uploadImageMutation = useUploadPetImage();

  const handleSubmit = async (
    values: PetInfoFormSchema | PetInfoUpdateSchema,
  ) => {
    try {
      // 1. petFormData 준비. 아직 image는 null로 초기화.
      const petFormData: PetInfoFormSchema = {
        name: values.name!,
        gender: values.gender!,
        birthYear: values.birthYear!,
        breed: values.breed!,
        neuter: values.neuter ?? undefined,
        petType: values.petType!,
        image: null,
      };

      let imageUrl: string | null | undefined = undefined;

      // 2. 이미지 업로드 처리
      if (values.image instanceof File) {
        const response: ImageUploadRes = await uploadImageMutation.mutateAsync(
          values.image,
        );
        if (response?.result?.imageUrl) {
          imageUrl = response.result.imageUrl;
        }
      } else {
        // string이거나 null이거나 그대로 사용
        imageUrl = values.image;
      }

      // 3. petPayload 준비.
      const petPayload = {
        name: petFormData.name,
        gender: petFormData.gender,
        birthYear: petFormData.birthYear,
        breed: petFormData.breed,
        neuter:
          petFormData.neuter === "true"
            ? true
            : petFormData.neuter === "false"
              ? false
              : undefined,
        petType: petFormData.petType,
        image: imageUrl === null ? "" : (imageUrl ?? null),
      };

      // 4. edit-pet 인 경우 업데이트 요청.
      if (type === "edit-pet" && petId) {
        try {
          await updatePetMutation.mutateAsync({ id: petId, data: petPayload });
          toast.success("반려동물 정보가 수정되었습니다.");
          onClose();
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "알 수 없는 오류";
          toast.error(`반려동물 정보 수정에 실패했어요: ${errorMessage}`);
        }
      } else {
        // add-pet or first-login
        try {
          await createPetMutation.mutateAsync(petPayload);
          toast.success("반려동물 정보가 등록되었습니다.");
          onClose();

          if (type === "first-login") {
            await updateMyInfoMutation.mutateAsync({
              isPetInfoSubmitted: true,
            });
            router.push(PATH.REGULAR);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "알 수 없는 오류";
          toast.error(`반려동물 정보 등록에 실패했어요: ${errorMessage}`);
        }
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했어요.";
      toast.error(`오류가 발생했어요: ${message}`);
    }
  };

  const isSubmitting =
    createPetMutation.isPending ||
    updatePetMutation.isPending ||
    uploadImageMutation.isPending;

  return {
    handleSubmit,
    isSubmitting,
  };
}
