"use client";

import GoogleIcon from "@/assets/icons/google-icon.svg";
import KakaoIcon from "@/assets/icons/kakao-icon.svg";
import { cn } from "@/lib/utils";

function GoogleIconSvg({
  width,
  className,
}: {
  width: number;
  className?: string;
}) {
  return <GoogleIcon width={width} height={width} className={className} />;
}

function KakaoIconSvg({
  width,
  className,
}: {
  width: number;
  className?: string;
}) {
  return <KakaoIcon width={width} height={width} className={className} />;
}

export function SocialButtons({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <>
      {/* 구분선 - 반응형 패딩 조정 */}
      <div className="flex w-full items-center pt-4">
        <div className="flex-1 border-t border-gray-300" />
        <p className="px-2 text-xs font-medium text-gray-500 select-none md:px-3 md:text-sm">
          또는
        </p>
        <div className="flex-1 border-t border-gray-300" />
      </div>

      {/* 소셜 버튼들  */}
      <div className="flex w-full justify-center gap-4 p-2 md:gap-8">
        <button
          className={cn(
            "flex items-center justify-center rounded-full transition-colors",
            "h-14 w-14", //56px
            "bg-white hover:bg-gray-50 active:bg-gray-100",
            "border border-gray-200",
            className,
          )}
          onClick={() => {
            // window.location.href = "https://google.com";
            window.open("https://google.com", "_blank");
          }}
          {...props}
        >
          <GoogleIconSvg width={28} className="md:h-8 md:w-8" />
        </button>

        <button
          className={cn(
            "flex items-center justify-center rounded-full transition-colors",
            "h-14 w-14", //56px
            "bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-500",
            "border border-gray-200",
            className,
          )}
          onClick={() => {
            // window.location.href = "https://kakaotalk.com";
            window.open("https://kakaotalk.com", "_blank");
          }}
          {...props}
        >
          <KakaoIconSvg width={28} className="md:h-8 md:w-8" />
        </button>
      </div>
    </>
  );
}
