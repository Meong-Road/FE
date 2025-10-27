import z from "zod";

import { DAY_OF_WEEK } from "@/lib/constants/date";

export const BaseGatheringFormSchema = z.object({
  image: z.instanceof(File).optional(),
  name: z.string().min(1, "모임 이름을 입력해주세요"),
  description: z.string().optional(),
  location: z.string(),
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

export const baseDefaultValues = {
  image: undefined,
  name: "",
  description: "",
  location: "",
  registrationEnd: "undefined",
  isPetRequired: true,
  capacity: "5",
};

export const QuickGatheringFormSchema = BaseGatheringFormSchema.extend({
  dateTime: z.object({
    hour: z.number().min(1).max(24),
    minute: z.number().min(1).max(60),
  }),
});

export const RegularGatheringFormSchema = BaseGatheringFormSchema.extend({
  days: z
    .array(z.enum(DAY_OF_WEEK as [string, ...string[]]))
    .min(1, "모임 날짜를 하나 이상 선택해주세요"),
});

export type QuickGatheringFormSchema = z.infer<typeof QuickGatheringFormSchema>;
export type RegularGatheringFormSchema = z.infer<
  typeof RegularGatheringFormSchema
>;
