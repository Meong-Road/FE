import { HTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const TAG_VARIANTS = cva(
  "rounded-md bg-slate-100 px-2 py-1 text-sm whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "bg-secondary text-primary",
        secondary: "bg-[#EAEAEA] text-[#737373]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export default function Tag({
  className,
  variant,
  ...props
}: { className?: string } & VariantProps<typeof TAG_VARIANTS> &
  HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(TAG_VARIANTS({ variant }), className)} {...props} />
  );
}
