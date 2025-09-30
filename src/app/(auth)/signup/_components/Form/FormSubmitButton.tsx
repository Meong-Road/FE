"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

import { Button as BaseButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof BaseButton> & { isPending?: boolean };

export function SubmitButton({ className, isPending, ...props }: Props) {
  return (
    <BaseButton
      className={cn("w-full", className)}
      type="submit"
      disabled={isPending}
      {...props}
    >
      {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "전송"}
    </BaseButton>
  );
}
