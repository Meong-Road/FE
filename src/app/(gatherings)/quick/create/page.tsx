"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import CreateGatheringForm from "@/components/CreateGatheringForm/CreateGatheringForm";
import {
  QuickGatheringFormSchema,
  RegularGatheringFormSchema,
} from "@/hooks/gathering/schemas";
import { useGatheringFormAccess } from "@/hooks/gathering/useGatheringFormAccess";
import { usePostGathering } from "@/hooks/queries/gatherings/usePostGathering";
import { useUploadGatheringImage } from "@/hooks/queries/imageUpload";
import { PATH } from "@/lib/constants/path";
import {
  CreateQuickGatheringType,
  EGatheringType,
} from "@/lib/types/gatherings";
import { isQuickGatheringForm } from "@/lib/utils/typeGuard";

export default function QuickCreatePage() {
  const router = useRouter();
  useGatheringFormAccess({
    allowedType: "quick",
    redirectPath: `${PATH.QUICK}`,
  });

  const postGatheringMutation = usePostGathering();
  const uploadImageMutation = useUploadGatheringImage();

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = async (
    data: QuickGatheringFormSchema | RegularGatheringFormSchema,
  ) => {
    if (!isQuickGatheringForm(data)) throw new Error(); // 얼리 리턴 적용

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

      const apiData: CreateQuickGatheringType = {
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

      postGatheringMutation.mutate(apiData);
    } catch (error) {
      console.error("오류가 발생했습니다", error);
      toast.error("오류가 발생했습니다");
    }
  };

  return (
    <div>
      <h1 className="mb-13 text-3xl font-semibold text-gray-900">
        번개 모임 만들기
      </h1>
      {/* 이미지, 모임 이름, 모임 설명 section */}
      <CreateGatheringForm
        type={EGatheringType.QUICK}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
