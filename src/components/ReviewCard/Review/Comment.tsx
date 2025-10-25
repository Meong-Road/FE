"use client";

import { useEffect, useRef, useState } from "react";

import ArrowDownIcon from "@/assets/icons/arrow-down.svg";
import ArrowUpIcon from "@/assets/icons/arrow-up.svg";
import { cn } from "@/lib/utils";

import { ReviewCardCommentProps } from "../types";

export function Comment({ children }: ReviewCardCommentProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      // 텍스트가 1줄을 초과하는지 체크
      const isTruncated =
        textRef.current.scrollHeight > textRef.current.clientHeight;
      setShowButton(isTruncated);
    }
  }, [children]);

  return (
    <div className="flex flex-col items-start gap-2 sm:flex-row">
      <p
        ref={textRef}
        className={cn(
          "text-base leading-relaxed text-zinc-700 transition-all duration-300 ease-in-out sm:text-base",
          !isExpanded && "line-clamp-1",
        )}
      >
        {children}
      </p>

      {showButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "flex h-6 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm text-zinc-400 hover:bg-zinc-100 hover:text-zinc-500",
            isExpanded && "self-center sm:self-end",
            !isExpanded && "self-center sm:self-start",
          )}
          aria-expanded={isExpanded}
          role="button"
        >
          {isExpanded ? (
            <ArrowUpIcon className="size-6" />
          ) : (
            <ArrowDownIcon className="size-6" />
          )}
        </button>
      )}
    </div>
  );
}
