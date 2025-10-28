import { ComponentProps } from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

interface SkeletonProps
  extends ComponentProps<"div">,
    VariantProps<typeof skeletonVariants> {}

const skeletonVariants = cva(
  "max-w-full animate-pulse rounded-md bg-gray-900/10",
  {
    variants: {
      fontSize: {
        xs: "h-4",
        sm: "h-5",
        base: "h-6",
        lg: "h-7",
        xl: "h-7",
        none: "",
      },
      tabletFontSize: {
        xs: "sm:h-4",
        sm: "sm:h-5",
        base: "sm:h-6",
        lg: "sm:h-7",
        xl: "sm:h-7",
        none: "",
      },
      desktopFontSize: {
        xs: "md:h-4",
        sm: "md:h-5",
        base: "md:h-6",
        lg: "md:h-7",
        xl: "md:h-7",
        none: "",
      },
    },
    defaultVariants: {
      fontSize: "none",
    },
  },
);

function Skeleton({
  className,
  fontSize,
  tabletFontSize = fontSize,
  desktopFontSize = tabletFontSize,
  ...props
}: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        skeletonVariants({
          fontSize,
          tabletFontSize,
          desktopFontSize,
          className,
        }),
      )}
      {...props}
    />
  );
}

export { Skeleton };
