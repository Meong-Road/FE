"use client";

import { useRouter } from "next/navigation";

import CreateGatheringForm from "@/components/CreateGatheringForm/CreateGatheringForm";
import {
  QuickGatheringFormSchema,
  RegularGatheringFormSchema,
} from "@/hooks/gathering/schemas";
import { useGatheringFormAccess } from "@/hooks/gathering/useGatheringFormAccess";
import { usePostGathering } from "@/hooks/queries/gatherings/usePostGathering";
import { PATH } from "@/lib/constants/path";
import {
  CreateRegularGatheringType,
  EGatheringType,
} from "@/lib/types/gatherings";
import { isRegularGatheringForm } from "@/lib/utils/typeGuard";

export default function RegularCreatePage() {
  const router = useRouter();
  useGatheringFormAccess({
    allowedType: "regular",
    redirectPath: `${PATH.REGULAR}`,
  });

  const postGatheringMutation = usePostGathering();

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = async (
    data: QuickGatheringFormSchema | RegularGatheringFormSchema,
  ) => {
    if (!isRegularGatheringForm(data)) throw new Error(); // 얼리 리턴 적용

    const apiData: CreateRegularGatheringType = {
      type: EGatheringType.REGULAR,
      name: data.name,
      description: data.description,
      days: data.days,
      location: data.location,
      capacity: parseInt(data.capacity, 10),
      image: data.image ? URL.createObjectURL(data.image) : null, // TODO 이미지 업로드 API 나온 후 수정
      isPetRequired: data.isPetRequired,
      registrationEnd: data.registrationEnd,
    };

    postGatheringMutation.mutate(apiData);
  };

  return (
    <div>
      <h1 className="mb-13 text-3xl font-semibold text-gray-900">
        정기 모임 만들기
      </h1>
      <CreateGatheringForm
        type={EGatheringType.REGULAR}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
