import { DefaultValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { ReviewInputScore } from "@/lib/types/reviews";

const ReviewInfoFormSchema = z.object({
  score: z.custom<ReviewInputScore>((val) => {
    const validScores: ReviewInputScore[] = [1, 2, 3, 4, 5];
    return validScores.includes(val as ReviewInputScore);
  }, "평점을 선택해주세요."),
  comment: z
    .string()
    .trim()
    .min(10, "리뷰는 최소 10자 이상 작성해주세요.")
    .max(500, "리뷰는 500자 이하로 작성해주세요."),
});

const ReviewInfoUpdateSchema = ReviewInfoFormSchema.partial();
export type ReviewInfoFormSchema = z.infer<typeof ReviewInfoFormSchema>;
export type ReviewInfoUpdateSchema = z.infer<typeof ReviewInfoUpdateSchema>;

export function useReviewInfoForm(
  initialValues?: Partial<ReviewInfoFormSchema>,
) {
  const defaultValues: DefaultValues<ReviewInfoFormSchema> = {
    score: undefined,
    comment: "",
  };

  return useForm<ReviewInfoFormSchema>({
    resolver: zodResolver(ReviewInfoFormSchema),
    defaultValues: initialValues
      ? { ...defaultValues, ...initialValues }
      : defaultValues,
    mode: "onChange",
  });
}
