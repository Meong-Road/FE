"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { DAY_OF_WEEK } from "@/lib/constants/date";

const RegularGatheringFormSchema = z.object({
  photo: z.instanceof(File).optional(),
  name: z.string().min(1, "모임 이름을 입력해주세요"),
  description: z.string().optional(),
  location: z.string(),
  days: z
    .array(z.enum(DAY_OF_WEEK as [string, ...string[]]))
    .min(1, "모임 날짜를 하나 이상 선택해주세요"),
  registrationEnd: z
    .string()
    .min(1, "마감 날짜를 선택해주세요")
    .refine((str) => {
      const date = new Date(str);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date > today;
    }, "마감 날짜는 오늘 이후로 설정해주세요"),
  isPetRequired: z.boolean(),
  capacity: z
    .string()
    .min(1, "모집 인원을 입력해주세요")
    .refine(
      (str) => !isNaN(parseInt(str, 10)) && parseInt(str, 10) >= 5,
      "정원은 5명 이상이어야 합니다",
    ),
});

export type RegularGatheringFormSchema = z.infer<
  typeof RegularGatheringFormSchema
>;

export function useRegularGatheringForm() {
  return useForm<RegularGatheringFormSchema>({
    resolver: zodResolver(RegularGatheringFormSchema),
    defaultValues: {
      photo: undefined,
      name: "",
      description: "",
      location: "",
      days: [],
      registrationEnd: new Date().toISOString(),
      isPetRequired: true,
      capacity: "5",
    },
    mode: "onChange",
  });
}
