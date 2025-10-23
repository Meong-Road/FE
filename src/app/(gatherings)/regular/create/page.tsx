"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { gatheringApi } from "@/api/gatherings";
import CreateGatheringForm from "@/components/CreateGatheringForm/CreateGatheringForm";
import {
  QuickGatheringFormSchema,
  RegularGatheringFormSchema,
} from "@/hooks/gathering/schemas";
import {
  CreateRegularGatheringReq,
  EGatheringType,
} from "@/lib/types/gatherings";
import { isRegularGatheringForm } from "@/lib/utils/typeGuard";

export default function RegularCreatePage() {
  const router = useRouter();

  const handleCancle = () => {
    // TODO : 작성 중인 내용이 있을 때 스토리지에 저장
    // TODO : 만약 나가기를 통해 작성 페이지를 벗어나면, 뒤로가기 버튼으로 접근 불가하도록?
    router.back();
  };

  const handleSubmit = async (
    data: QuickGatheringFormSchema | RegularGatheringFormSchema,
  ) => {
    if (isRegularGatheringForm(data)) {
      try {
        const apiData: CreateRegularGatheringReq = {
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

        const response = await gatheringApi.postGathering(apiData);

        if (response.success) {
          toast.success("정기 모임 생성에 성공했습니다");
          router.push(`gathering/regular/${response.result.id}`);
        }
      } catch (error) {
        console.error("정기 모임 생성 실패", error);
        toast.error("정기 모임 생성 중 오류가 발생했습니다");
      }
    }
  };

  return (
    <div>
      <h1 className="mb-13 text-3xl font-semibold text-gray-900">
        정기 모임 만들기
      </h1>
      <CreateGatheringForm
        type={EGatheringType.REGULAR}
        onCancel={handleCancle}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
