import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface UseDuplicateCheckProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  field: Path<T>;
  checkPassedField?: Path<T>;
  errorMessage?: string;
}

export interface GetEmailDuplicateCheckRes {
  result?: { exists?: boolean };
}

export interface PostNicknameDuplicateCheckRes {
  result?: boolean;
}

export type DuplicateCheckType = "email" | "nickname";
