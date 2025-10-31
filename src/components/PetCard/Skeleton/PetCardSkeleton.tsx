import { Skeleton } from "@/components/ui/skeleton";

export function PetCardSkeleton() {
  return (
    <div className="border-primary/30 group relative overflow-hidden rounded-3xl border-2 bg-white p-4 transition-all duration-300 select-none">
      <div className="px-0 py-5">
        <div className="absolute top-3 right-3">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        <div className="mb-4 flex justify-center">
          <Skeleton className="size-[112px] rounded-full" />
        </div>

        <div className="mb-4 flex justify-center">
          <Skeleton className="h-7 w-24" />
        </div>

        <div className="flex items-center justify-center gap-2">
          <Skeleton className="h-5 w-16" />
          <span className="text-foreground/30">•</span>
          <Skeleton className="h-5 w-12" />
          <span className="text-foreground/30">•</span>
          <Skeleton className="h-5 w-10" />
        </div>
      </div>
    </div>
  );
}
