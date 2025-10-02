"use client";

import * as React from "react";

import { FormLabel as BaseFormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof BaseFormLabel> & {
  required?: boolean;
};

export function Label({ className, children, required, ...props }: Props) {
  return (
    <BaseFormLabel
      className={cn(
        "text-sm font-medium",
        // 에러 상태에 관계없이 기본 색상 유지
        "!text-foreground data-[error=true]:!text-foreground",
        className,
      )}
      {...props}
    >
      {children}
      {required && <span className="text-primary">*</span>}
    </BaseFormLabel>
  );
}
