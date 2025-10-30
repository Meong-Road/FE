"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { type TabItemProps } from "./types";

export function TabItem({ href, isActive, children }: TabItemProps) {
  return (
    <li className="relative flex h-10 w-28 items-center justify-center text-sm sm:h-15 sm:w-40 sm:text-xl">
      <Link
        href={href}
        scroll={false}
        className={`relative z-10 font-semibold ${isActive ? "text-primary" : "text-font-input"}`}
      >
        {children}
      </Link>

      {/* Animated Underline */}
      {isActive && (
        <motion.div
          layoutId={`tabUnderline-${href.split("?")[0]}`}
          className="border-primary absolute right-0 bottom-0 left-0 border-b-3"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      )}
    </li>
  );
}
