"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { subtractHoursFromDateTime } from "@/lib/utils/dateTime";

import { baseDefaultValues, QuickGatheringFormSchema } from "./schemas";

// TODO : 시간과 분을 입력하지 않았을 때 오류 메시지 출력
export function useQuickGatheringForm() {
  const form = useForm<QuickGatheringFormSchema>({
    resolver: zodResolver(QuickGatheringFormSchema),
    defaultValues: {
      ...baseDefaultValues,
      dateTime: "",
      registrationEnd: "",
    },
    mode: "onChange",
  });

  const watchedDateTime = form.watch("dateTime");

  React.useEffect(() => {
    if (!watchedDateTime) return;

    const registrationEnd = subtractHoursFromDateTime(watchedDateTime);
    form.setValue("registrationEnd", registrationEnd);
  }, [form, watchedDateTime]);

  return form;
}
