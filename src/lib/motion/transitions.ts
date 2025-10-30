/**
 * Framer Motion Transition Presets
 * 재사용 가능한 transition 설정 모음
 */

import type { Transition } from "framer-motion";

/**
 * Spring 기반 트랜지션
 */
export const springTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 24,
};

export const gentleSpring: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 20,
};

export const bouncySpring: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 17,
};

/**
 * Tween 기반 트랜지션
 */
export const fastTransition: Transition = {
  duration: 0.2,
  ease: "easeOut",
};

export const normalTransition: Transition = {
  duration: 0.3,
  ease: "easeInOut",
};

export const slowTransition: Transition = {
  duration: 0.5,
  ease: "easeInOut",
};

/**
 * Stagger 설정
 */
export const staggerFast = {
  staggerChildren: 0.05,
  delayChildren: 0.1,
};

export const staggerNormal = {
  staggerChildren: 0.1,
  delayChildren: 0.15,
};

export const staggerSlow = {
  staggerChildren: 0.15,
  delayChildren: 0.2,
};
