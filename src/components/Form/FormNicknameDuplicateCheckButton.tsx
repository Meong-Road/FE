"use client";

import * as React from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useNicknameDuplicateCheck } from "@/hooks/duplicateCheck/useNicknameDuplicateCheck";
import { cn } from "@/lib/utils";

interface NicknameDuplicateCheckButtonProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  field: Path<T>;
  errorMessage?: string;
  className?: string;
}

export function NicknameDuplicateCheckButton<T extends FieldValues>({
  form,
  field,
  errorMessage,
  className,
}: NicknameDuplicateCheckButtonProps<T>) {
  const { checkNicknameDuplicate, isChecking, isButtonDisabled } =
    useNicknameDuplicateCheck({
      form,
      field,
      errorMessage,
    });

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={checkNicknameDuplicate}
      disabled={isButtonDisabled}
      className={cn("shrink-0 whitespace-nowrap", className)}
    >
      {isChecking ? (
        <>
          <Loader2 className="h-3 w-3 animate-spin" />
          확인 중...
        </>
      ) : (
        "중복확인"
      )}
    </Button>
  );
}
