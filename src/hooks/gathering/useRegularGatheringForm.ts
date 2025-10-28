"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { baseDefaultValues, RegularGatheringFormSchema } from "./schemas";

export function useRegularGatheringForm() {
  return useForm<RegularGatheringFormSchema>({
    resolver: zodResolver(RegularGatheringFormSchema),
    defaultValues: {
      ...baseDefaultValues,
      days: [],
      registrationEnd: "",
    },
    mode: "onChange",
  });
}
