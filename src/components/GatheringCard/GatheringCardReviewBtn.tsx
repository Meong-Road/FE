"use client";

import { MouseEvent } from "react";

import { useGatheringStateContext } from "@/hooks/context/useGatheringStateContext";
import { useGetUserReviewByGathering } from "@/hooks/queries/reviews";
import { useReviewInfoModalStore } from "@/store/modalStore";

import { Button } from "../ui/button";

import GatheringCardSkeleton from "./Skeleton/GatheringCardSkeleton";

export function GatheringCardReviewBtn() {
  const { gathering } = useGatheringStateContext();
  const { openModal } = useReviewInfoModalStore();

  // 사용자가 작성한 리뷰 조회
  const { data: userReview, isPending } = useGetUserReviewByGathering(
    gathering.id,
  );

  const handleReviewClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (userReview) {
      // 리뷰가 있으면 수정 모드
      openModal("edit-review", userReview.id);
    } else {
      // 리뷰가 없으면 작성 모드
      openModal("add-review", gathering.id);
    }
  };

  // 로딩 중
  if (isPending) return <GatheringCardSkeleton.JoinBtn />;

  // 리뷰 버튼 표시 (작성하기 or 수정하기)
  return (
    <Button size="xl" variant="default" onClick={handleReviewClick}>
      {userReview ? "리뷰 수정하기" : "리뷰 작성하기"}
    </Button>
  );
}
