"use client";

import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Check, Loader2 } from "lucide-react";

import { useDuplicateCheck } from "@/hooks/duplicateCheck/useDuplicateCheck";
import { cn } from "@/lib/utils";

interface DuplicateCheckButtonProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  field: Path<T>;
  type: "email" | "nickname";
  checkPassedField?: Path<T>;
  errorMessage?: string;
  successMessage?: string;
  className?: string;
}

export function DuplicateCheckButton<T extends FieldValues>({
  form,
  field,
  type,
  checkPassedField,
  errorMessage,
  successMessage,
  className,
}: DuplicateCheckButtonProps<T>) {
  const { checkDuplicate, isChecking, isButtonDisabled, isAvailable } =
    useDuplicateCheck<T>(type, {
      form,
      field,
      checkPassedField,
      errorMessage,
    });

  const hasError = !!form.formState.errors[field];
  const isSuccess = isAvailable === true && !hasError;

  return (
    <button
      type="button"
      onClick={checkDuplicate}
      disabled={isButtonDisabled}
      className={cn(
        // 기본 레이아웃
        "h-10 shrink-0 rounded-md",
        "flex w-18 items-center justify-center",
        "text-xs font-medium",
        "transition-all duration-200",
        "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",

        // Primary filled 스타일 (모든 상태 동일)
        "border-primary bg-primary text-primary-foreground border",

        // Hover (enabled일 때만)
        !isButtonDisabled && "hover:bg-primary/90",

        // Disabled 상태
        "disabled:opacity-60",

        className,
      )}
    >
      {isChecking ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isSuccess ? (
        <div className="flex items-center justify-center gap-1">
          <Check className="h-3.5 w-3.5" />
          <span>완료</span>
        </div>
      ) : (
        <>
          <span>중복확인</span>
        </>
      )}
    </button>
  );
}
