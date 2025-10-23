import React from "react";

import Person from "@/assets/images/profile.svg";
import { Form } from "@/components/Form";
import { Modal } from "@/components/Modal/shared";

import { UserInfoFormSchema } from "./hooks/useUserInfoForm";
import { useUserInfoModal } from "./hooks/useUserInfoModal";
import { useUserInfoSubmit } from "./hooks/useUserInfoSubmit";
import { type UserInfoModalProps } from "./types/userInfoModal";

export default function UserInfoModal({
  type,
  hasCloseBtn = true,
  onClose,
  userId,
}: UserInfoModalProps) {
  const {
    form,
    isPending: isUserPending,
    hasChanges,
  } = useUserInfoModal({ type, userId });
  const image = form.watch("image");

  const { handleSubmit, isSubmitting } = useUserInfoSubmit({
    type,
    userId,
  });

  const onSubmit = (values: UserInfoFormSchema) => {
    handleSubmit(values);
    onClose();
  };

  if (isUserPending) {
    return (
      <Modal>
        <Modal.Title title="프로필 수정하기" />
        <Modal.Content>
          <div className="flex justify-center py-8">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
          </div>
        </Modal.Content>
      </Modal>
    );
  }

  return (
    <Modal>
      {hasCloseBtn && <Modal.CloseBtn />}

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
                    existingImageUrl={image as string}
                    showRemoveButton={true}
                  >
                    <Person />
                  </Form.ImageUpload>
                </Form.Control>
                <Form.Label className="flex justify-center">
                  프로필 사진 등록
                </Form.Label>
              </Form.Item>
            )}
          />

          <Form.Field
            name="name"
            render={({ field }) => (
              <Form.Item>
                <Form.Label required>이름</Form.Label>
                <Form.Control>
                  <Form.Input
                    className="px-4 py-2.5"
                    type="text"
                    placeholder="이름을 입력해주세요"
                    {...field}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            name="nickName"
            render={({ field }) => (
              <Form.Item>
                <Form.Label required>닉네임</Form.Label>
                <Form.Control>
                  <Form.Input
                    className="px-4 py-2.5"
                    type="text"
                    placeholder="닉네임을 입력해주세요"
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
              isUserPending ||
              isSubmitting ||
              !form.formState.isValid ||
              (type === "edit-user" && !hasChanges)
            }
            label="수정하기"
          />
        </Form>
      </Modal.Content>
    </Modal>
  );
}
