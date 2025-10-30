/**
 * SlideIn Motion Wrapper
 * 슬라이드 인 애니메이션을 적용하는 래퍼 컴포넌트
 */

"use client";

import { forwardRef } from "react";
import { type HTMLMotionProps, motion } from "framer-motion";

import { slideVariants } from "@/lib/motion/variants";

type Direction = "up" | "down" | "left" | "right";

interface SlideInProps extends HTMLMotionProps<"div"> {
  /**
   * 슬라이드 방향
   * @default 'up'
   */
  direction?: Direction;
  /**
   * 애니메이션 지연 시간 (초)
   * @default 0
   */
  delay?: number;
}

export const SlideIn = forwardRef<HTMLDivElement, SlideInProps>(
  ({ children, direction = "up", delay = 0, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={slideVariants[direction]}
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

SlideIn.displayName = "SlideIn";
