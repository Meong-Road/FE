import { Skeleton } from "@/components/ui/skeleton";

export function ProfileCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-4 transition-all">
      {/* CardContent with p-2 sm:p-4 */}
      <div className="p-2 sm:p-4">
        {/* Header: text-[18px] leading-none mb-4 */}
        <div className="mb-4">
          <Skeleton className="h-[18px] w-24" />
        </div>

        {/* Edit Button: absolute top-4 right-4, h-8 w-8 rounded-full */}
        <div className="absolute top-4 right-4">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        {/* Content: flex-col sm:flex-row gap-4 items-center */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          {/* Profile Image: size-14 (56px) rounded-full */}
          <Skeleton className="size-14 shrink-0 rounded-full" />

          {/* Right Side: flex-1 flex-col justify-between */}
          <div className="flex flex-1 flex-col justify-between gap-2">
            {/* Nickname: text-lg (28px leading by default) text-center sm:text-left */}
            <Skeleton className="mx-auto h-7 w-32 sm:mx-0" />

            {/* Info: flex items-center gap-2 */}
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              {/* "E-mail." text-sm */}
              <Skeleton className="h-5 w-12" />
              {/* Email text-sm */}
              <Skeleton className="h-5 w-48" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
