import { forwardRef, useState } from "react";

import Heart from "@/assets/icons/heart.svg";
import { ReviewInputScore } from "@/lib/types/reviews";
import { cn } from "@/lib/utils";

interface FormRatingInputProps {
  value?: ReviewInputScore;
  onChange?: (value: ReviewInputScore) => void;
  onBlur?: () => void;
  disabled?: boolean;
  name?: string;
}

const SCORES: ReviewInputScore[] = [1, 2, 3, 4, 5];

export const FormRatingInput = forwardRef<
  HTMLInputElement,
  FormRatingInputProps
>(({ value, onChange, onBlur, disabled = false, name }, ref) => {
  const [hoveredScore, setHoveredScore] = useState<ReviewInputScore | null>(
    null,
  );

  const handleClick = (score: ReviewInputScore) => {
    if (disabled) return;
    onChange?.(score);
  };

  const handleMouseEnter = (score: ReviewInputScore) => {
    if (disabled) return;
    setHoveredScore(score);
  };

  const handleMouseLeave = () => {
    setHoveredScore(null);
  };

  const isDecreasingScore = (score: ReviewInputScore) => {
    const displayScore = hoveredScore ?? value ?? 0;
    return score <= displayScore;
  };

  const isIncreasingScore = (score: ReviewInputScore) => {
    const displayScore = hoveredScore ?? value ?? 0;
    return score >= displayScore;
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        className="flex items-center justify-center gap-2"
        onMouseLeave={handleMouseLeave}
      >
        {/* Hidden input for form integration */}
        <input
          ref={ref}
          type="hidden"
          name={name}
          value={value ?? ""}
          onBlur={onBlur}
        />

        {SCORES.map((score) => (
          <button
            key={score}
            type="button"
            onClick={() => handleClick(score)}
            onMouseEnter={() => handleMouseEnter(score)}
            disabled={disabled}
            className={cn(
              "transition-transform duration-150 hover:scale-110 active:scale-95",
              disabled && "cursor-not-allowed opacity-50",
            )}
            aria-label={`${score}점`}
          >
            <Heart
              className={cn(
                "size-12 transition-colors duration-300",
                isDecreasingScore(score)
                  ? isIncreasingScore(score)
                    ? "text-primary/80" // 호버 중
                    : "text-primary" // 선택됨
                  : "fill-slate-200 text-slate-200", // 빈 하트
              )}
            />
          </button>
        ))}
      </div>

      {/* 선택된 점수 표시 */}
      <p className="text-center text-sm text-zinc-600">
        {value === 5
          ? "최고예요! 😍"
          : value === 4
            ? "좋아요! 😊"
            : value === 3
              ? "괜찮아요 😐"
              : value === 2
                ? "아쉬워요 🤨"
                : value === 1
                  ? "별로예요 😞"
                  : "이 모임, 어떠셨나요?"}
      </p>
    </div>
  );
});

FormRatingInput.displayName = "FormRatingInput";
