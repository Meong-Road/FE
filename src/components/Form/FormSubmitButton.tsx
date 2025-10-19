"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

import { Button as BaseButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof BaseButton> & {
  isPending?: boolean;
  isValid?: boolean;
  label: string;
};

export function SubmitButton({
  className,
  isPending,
  disabled,
  label,
  ...props
}: Props) {
  return (
    <BaseButton
      className={cn(
        "h-12 w-full",
        "mt-4",
        "bg-primary",
        "rounded-2xl",
        "text-primary-foreground text-base font-semibold md:text-lg",
        "disabled:bg-muted disabled:text-muted-foreground disabled:opacity-50",
        "select-none",
        className,
      )}
      type="submit"
      disabled={disabled}
      {...props}
    >
      {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : label}
    </BaseButton>
  );
}
