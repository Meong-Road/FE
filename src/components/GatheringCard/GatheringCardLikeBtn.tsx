"use client";

import { MouseEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";

import LikeBtn from "@/assets/icons/like-btn.svg";
import LikeBtnFilled from "@/assets/icons/like-btn-filled.svg";
import {
  GATHERING_QUERY_KEY,
  useCancelLike,
  useGetIsLiked,
  useLike,
} from "@/hooks/queries/gathering";
import { GatheringType } from "@/lib/types/gathering";

export interface GatheringCardLikeBtnProps {
  id: GatheringType["id"];
}

export function GatheringCardLikeBtn({ id }: GatheringCardLikeBtnProps) {
  const queryClient = useQueryClient();
  const { data, isPending, isError } = useGetIsLiked({
    id,
  });
  const { mutate: like } = useLike({
    id,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GATHERING_QUERY_KEY.IS_LIKED({ id }),
      });
    },
  });
  const { mutate: cancelLike } = useCancelLike({
    id,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GATHERING_QUERY_KEY.IS_LIKED({ id }),
      });
    },
  });

  if (isPending)
    return (
      <div className="absolute top-8 right-6 h-8 w-8 rounded-full bg-slate-50"></div>
    );
  if (isError)
    return (
      <div className="absolute top-8 right-6 h-8 w-8 rounded-full bg-slate-50">
        오류
      </div>
    );

  const isLiked = data.result?.isLiked;

  const handleLikeButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO
    if (isLiked) cancelLike();
    else like();
  };

  return (
    <button className="absolute top-8 right-6" onClick={handleLikeButtonClick}>
      {isLiked ? (
        <LikeBtnFilled width={48} height={48} />
      ) : (
        <LikeBtn width={48} height={48} />
      )}
    </button>
  );
}
