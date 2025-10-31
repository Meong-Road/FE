import { useEffect, useMemo } from "react";

import { useGetReview } from "@/hooks/queries/reviews";

import { ReviewInfoFormSchema, useReviewInfoForm } from "./useReviewInfoForm";

interface UseReviewInfoModalProps {
  modalType: "add-review" | "edit-review" | null;
  reviewId?: number;
}

/**
 * 리뷰 모달의 상태를 관리하는 훅
 * - edit-review 모드: API에서 리뷰 데이터를 가져와 폼 초기화
 * - add-review 모드: 빈 폼으로 시작
 */
export function useReviewInfoModal({
  modalType,
  reviewId,
}: UseReviewInfoModalProps) {
  const isEditMode = modalType === "edit-review";
  const shouldFetchReview = isEditMode && !!reviewId;

  // 리뷰 데이터 페칭 (edit-review 모드일 때만)
  const { data: reviewData, isPending: isReviewPending } = useGetReview(
    reviewId || 0,
    {
      enabled: shouldFetchReview,
    },
  );

  const form = useReviewInfoForm();
  // 폼 상태는 RHF의 isDirty로 관리

  // 초기값 설정
  const initialData = useMemo<Partial<ReviewInfoFormSchema> | null>(() => {
    if (!shouldFetchReview || !reviewData) return null;

    return {
      score: reviewData.score,
      comment: reviewData.comment,
    };
  }, [shouldFetchReview, reviewData]);

  useEffect(() => {
    if (!isEditMode) {
      form.reset();
    }
  }, [form, isEditMode, modalType]);

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  return {
    form,
    isPending: shouldFetchReview ? isReviewPending : false,
    initialData,
    isDirty: form.formState.isDirty,
  };
}
