/**
 * ScaleIn Motion Wrapper
 * 스케일 인 애니메이션을 적용하는 래퍼 컴포넌트
 */

"use client";

import { forwardRef } from "react";
import { type HTMLMotionProps, motion } from "framer-motion";

import { scaleVariants } from "@/lib/motion/variants";

interface ScaleInProps extends HTMLMotionProps<"div"> {
  /**
   * 애니메이션 지연 시간 (초)
   * @default 0
   */
  delay?: number;
}

export const ScaleIn = forwardRef<HTMLDivElement, ScaleInProps>(
  ({ children, delay = 0, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={scaleVariants}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 24,
          delay,
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

ScaleIn.displayName = "ScaleIn";
