"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

import { Button as BaseButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof BaseButton> & {
  isPending?: boolean;
  isValid?: boolean;
};

export function SubmitButton({
  className,
  isPending,
  isValid,
  ...props
}: Props) {
  return (
    <BaseButton
      className={cn(
        "h-12 w-full",
        "md:h-14",
        "bg-primary",
        "rounded-2xl",
        "text-primary-foreground text-xl font-semibold",
        className,
      )}
      type="submit"
      disabled={isPending || !isValid}
      {...props}
    >
      {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "회원가입"}
    </BaseButton>
  );
}
