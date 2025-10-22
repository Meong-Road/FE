"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { baseDefaultValues, QuickGatheringFormSchema } from "./schemas";

// TODO : 시간과 분을 입력하지 않았을 때 오류 메시지 출력
export function useQuickGatheringForm() {
  return useForm<QuickGatheringFormSchema>({
    resolver: zodResolver(QuickGatheringFormSchema),
    defaultValues: {
      ...baseDefaultValues,
      dateTime: { hour: 0, minute: 0 },
    },
    mode: "onChange",
  });
}
