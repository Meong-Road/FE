"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { gatheringApi } from "@/api/gatherings";
import CreateGatheringForm from "@/components/CreateGatheringForm/CreateGatheringForm";
import {
  QuickGatheringFormSchema,
  RegularGatheringFormSchema,
} from "@/hooks/gathering/schemas";
import { useGatheringFormAccess } from "@/hooks/gathering/useGatheringFormAccess";
import { PATH } from "@/lib/constants/path";
import {
  CreateQuickGatheringReq,
  EGatheringType,
} from "@/lib/types/gatherings";
import { storageUtils } from "@/lib/utils/storage";
import { isQuickGatheringForm } from "@/lib/utils/typeGuard";

export default function QuickCreatePage() {
  const router = useRouter();
  useGatheringFormAccess({
    allowedType: "quick",
    redirectPath: `${PATH.QUICK}`,
  });

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = async (
    data: QuickGatheringFormSchema | RegularGatheringFormSchema,
  ) => {
    if (isQuickGatheringForm(data)) {
      const apiData: CreateQuickGatheringReq = {
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

      const response = await gatheringApi.postGathering(apiData);

      if (response.success) {
        storageUtils.removeItem(`gathering-draft-quick`);
        toast.success("번개 모임 생성에 성공했습니다");
        router.push(`${PATH.REGULAR}/${response.result.id}`);
      }
      try {
      } catch (error) {
        console.error("번개 모임 생성 실패", error);
        toast.error("번개 모임 생성 중 오류가 발생했습니다");
      }
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
