"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

import { ReviewCardCommentProps } from "../types";

export function Comment({ children }: ReviewCardCommentProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  // 현재 브레이크포인트에 맞는 "접힌 줄 수" (Tailwind sm 기준)
  const getClampLines = () =>
    window.matchMedia("(min-width: 640px)").matches ? 1 : 2;

  // 접힌 기준으로만 오버플로우 계산
  const measureCollapsedOverflow = () => {
    const el = textRef.current;
    if (!el) return;

    const styles = getComputedStyle(el);
    const lineHeight = parseFloat(styles.lineHeight || "0");
    if (!lineHeight) return;

    const clampLines = getClampLines();
    const collapsedHeight = lineHeight * clampLines;

    // scrollHeight = 전체 컨텐츠 높이(클램프 무시)
    const fullHeight = el.scrollHeight;

    setHasOverflow(fullHeight > collapsedHeight);
  };

  // 1) children 바뀌면: 접고 → 다음 프레임에 측정
  useLayoutEffect(() => {
    setIsExpanded(false);
    requestAnimationFrame(measureCollapsedOverflow);
  }, [children]);

  // 2) 리사이즈: 펼침 유지, 오버플로만 재측정
  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(measureCollapsedOverflow);
    });
    ro.observe(el);

    // 초기 1회
    requestAnimationFrame(measureCollapsedOverflow);

    return () => ro.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-start justify-between gap-2 sm:flex-row">
      <p
        ref={textRef}
        className={cn(
          // 숫자 라인하이트 권장: leading-6 등(24px) → 측정이 안정적
          "text-base leading-relaxed whitespace-pre-wrap text-zinc-700 transition-all duration-300 ease-in-out sm:text-base",
          // 접힘 상태에서만 line-clamp 적용
          !isExpanded && "line-clamp-2 sm:line-clamp-1",
          // 버튼 있으면 살짝 간격 확보
          hasOverflow && "mb-1.5 sm:mb-0",
          // 긴 단어/URL 케이스 방어
          "break-all",
        )}
      >
        {children}
      </p>

      {hasOverflow && (
        <button
          type="button"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((v) => !v)}
          className={cn(
            "absolute bottom-1.5 inline-flex items-center justify-center self-center rounded-full px-1.5 py-0.5 text-zinc-400 transition-[opacity,color,background-color] duration-200 hover:text-zinc-600 sm:static sm:self-end",
            "opacity-80 hover:opacity-100",
          )}
        >
          {isExpanded ? (
            <ChevronUp className="size-5" />
          ) : (
            <ChevronDown className="size-5" />
          )}
          <span className="sr-only">{isExpanded ? "접기" : "자세히 보기"}</span>
        </button>
      )}
    </div>
  );
}
