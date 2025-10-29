"use client";

import CreateGatheringForm from "@/components/CreateGatheringForm/CreateGatheringForm";
import { useGatheringFormAccess } from "@/hooks/gathering/useGatheringFormAccess";
import useGatheringFormActions from "@/hooks/gathering/useGatheringFormActions";
import { PATH } from "@/lib/constants/path";
import { EGatheringType } from "@/lib/types/gatherings";

export default function QuickCreatePage() {
  useGatheringFormAccess({
    allowedType: "quick",
    redirectPath: `${PATH.QUICK}`,
  });

  const { handleCancel, handleSubmit } = useGatheringFormActions({
    type: EGatheringType.QUICK,
  });

  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold text-gray-900 sm:mb-13 sm:text-3xl">
        번개 모임 만들기
      </h1>
      <CreateGatheringForm
        type={EGatheringType.QUICK}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
