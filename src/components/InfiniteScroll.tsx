"use client";
import { ReactNode, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";

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
}

export default function InfiniteScroll<T>({
  data,
  isPending,
  isError,
  isFetchingNextPage,
  fetchNextPage,
  renderSkeleton,
  render,
}: InfiniteScrollProps<T>) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (isPending)
    return (
      <Iterator count={DEFAULT_LIST_OPTIONS.size}>{renderSkeleton()}</Iterator>
    );
  if (isError) return <div>Error</div>;

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
