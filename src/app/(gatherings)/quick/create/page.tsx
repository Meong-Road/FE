"use client";

import CreateGatheringForm from "@/components/CreateGatheringForm/CreateGatheringForm";
import {
  QuickGatheringFormSchema,
  RegularGatheringFormSchema,
} from "@/hooks/gathering/schemas";
import { isQuickGatheringForm } from "@/lib/utils/typeGuard";

export default function QuickCreatePage() {
  const handleCancel = () => {
    // TODO : 취소 로직 추가
  };
  const handleSubmit = (
    data: QuickGatheringFormSchema | RegularGatheringFormSchema,
  ) => {
    //  data가 quick일 때만 제출하도록 타입 가드
    if (isQuickGatheringForm(data)) {
      // TODO: 생성 API 추가
    }
  };

  return (
    <div>
      <h1 className="mb-13 text-3xl font-semibold text-gray-900">
        번개 모임 만들기
      </h1>
      {/* 이미지, 모임 이름, 모임 설명 section */}
      <CreateGatheringForm
        type="quick"
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
