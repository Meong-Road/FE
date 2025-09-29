import { useState } from "react";
import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";

export default function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeButtonClick = () => {
    setIsLiked((prev) => !prev);
    // TODO
    console.log("찜 API 호출");
  };

  return (
    <button
      className={cn(
        "flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-slate-100 px-2 py-2",
        isLiked && "border-primary/50",
      )}
      onClick={handleLikeButtonClick}
    >
      <Heart
        className={cn(
          "stroke-slate-300",
          isLiked && "fill-primary text-primary stroke-primary",
        )}
      />
    </button>
  );
}
