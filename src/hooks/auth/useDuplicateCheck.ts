"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";

import { authApi } from "@/api/auth";

interface UseDuplicateCheckProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  field: Path<T>;
  checkPassedField?: Path<T>;
  errorMessage?: string;
  initialValue?: string; // 초기값을 명시적으로 전달
}

type DuplicateCheckType = "email" | "nickname";

export function useDuplicateCheck<T extends FieldValues>(
  type: DuplicateCheckType,
  {
    form,
    field,
    checkPassedField,
    errorMessage,
    initialValue,
  }: UseDuplicateCheckProps<T>,
) {
  const currentValue = (form.watch(field) as string)?.trim() ?? "";

  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [lastChecked, setLastChecked] = useState<string | null>(null);

  const defaultErrorMessage =
    errorMessage ??
    `이미 사용 중인 ${type === "email" ? "이메일" : "닉네임"}입니다.`;

  /** 공통 상태 초기화 함수 */
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

  /** 초기값 설정 및 폼 리셋 감지 */
  useEffect(() => {
    if (initialValue !== undefined) {
      setLastChecked(initialValue);
      // 초기값이 있으면 중복체크 통과 상태로 설정
      resetCheckState(true, true);
    }
  }, [initialValue, resetCheckState]);

  /** 필드 값 변경 시 중복확인 상태 초기화 */
  useEffect(() => {
    // 현재 값이 초기값과 같으면 중복체크 통과 상태 유지
    if (initialValue !== undefined && currentValue === initialValue) {
      resetCheckState(true, true);
      return;
    }

    // 값이 변경되었으면 중복확인 상태 초기화
    if (lastChecked !== null && currentValue !== lastChecked) {
      resetCheckState(null, false);
    }
  }, [currentValue, lastChecked, initialValue, resetCheckState]);

  /** 중복 검사 실행 함수 */
  const checkDuplicate = useCallback(async () => {
    const value = currentValue;
    if (!value) return;

    const isValid = await form.trigger(field);
    if (!isValid) return;

    setIsChecking(true);
    try {
      const isDuplicate =
        type === "email"
          ? await authApi.checkEmailDuplicate(value)
          : await authApi.checkNicknameDuplicate(value);

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
    const sameAsInitial =
      initialValue !== undefined && currentValue === initialValue;

    // 초기값과 같으면 중복체크 불필요 (이미 검증된 값)
    if (sameAsInitial) {
      return true;
    }

    return isChecking || !currentValue || sameAsLast || hasError;
  }, [
    isChecking,
    currentValue,
    lastChecked,
    initialValue,
    form.formState.errors,
    field,
  ]);

  return {
    checkDuplicate,
    isChecking,
    isButtonDisabled,
    isAvailable,
  };
}
