import { Skeleton } from "@/components/ui/skeleton";

export function FiltersSkeleton() {
  return (
    <div className="flex w-full items-center gap-2">
      <Skeleton className="h-10 w-30 bg-gray-200" />
      <Skeleton className="h-10 w-30 bg-gray-200" />
    </div>
  );
}
