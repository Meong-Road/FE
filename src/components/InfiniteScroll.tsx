"use client";
import { ReactNode, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";

import { EmptyState, ErrorState } from "./common";
import Iterator from "./Iterator";

interface InfiniteScrollProps<T>
  extends Pick<
    UseInfiniteQueryResult,
    | "isPending"
    | "isError"
    | "isFetchingNextPage"
    | "hasNextPage"
    | "fetchNextPage"
  > {
  data: T[] | undefined;
  render: (item: T, idx: number) => ReactNode;
  renderSkeleton: () => ReactNode;
  textOnEmpty?: string;
  textOnError?: string;
  minimumLoadingTime?: number;
}

export default function InfiniteScroll<T>({
  data,
  isPending,
  isError,
  isFetchingNextPage,
  fetchNextPage,
  renderSkeleton,
  render,
  textOnEmpty = "데이터가 없어요",
  textOnError = "에러가 발생했어요",
  minimumLoadingTime = 500,
}: InfiniteScrollProps<T>) {
  const { ref, inView } = useInView();
  const [showSkeleton, setShowSkeleton] = useState(isPending);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  useEffect(() => {
    if (isPending) {
      setShowSkeleton(true);
    } else {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, minimumLoadingTime);

      return () => clearTimeout(timer);
    }
  }, [isPending, minimumLoadingTime]);

  if (showSkeleton)
    return (
      <Iterator count={DEFAULT_LIST_OPTIONS.size}>{renderSkeleton()}</Iterator>
    );
  if (isError) return <ErrorState message={textOnError} />;
  if (data?.length === 0) return <EmptyState message={textOnEmpty} />;

  return (
    <ul className="grid grid-cols-1 gap-6">
      {data?.map((item, idx) => render(item, idx))}
      {isFetchingNextPage && (
        <Iterator count={DEFAULT_LIST_OPTIONS.size}>
          {renderSkeleton()}
        </Iterator>
      )}
      <div ref={ref} className="h-4" />
    </ul>
  );
}
