import { cn } from "@/lib/utils";

// 공통 버튼 스타일 클래스들
export const buttonStyles = {
  // 기본 버튼 스타일
  base: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",

  // 크기별 스타일
  size: {
    sm: "h-8 px-3 text-xs",
    default: "h-10 px-4 py-2",
    lg: "h-11 px-8",
    xl: "h-12 px-10 text-base",
    icon: "h-10 w-10",
  },

  // 변형별 스타일
  variant: {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "underline-offset-4 hover:underline text-primary",
  },

  // 특수 버튼 스타일
  special: {
    skipButton:
      "mt-2 border-b-[1px] border-b-zinc-600 text-sm font-medium text-zinc-600 hover:text-zinc-800 hover:border-b-zinc-800 transition-colors",
    deleteButton:
      "mt-2 border-b-[1px] border-b-zinc-500 text-sm font-medium text-zinc-500 hover:text-zinc-700 hover:border-b-zinc-700 transition-colors",
  },
};

// 버튼 스타일 조합 함수
export function getButtonClass({
  variant = "default",
  size = "default",
  className,
}: {
  variant?: keyof typeof buttonStyles.variant;
  size?: keyof typeof buttonStyles.size;
  className?: string;
} = {}) {
  return cn(
    buttonStyles.base,
    buttonStyles.variant[variant],
    buttonStyles.size[size],
    className,
  );
}

// 특수 버튼 스타일 함수
export function getSpecialButtonClass(
  type: "skip" | "delete",
  className?: string,
) {
  const baseClass =
    type === "skip"
      ? buttonStyles.special.skipButton
      : buttonStyles.special.deleteButton;
  return cn(baseClass, className);
}
