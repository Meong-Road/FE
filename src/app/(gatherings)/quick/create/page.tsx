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

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = async (
    data: QuickGatheringFormSchema | RegularGatheringFormSchema,
  ) => {
    if (!isQuickGatheringForm(data)) throw new Error(); // 얼리 리턴 적용

    const apiData: CreateQuickGatheringType = {
      type: EGatheringType.QUICK,
      name: data.name,
      description: data.description,
      dateTime: data.dateTime,
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
