import { useEffect, useMemo } from "react";

import type { UserInfoModalProps } from "@/components/Modal/UserInfoModal/types/userInfoModal";
import { useGetMyInfo } from "@/hooks/queries/user/useGetMyInfo";

import { UserInfoUpdateSchema, useUserInfoForm } from "./useUserInfoForm";

export function useUserInfoModal({
  type,
  userId,
}: Pick<UserInfoModalProps, "type" | "userId">) {
  const isEditMode = type === "edit-user";
  const shouldFetchUser = isEditMode && !!userId;

  const { data: userData, isPending: isUserPending } = useGetMyInfo({
    enabled: shouldFetchUser,
  });

  const initialData = useMemo(() => {
    if (!shouldFetchUser || !userData) return null;
    return {
      name: userData.name || "",
      nickName: userData.nickName || "",
      image: userData.image || null,
      isPetInfoSubmitted: userData.isPetInfoSubmitted || false,
      initialNickName: userData.nickName || "", // 초기 닉네임 저장
      nickNameCheckPassed: true, // 초기 닉네임은 이미 검증된 상태
    };
  }, [shouldFetchUser, userData]);

  const form = useUserInfoForm();

  useEffect(() => {
    if (!isEditMode) {
      form.reset({
        nickName: "",
        image: null,
      });
    }
  }, [form, isEditMode, type]);

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  return {
    form,
    isPending: shouldFetchUser ? isUserPending : false,
    initialData,
    isDirty: form.formState.isDirty,
  };
}
