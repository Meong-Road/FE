export function ReviewCardSkeleton() {
  return (
    <li className="relative rounded-3xl bg-white shadow-sm">
      <section className="block h-full w-full p-4 sm:p-5 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-5 md:gap-6">
          {/* 이미지 스켈레톤 */}
          <div className="h-[188px] w-full animate-pulse rounded-3xl bg-gray-200 sm:w-[188px] sm:flex-shrink-0" />

          <div className="flex flex-1 flex-col gap-3">
            {/* 프로필 스켈레톤 (닉네임 + 별점 + 날짜 한 줄) */}
            <div className="flex items-center gap-2">
              <div className="h-[38px] w-[38px] flex-shrink-0 animate-pulse rounded-full bg-gray-200" />
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            </div>

            {/* 제목 스켈레톤 */}
            <div className="h-6 w-48 animate-pulse rounded bg-gray-200 sm:w-64" />

            {/* 정보 스켈레톤 (위치 | 요일 | 시간) */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            </div>

            {/* 댓글 스켈레톤 */}
            <div className="flex flex-col gap-2">
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </section>
    </li>
  );
}

export function ReviewCardSkeletonList({ count = 3 }: { count?: number }) {
  return (
    <ol className="space-y-3 sm:space-y-4">
      {Array.from({ length: count }, (_, i) => (
        <ReviewCardSkeleton key={i} />
      ))}
    </ol>
  );
}
