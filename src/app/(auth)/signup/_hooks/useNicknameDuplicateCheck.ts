"use client";

import { useState } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { customFetch } from "../_api/customFetch";

interface UseNicknameDuplicateCheckProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  field: Path<T>;
  errorMessage?: string;
}

interface NicknameCheckResponse {
  result?: boolean;
}

export function useNicknameDuplicateCheck<T extends FieldValues>({
  form,
  field,
  errorMessage = "이미 사용 중인 닉네임입니다.",
}: UseNicknameDuplicateCheckProps<T>) {
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [lastChecked, setLastChecked] = useState("");

  const checkNicknameDuplicate = async () => {
    const nickname = String(form.getValues(field) ?? "").trim();

    if (!nickname) {
      return;
    }

    const isValid = await form.trigger(field);
    if (!isValid) {
      return;
    }

    setIsChecking(true);

    try {
      const response = await customFetch.post<NicknameCheckResponse>(
        "/meong-road/user/nickname/check",
        { body: JSON.stringify({ nickName: nickname }) },
      );
      const isDuplicate = Boolean(response?.result);

      setLastChecked(nickname);

      if (isDuplicate) {
        form.setError(field, { type: "manual", message: errorMessage });
        setIsAvailable(false);
      } else {
        form.clearErrors(field);
        setIsAvailable(true);
      }
    } catch (error) {
      console.error("닉네임 중복검사 오류:", error);
      form.setError(field, {
        type: "server",
        message: "닉네임 중복 확인에 실패했습니다.",
      });
      setIsAvailable(null);
    } finally {
      setIsChecking(false);
    }
  };

  const fieldValue = form.watch(field);
  const fieldError = form.formState.errors[field];

  const isButtonDisabled =
    isChecking ||
    !fieldValue?.trim() ||
    fieldValue === lastChecked ||
    Boolean(fieldError);

  return {
    checkNicknameDuplicate,
    isChecking,
    isButtonDisabled,
    isAvailable,
  };
}
