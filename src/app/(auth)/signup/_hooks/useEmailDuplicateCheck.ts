"use client";

import { useState } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { customFetch } from "../_api/customFetch";

interface UseEmailDuplicateCheckProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  field: Path<T>;
  errorMessage?: string;
}

interface EmailCheckResponse {
  result?: { exists?: boolean };
}

export function useEmailDuplicateCheck<T extends FieldValues>({
  form,
  field,
  errorMessage = "이미 사용 중인 이메일입니다.",
}: UseEmailDuplicateCheckProps<T>) {
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [lastChecked, setLastChecked] = useState("");

  const checkEmailDuplicate = async () => {
    const email = String(form.getValues(field) ?? "").trim();

    if (!email) {
      return;
    }

    const isValid = await form.trigger(field);
    if (!isValid) {
      return;
    }

    setIsChecking(true);

    try {
      const response = await customFetch.get<EmailCheckResponse>(
        `/meong-road/user/exists?email=${encodeURIComponent(email)}`,
      );
      const isDuplicate = Boolean(response?.result?.exists);

      setLastChecked(email);

      if (isDuplicate) {
        form.setError(field, { type: "manual", message: errorMessage });
        setIsAvailable(false);
      } else {
        form.clearErrors(field);
        setIsAvailable(true);
      }
    } catch (error) {
      console.error("이메일 중복검사 오류:", error);
      form.setError(field, {
        type: "server",
        message: "이메일 중복 확인에 실패했습니다.",
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
    checkEmailDuplicate,
    isChecking,
    isButtonDisabled,
    isAvailable,
  };
}
