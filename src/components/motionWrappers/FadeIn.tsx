/**
 * FadeIn Motion Wrapper
 * 페이드 인 애니메이션을 적용하는 래퍼 컴포넌트
 */

"use client";

import { forwardRef } from "react";
import { type HTMLMotionProps, motion } from "framer-motion";

import { fadeVariants } from "@/lib/motion/variants";

interface FadeInProps extends HTMLMotionProps<"div"> {
  /**
   * 애니메이션 지연 시간 (초)
   * @default 0
   */
  delay?: number;
  /**
   * 애니메이션 지속 시간 (초)
   * @default 0.3
   */
  duration?: number;
}

export const FadeIn = forwardRef<HTMLDivElement, FadeInProps>(
  ({ children, delay = 0, duration = 0.3, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={fadeVariants}
        transition={{
          duration,
          delay,
          ease: "easeOut",
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

FadeIn.displayName = "FadeIn";
