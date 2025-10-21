import { ComponentProps } from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

interface SkeletonProps
  extends ComponentProps<"div">,
    VariantProps<typeof skeletonVariants> {}

const skeletonVariants = cva("animate-pulse rounded-md bg-gray-900/10", {
  variants: {
    fontSize: {
      sm: "h-5",
      base: "h-6",
      xl: "h-7",
      none: "",
    },
  },
  defaultVariants: {
    fontSize: "none",
  },
});

function Skeleton({ className, fontSize, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(skeletonVariants({ fontSize, className }))}
      {...props}
    />
  );
}

export { Skeleton };
