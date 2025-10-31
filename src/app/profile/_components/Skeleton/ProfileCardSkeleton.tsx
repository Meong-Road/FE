import { Skeleton } from "@/components/ui/skeleton";

export function ProfileCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-4 transition-all">
      <div className="p-2 sm:p-4">
        <div className="mb-4">
          <Skeleton className="h-[18px] w-24" />
        </div>

        <div className="absolute top-4 right-4">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Skeleton className="size-14 shrink-0 rounded-full" />

          <div className="flex flex-1 flex-col justify-between gap-2">
            <Skeleton className="mx-auto h-7 w-32 sm:mx-0" />

            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-5 w-48" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
