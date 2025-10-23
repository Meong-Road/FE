import { toast } from "sonner";

import { PutUserReq } from "@/api/types/user";
import {
  useUpdateMyInfo,
  useUpdateUserImageURL,
  useUploadUserImage,
} from "@/hooks/queries/user";

import { UserInfoModalProps } from "../types/userInfoModal";

import { UserInfoFormSchema, UserInfoUpdateSchema } from "./useUserInfoForm";

export function useUserInfoSubmit({
  type,
  userId,
}: Pick<UserInfoModalProps, "type" | "userId">) {
  const updateUserMutation = useUpdateMyInfo();
  const uploadImageMutation = useUploadUserImage();
  const updateImageURLMutation = useUpdateUserImageURL();

  const handleSubmit = async (
    values: UserInfoFormSchema | UserInfoUpdateSchema,
  ) => {
    try {
      // 1. userFormData 준비
      const userFormData: Partial<UserInfoFormSchema> = {
        nickName: values.nickName!,
        image: null,
        isPetInfoSubmitted: values.isPetInfoSubmitted ?? false,
      };

      let imageUrl: string | null | undefined = undefined;

      // 2. 이미지 업로드 처리
      if (values.image instanceof File) {
        const uploadResult = await uploadImageMutation.mutateAsync({
          userId: userId!,
          image: values.image,
        });

        if (uploadResult.result) {
          imageUrl = uploadResult.result as string;
        }
      } else {
        // string이거나 null이거나 그대로 사용
        imageUrl = values.image;
      }

      // 3. userPayload 준비
      const userPayload: PutUserReq = {
        nickName: userFormData.nickName,
        isPetInfoSubmitted: userFormData.isPetInfoSubmitted,
      };

      // 4. edit-user인 경우 업데이트 요청
      if (type === "edit-user" && userId) {
        await updateUserMutation.mutateAsync(userPayload, {
          onSuccess: () => {
            toast.success("프로필이 성공적으로 수정되었습니다.");
          },
          onError: (error: Error) => {
            toast.error(`프로필 수정에 실패했어요: ${error.message}`);
          },
        });

        // 이미지가 변경되었을 때만 이미지 URL 업데이트
        // (새 파일 업로드했거나, 기존 이미지를 지웠거나, 다른 이미지 URL로 변경했을 때)
        if (
          values.image instanceof File ||
          values.image === null ||
          (typeof values.image === "string" && values.image !== "")
        ) {
          await updateImageURLMutation.mutateAsync(
            imageUrl === null ? "" : imageUrl || "",
            {
              onError: (error: Error) => {
                toast.error(
                  `프로필 이미지 업데이트에 실패했어요: ${error.message}`,
                );
              },
            },
          );
        }
      } else {
        throw new Error("Invalid operation");
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
    updateUserMutation.isPending ||
    uploadImageMutation.isPending ||
    updateImageURLMutation.isPending;

  return {
    handleSubmit,
    isSubmitting,
  };
}
