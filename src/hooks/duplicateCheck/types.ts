import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface UseDuplicateCheckProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  field: Path<T>;
  checkPassedField?: Path<T>;
  errorMessage?: string;
}

export interface EmailCheckResponse {
  result?: { exists?: boolean };
}

export interface NicknameCheckResponse {
  result?: boolean;
}

export type DuplicateCheckType = "email" | "nickname";
