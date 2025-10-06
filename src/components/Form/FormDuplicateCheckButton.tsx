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
  className?: string;
}

export function DuplicateCheckButton<T extends FieldValues>({
  form,
  field,
  type,
  checkPassedField,
  errorMessage,
  className,
}: DuplicateCheckButtonProps<T>) {
  const { checkDuplicate, isChecking, isButtonDisabled } = useDuplicateCheck<T>(
    type,
    {
      form,
      field,
      checkPassedField,
      errorMessage,
    },
  );

  return (
    <Button
      type="button"
      variant="outline"
      onClick={checkDuplicate}
      disabled={isButtonDisabled}
      className={cn(
        "h-10 shrink-0 whitespace-nowrap shadow-none select-none",
        type === "email" ? "w-20" : "w-15",
        className,
      )}
    >
      {isChecking ? <Loader2 className="h-3 w-3 animate-spin" /> : "중복확인"}
    </Button>
  );
}
