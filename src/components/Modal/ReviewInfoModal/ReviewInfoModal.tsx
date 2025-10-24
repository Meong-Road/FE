import { toast } from "sonner";

import { Form } from "@/components/Form";
import { useDeleteReview } from "@/hooks/queries/reviews/useDeleteReview";
import { useReviewInfoModalStore } from "@/store/modalStore";

import { Modal } from "../shared";

import { useReviewInfoModal } from "./hooks/useReviewInfoModal";
import { useReviewInfoSubmit } from "./hooks/useReviewInfoSubmit";
import { ReviewInfoDeleteButton } from "./_components";

export default function ReviewInfoModal() {
  const { isOpen, modalType, reviewId, gatheringId, closeModal } =
    useReviewInfoModalStore();

  // 리뷰 데이터 페칭 및 폼 초기화
  const { form, isPending: isReviewPending } = useReviewInfoModal({
    modalType,
    reviewId,
  });

  // Store에서 읽은 값으로 props 구성
  const submitProps =
    modalType === "add-review"
      ? {
          type: "add-review" as const,
          onClose: closeModal,
          gatheringId: gatheringId!,
        }
      : {
          type: "edit-review" as const,
          onClose: closeModal,
          reviewId: reviewId!,
        };

  const { handleSubmit, isSubmitting } = useReviewInfoSubmit(submitProps);

  // 리뷰 삭제 훅
  const { mutate: deleteReview, isPending: isDeleting } = useDeleteReview();

  const handleDelete = () => {
    if (!reviewId) return;
    deleteReview(
      { reviewId },
      {
        onSuccess: () => {
          toast.success("리뷰가 삭제되었습니다.");
          closeModal();
        },
        onError: (error: Error) => {
          toast.error(`리뷰 삭제에 실패했어요: ${error.message}`);
        },
      },
    );
  };

  // 모달이 열려있지 않으면 렌더링 안 함
  if (!isOpen || !modalType) return null;

  return (
    <Modal>
      <Modal.CloseBtn />

      <Modal.Title
        title={modalType === "add-review" ? "리뷰 작성하기" : "리뷰 수정하기"}
      />

      <Modal.Content>
        {/* 리뷰 데이터 로딩 중 */}
        {isReviewPending && modalType === "edit-review" ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm text-zinc-500">리뷰 정보를 불러오는 중...</p>
          </div>
        ) : (
          <Form form={form} onSubmit={handleSubmit}>
            <Form.Field
              name="score"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label required>평점</Form.Label>
                  <Form.Control>
                    <Form.RatingInput
                      ref={field.ref}
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />

            <Form.Field
              name="comment"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label required>리뷰 내용</Form.Label>
                  <Form.Control>
                    <textarea
                      className="w-full rounded-lg border border-zinc-300 p-3 text-sm focus:border-zinc-500 focus:outline-none"
                      placeholder="모임에 대한 솔직한 리뷰를 작성해주세요."
                      rows={6}
                      {...field}
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />

            <Form.SubmitButton
              isPending={isSubmitting}
              disabled={
                isReviewPending || isSubmitting || !form.formState.isValid
              }
              label={modalType === "add-review" ? "작성하기" : "수정하기"}
            />

            {/* 수정 모드일 때만 삭제 버튼 표시 */}
            {modalType === "edit-review" && (
              <div className="mt-4 flex justify-center">
                <ReviewInfoDeleteButton
                  onClick={handleDelete}
                  disabled={isDeleting || isSubmitting}
                />
              </div>
            )}
          </Form>
        )}
      </Modal.Content>
    </Modal>
  );
}
