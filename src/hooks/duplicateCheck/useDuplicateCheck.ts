"use client";

import { useEffect, useState } from "react";
import type { FieldValues, Path, PathValue } from "react-hook-form";

import {
  checkEmailDuplicate,
  checkNicknameDuplicate,
} from "@/api/duplicateCheck";
import type {
  DuplicateCheckType,
  UseDuplicateCheckProps,
} from "@/lib/types/duplicateCheck";

export function useDuplicateCheck<T extends FieldValues>(
  type: DuplicateCheckType,
  { form, field, checkPassedField, errorMessage }: UseDuplicateCheckProps<T>,
) {
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [lastChecked, setLastChecked] = useState("");

  const defaultErrorMessage =
    errorMessage ||
    `이미 사용 중인 ${type === "email" ? "이메일" : "닉네임"}입니다.`;

  const currentFieldValue = form.watch(field) as string;

  // 필드 값이 변경되면 중복확인 통과 상태를 초기화
  useEffect(() => {
    if (currentFieldValue !== lastChecked) {
      setIsAvailable(null);
      if (checkPassedField) {
        const currentPassed = form.getValues(checkPassedField);
        if (currentPassed) {
          form.setValue(checkPassedField, false as PathValue<T, Path<T>>, {
            shouldValidate: true,
          });
        }
      }
    }
  }, [currentFieldValue, lastChecked, checkPassedField, form]);

  const checkDuplicate = async () => {
    const value = String(form.getValues(field) ?? "").trim();

    if (!value) {
      return;
    }

    const isValid = await form.trigger(field);
    if (!isValid) {
      return;
    }

    setIsChecking(true);

    try {
      const isDuplicate =
        type === "email"
          ? await checkEmailDuplicate(value)
          : await checkNicknameDuplicate(value);

      setLastChecked(value);

      if (isDuplicate) {
        form.setError(field, { type: "manual", message: defaultErrorMessage });
        setIsAvailable(false);
        if (checkPassedField) {
          form.setValue(checkPassedField, false as PathValue<T, Path<T>>, {
            shouldValidate: true,
          });
        }
      } else {
        form.clearErrors(field);
        setIsAvailable(true);
        if (checkPassedField) {
          form.setValue(checkPassedField, true as PathValue<T, Path<T>>, {
            shouldValidate: true,
          });
        }
      }
    } catch (error) {
      const errorType = type === "email" ? "이메일" : "닉네임";
      console.error(`${errorType} 중복검사 오류:`, error);

      form.setError(field, {
        type: "server",
        message: `${errorType} 중복 확인에 실패했습니다.`,
      });

      setIsAvailable(null);
      if (checkPassedField) {
        form.setValue(checkPassedField, false as PathValue<T, Path<T>>, {
          shouldValidate: true,
        });
      }
    } finally {
      setIsChecking(false);
    }
  };

  const fieldError = form.formState.errors[field];
  const hasValue = Boolean(currentFieldValue?.trim());
  const isSameAsLastChecked = String(currentFieldValue).trim() === lastChecked;

  const isButtonDisabled =
    isChecking || !hasValue || isSameAsLastChecked || Boolean(fieldError);

  return {
    checkDuplicate,
    isChecking,
    isButtonDisabled,
    isAvailable,
  };
}
