"use client";

import CreateGatheringForm from "@/components/CreateGatheringForm/CreateGatheringForm";
import {
  QuickGatheringFormSchema,
  RegularGatheringFormSchema,
} from "@/hooks/gathering/schemas";
import { isRegularGatheringForm } from "@/lib/utils/typeGuard";

export default function RegularCreatePage() {
  const handleCancle = () => {
    // TODO : 취소 로직 추가
  };
  const handleSubmit = (
    data: QuickGatheringFormSchema | RegularGatheringFormSchema,
  ) => {
    // data가 regular일 때만 제출하도록 타입 가드
    if (isRegularGatheringForm(data)) {
      // TODO: 생성 API 추가
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
