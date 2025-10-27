"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { baseDefaultValues, QuickGatheringFormSchema } from "./schemas";

// TODO : 시간과 분을 입력하지 않았을 때 오류 메시지 출력
export function useQuickGatheringForm() {
  const form = useForm<QuickGatheringFormSchema>({
    resolver: zodResolver(QuickGatheringFormSchema),
    defaultValues: {
      ...baseDefaultValues,
      dateTime: "",
      registrationEnd: undefined,
    },
    mode: "onChange",
  });

  const watchedDateTime = form.watch("dateTime");

  React.useEffect(() => {
    if (!watchedDateTime) return;

    const [date, time] = watchedDateTime.split("T");
    const [hours, minutes] = time.split(":");

    let newHours = parseInt(hours) - 3;
    let newDate = date;

    if (newHours < 0) {
      newHours += 24;
      const currentDate = new Date(date);
      currentDate.setDate(currentDate.getDate() - 1);
      newDate = currentDate.toISOString().split("T")[0];
    }

    const newTime = `${String(newHours).padStart(2, "0")}:${minutes}`;
    const registrationEnd = `${newDate}T${newTime}`;

    form.setValue("registrationEnd", registrationEnd);
  }, [form, watchedDateTime]);

  return form;
}
