"use client";
import CreateGatheringForm from "@/components/CreateGatheringForm/CreateGatheringForm";
import { QuickGatheringFormSchema } from "@/hooks/gathering/useQuickGatheringForm";
import { RegularGatheringFormSchema } from "@/hooks/gathering/useRegularGatheringForm";

export default function RegularCreatePage() {
  const handleCancle = () => {
    // TODO : 취소 로직 추가
  };
  const handleSubmit = (
    data: QuickGatheringFormSchema | RegularGatheringFormSchema,
  ) => {
    // TODO: 생성 API 추가
    if ("days" in data) {
      console.log("폼 제출하기 : ", data);
    }
  };

  return (
    <div>
      <h1 className="mb-13 text-3xl font-semibold text-gray-900">
        정기 모임 만들기
      </h1>
      <CreateGatheringForm
        type="regular"
        onCancel={handleCancle}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
