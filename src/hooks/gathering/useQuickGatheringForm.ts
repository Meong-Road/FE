"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

// TODO : 시간과 분을 입력하지 않았을 때 오류 메시지 출력
const QuickGatheringFormSchema = z.object({
  photo: z.instanceof(File).optional(),
  name: z.string().min(1, "모임 이름을 입력해주세요"),
  description: z.string().optional(),
  location: z.string(),
  dateTime: z.object({
    hour: z.number().min(1).max(24),
    minute: z.number().min(1).max(60),
  }),
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

export type QuickGatheringFormSchema = z.infer<typeof QuickGatheringFormSchema>;

export function useQuickGatheringForm() {
  return useForm<QuickGatheringFormSchema>({
    resolver: zodResolver(QuickGatheringFormSchema),
    defaultValues: {
      photo: undefined,
      name: "",
      description: "",
      location: "",
      dateTime: { hour: 0, minute: 0 },
      registrationEnd: new Date().toISOString(),
      isPetRequired: true,
      capacity: "5",
    },
    mode: "onChange",
  });
}
