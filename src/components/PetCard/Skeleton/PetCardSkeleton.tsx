import { Skeleton } from "@/components/ui/skeleton";

export function PetCardSkeleton() {
  return (
    <div className="border-primary/30 group relative overflow-hidden rounded-3xl border-2 bg-white p-4 transition-all duration-300 select-none">
      {/* CardContent: px-0 py-5 */}
      <div className="px-0 py-5">
        {/* Edit Button: absolute top-3 right-3, h-8 w-8, rounded-full */}
        <div className="absolute top-3 right-3">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        {/* Image: size-[112px], rounded-full, centered, mb-4 */}
        <div className="mb-4 flex justify-center">
          <Skeleton className="size-[112px] rounded-full" />
        </div>

        {/* Name: text-lg, text-center, mb-4 */}
        <div className="mb-4 flex justify-center">
          <Skeleton className="h-7 w-24" />
        </div>

        {/* Info: text-sm, flex gap-2, centered */}
        <div className="flex items-center justify-center gap-2">
          {/* Breed */}
          <Skeleton className="h-5 w-16" />
          <span className="text-foreground/30">•</span>
          {/* Age */}
          <Skeleton className="h-5 w-12" />
          <span className="text-foreground/30">•</span>
          {/* Gender */}
          <Skeleton className="h-5 w-10" />
        </div>
      </div>
    </div>
  );
}
