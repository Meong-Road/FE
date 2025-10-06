"use client";

import * as React from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
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

  const hasError = form.formState.errors[field];

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={checkDuplicate}
      disabled={isButtonDisabled}
      className={cn(
        "bg-background h-10 w-16 shrink-0 text-xs whitespace-nowrap shadow-none select-none",
        isAvailable &&
          !hasError &&
          "text-green-800 hover:bg-green-50 hover:text-green-600",
        className,
      )}
    >
      {isChecking ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : isAvailable && !hasError ? (
        "사용가능"
      ) : (
        "중복확인"
      )}
    </Button>
  );
}
