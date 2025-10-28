import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { PATH } from "@/lib/constants/path";
import {
  CreateQuickGatheringType,
  CreateRegularGatheringType,
  EGatheringType,
} from "@/lib/types/gatherings";
import { storageUtils } from "@/lib/utils/storage";
import {
  isQuickGatheringForm,
  isRegularGatheringForm,
} from "@/lib/utils/typeGuard";

import { usePostGathering } from "../queries/gatherings/usePostGathering";
import { useUploadGatheringImage } from "../queries/imageUpload";

import {
  QuickGatheringFormSchema,
  RegularGatheringFormSchema,
} from "./schemas";

interface UseGatheringFormActionsOptions {
  type: EGatheringType;
}

export default function useGatheringFormActions({
  type,
}: UseGatheringFormActionsOptions) {
  const router = useRouter();
  const postGatheringMutation = usePostGathering();
  const uploadImageMutation = useUploadGatheringImage();

  const handleCancel = () => router.back();

  const handleSubmit = async (
    data: QuickGatheringFormSchema | RegularGatheringFormSchema,
  ) => {
    try {
      let imageUrl: string | null = null;

      if (data.image instanceof File) {
        const response = await uploadImageMutation.mutateAsync(data.image);
        if (response?.result?.imageUrl) {
          imageUrl = response.result.imageUrl;
        }
      } else {
        imageUrl = data.image || null;
      }

      let apiData: CreateQuickGatheringType | CreateRegularGatheringType;
      let successMessage: string;
      let draftKey: string;
      let redirectPath: string;

      if (type === EGatheringType.QUICK && isQuickGatheringForm(data)) {
        apiData = {
          type: EGatheringType.QUICK,
          name: data.name,
          description: data.description,
          dateTime: `${data.dateTime}:00`,
          location: data.location,
          capacity: parseInt(data.capacity, 10),
          image: imageUrl,
          isPetRequired: data.isPetRequired,
          registrationEnd: `${data.registrationEnd}:00`,
        };
        successMessage = "번개 모임 생성에 성공했습니다";
        draftKey = "gathering-draft-quick";
        redirectPath = `${PATH.QUICK}`;
      } else if (
        type === EGatheringType.REGULAR &&
        isRegularGatheringForm(data)
      ) {
        apiData = {
          type: EGatheringType.REGULAR,
          name: data.name,
          description: data.description,
          days: data.days,
          location: data.location,
          capacity: parseInt(data.capacity, 10),
          image: imageUrl,
          isPetRequired: data.isPetRequired,
          registrationEnd: `${data.registrationEnd}T23:59:59`,
        };
        successMessage = "정기 모임 생성에 성공했습니다";
        draftKey = "gathering-draft-regular";
        redirectPath = `${PATH.REGULAR}`;
      } else {
        throw new Error("유효하지 않은 데이터 타입입니다");
      }

      postGatheringMutation.mutate(apiData, {
        onSuccess: (data) => {
          if (!data.success) throw new Error();

          storageUtils.removeItem(draftKey);
          toast.success(successMessage);
          router.push(`${redirectPath}/${data.result.id}`);
        },
        onError: () => {
          const errorMessage =
            type === EGatheringType.QUICK
              ? "번개 모임 생성에 실패했습니다"
              : "정기 모임 생성에 실패했습니다";

          toast.error(errorMessage);
        },
      });
    } catch (error) {
      console.error("오류가 발생했습니다", error);
      const errorMessage =
        type === EGatheringType.QUICK
          ? "번개 모임 생성 중 오류가 발생했습니다"
          : "정기 모임 생성 중 오류가 발생했습니다";
      toast.error(errorMessage);
    }
  };

  return {
    handleCancel,
    handleSubmit,
  };
}
