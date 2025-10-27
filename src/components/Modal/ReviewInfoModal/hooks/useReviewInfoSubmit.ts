import { toast } from "sonner";

import { usePostReview, usePutReview } from "@/hooks/queries/reviews";

import { ReviewInfoModalProps } from "../types/reviewInfoModal";

import { ReviewInfoFormSchema } from "./useReviewInfoForm";

export function useReviewInfoSubmit(
  props: Omit<ReviewInfoModalProps, "hasCloseBtn">,
) {
  const createReviewMutation = usePostReview();
  const updateReviewMutation = usePutReview();

  const handleSubmit = async (values: ReviewInfoFormSchema) => {
    try {
      if (props.type === "edit-review" && props.reviewId !== undefined) {
        await updateReviewMutation.mutateAsync({
          reviewId: props.reviewId,
          data: {
            score: values.score,
            comment: values.comment,
          },
        });
        toast.success("리뷰가 수정되었습니다.");
        props.onClose();
      } else if (
        props.type === "add-review" &&
        props.gatheringId !== undefined
      ) {
        await createReviewMutation.mutateAsync({
          gatheringId: props.gatheringId,
          score: values.score,
          comment: values.comment,
        });
        toast.success("리뷰가 작성되었습니다.");
        props.onClose();
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했어요.";
      toast.error(`오류가 발생했어요: ${message}`);
    }
  };

  const isSubmitting =
    createReviewMutation.isPending || updateReviewMutation.isPending;

  return {
    handleSubmit,
    isSubmitting,
  };
}
