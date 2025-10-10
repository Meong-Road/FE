"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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

  const currentValue = (form.watch(field) as string)?.trim() ?? "";

  const defaultErrorMessage =
    errorMessage ??
    `이미 사용 중인 ${type === "email" ? "이메일" : "닉네임"}입니다.`;

  /** ✅ 공통 상태 초기화 함수 */
  const resetCheckState = useCallback(
    (available: boolean | null, passed: boolean) => {
      setIsAvailable(available);
      if (checkPassedField) {
        form.setValue(checkPassedField, passed as PathValue<T, Path<T>>, {
          shouldValidate: true,
        });
      }
    },
    [form, checkPassedField],
  );

  /** ✅ 필드 값 변경 시 중복확인 상태 초기화 */
  useEffect(() => {
    if (currentValue !== lastChecked) {
      resetCheckState(null, false);
    }
  }, [currentValue, lastChecked, resetCheckState]);

  /** ✅ 중복 검사 실행 함수 */
  const checkDuplicate = useCallback(async () => {
    const value = currentValue;
    if (!value) return;

    const isValid = await form.trigger(field);
    if (!isValid) return;

    setIsChecking(true);
    try {
      const isDuplicate =
        type === "email"
          ? await checkEmailDuplicate(value)
          : await checkNicknameDuplicate(value);

      setLastChecked(value);

      if (isDuplicate) {
        form.setError(field, { type: "manual", message: defaultErrorMessage });
        resetCheckState(false, false);
      } else {
        form.clearErrors(field);
        resetCheckState(true, true);
      }
    } catch (error) {
      const label = type === "email" ? "이메일" : "닉네임";
      console.error(`${label} 중복검사 실패:`, error);

      form.setError(field, {
        type: "server",
        message: `${label} 중복 확인 중 오류가 발생했습니다.`,
      });

      resetCheckState(null, false);
    } finally {
      setIsChecking(false);
    }
  }, [form, field, type, currentValue, defaultErrorMessage, resetCheckState]);

  // 버튼 비활성화 조건 계산 함수
  const isButtonDisabled = useMemo(() => {
    const hasError = !!form.formState.errors[field];
    const sameAsLast = currentValue === lastChecked;
    return isChecking || !currentValue || sameAsLast || hasError;
  }, [isChecking, currentValue, lastChecked, form.formState.errors, field]);

  return {
    checkDuplicate,
    isChecking,
    isButtonDisabled,
    isAvailable,
  };
}
