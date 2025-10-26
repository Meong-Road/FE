"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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
          "text-base leading-relaxed break-all text-zinc-700 transition-all duration-300 ease-in-out sm:text-base",
          !isExpanded && "line-clamp-2 sm:line-clamp-1",
          showButton && "mb-3 sm:mb-0",
        )}
      >
        {children}
      </p>

      {showButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "transition-[opacity, background-color, color] absolute bottom-1.5 flex flex-shrink-0 items-center justify-center rounded-full px-0.5 text-zinc-300 opacity-50 duration-300 ease-in-out group-hover:opacity-100 hover:bg-zinc-100 hover:text-zinc-400 sm:static",
            isExpanded && "self-center opacity-100 sm:self-end",
            !isExpanded && "self-center sm:self-start",
          )}
          aria-expanded={isExpanded}
          role="button"
        >
          {isExpanded ? (
            <ChevronUp className="size-6" />
          ) : (
            <ChevronDown className="size-6" />
          )}
        </button>
      )}
    </div>
  );
}
