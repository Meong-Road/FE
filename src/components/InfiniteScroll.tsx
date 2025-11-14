"use client";
import { ReactNode, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

import useMinimumRendering from "@/hooks/useMinimumRendering";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";
import { cn } from "@/lib/utils";

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
  className?: string;
  data: T[] | undefined;
  render: (item: T, idx: number) => ReactNode;
  renderSkeleton: () => ReactNode;
  renderOnEmpty: () => ReactNode;
  renderOnError: () => ReactNode;
  minimumLoadingTime?: number;
}

export default function InfiniteScroll<T>({
  className,
  data,
  isPending,
  isError,
  isFetchingNextPage,
  fetchNextPage,
  renderSkeleton,
  render,
  renderOnEmpty = () => <EmptyState message="아직 등록된 데이터가 없어요" />,
  renderOnError = () => (
    <ErrorState message="데이터를 불러오는 중 에러가 발생했어요" />
  ),
  minimumLoadingTime = 500,
}: InfiniteScrollProps<T>) {
  const { ref, inView } = useInView();
  const { isRendering } = useMinimumRendering({
    minRenderTime: minimumLoadingTime,
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (isPending || isRendering)
    return (
      <ul className={cn("grid grid-cols-1 gap-y-6", className)}>
        <Iterator count={DEFAULT_LIST_OPTIONS.size}>
          {renderSkeleton()}
        </Iterator>
      </ul>
    );
  if (isError) return renderOnError();
  if (data?.length === 0) return renderOnEmpty();

  return (
    <ul className={cn("grid grid-cols-1 gap-y-6", className)}>
      {data?.map((item, idx) => render(item, idx))}
      {isFetchingNextPage && (
        <Iterator count={DEFAULT_LIST_OPTIONS.size} as="li">
          {renderSkeleton()}
        </Iterator>
      )}
      <div ref={ref} className="h-4" />
    </ul>
  );
}
