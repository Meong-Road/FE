import Person from "@/assets/images/profile.svg";
import { Form } from "@/components/Form";
import { Modal } from "@/components/Modal/shared";
import { useUserInfoModalStore } from "@/store/modalStore";

import { UserInfoFormSchema } from "./hooks/useUserInfoForm";
import { useUserInfoModal } from "./hooks/useUserInfoModal";
import { useUserInfoSubmit } from "./hooks/useUserInfoSubmit";

export default function UserInfoModal() {
  const {
    isOpen,
    modalType: type,
    userId,
    closeModal,
  } = useUserInfoModalStore();

  const {
    form,
    isPending: isUserPending,
    isDirty,
    initialData,
  } = useUserInfoModal({ type: type || "edit-user", userId: userId || 0 });
  const currentImage = form.watch("image");

  const { handleSubmit, isSubmitting } = useUserInfoSubmit({
    type: type || "edit-user",
    userId: userId || 0,
  });

  const onSubmit = (values: UserInfoFormSchema) => {
    handleSubmit(values);
    closeModal();
  };

  // 모달이 열려있지 않으면 렌더링 안 함
  if (!isOpen || !type || !userId) return null;

  // 유저 데이터를 가져오는 중이면 렌더링 안 함
  if (isUserPending) return null;

  return (
    <Modal>
      <Modal.CloseBtn />

      <Modal.Title title="프로필 수정하기" />

      <Modal.Content>
        <Form form={form} onSubmit={onSubmit}>
          <Form.Field
            name="image"
            render={({ field }) => (
              <Form.Item>
                <Form.Control>
                  <Form.ImageUpload
                    id="user-image-upload"
                    onChange={field.onChange}
                    value={field.value as File | null}
                    existingImageUrl={currentImage as string}
                  >
                    <Person />
                  </Form.ImageUpload>
                </Form.Control>
              </Form.Item>
            )}
          />

          <div className="h-1" />

          <Form.Field
            name="nickName"
            render={({ field }) => (
              <Form.Item>
                <Form.Label required>닉네임</Form.Label>
                <div className="flex w-full items-center gap-2">
                  <Form.Control>
                    <Form.Input
                      className="px-4 py-2.5"
                      type="text"
                      placeholder="닉네임을 입력해주세요"
                      {...field}
                    />
                  </Form.Control>
                  <Form.DuplicateCheckButton
                    form={form}
                    field="nickName"
                    type="nickname"
                    checkPassedField="nickNameCheckPassed"
                    initialValue={initialData?.nickName}
                  />
                </div>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.SubmitButton
            isPending={isSubmitting}
            disabled={
              isUserPending ||
              isSubmitting ||
              !form.formState.isValid ||
              (type === "edit-user" && !isDirty)
            }
            label="수정하기"
          />
        </Form>
      </Modal.Content>
    </Modal>
  );
}
