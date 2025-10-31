import { Skeleton } from "@/components/ui/skeleton";

export function TabsSkeleton() {
  return (
    <nav className="border-border border-b select-none">
      <ul className="flex">
        {[1, 2, 3, 4].map((i) => (
          <li
            key={i}
            className="relative flex h-10 w-28 items-center justify-center text-sm sm:h-15 sm:w-40 sm:text-xl"
          >
            {/* Tab Label: text-sm sm:text-xl font-semibold */}
            <Skeleton className="h-[14px] w-20 sm:h-5 sm:w-28" />
          </li>
        ))}
      </ul>
    </nav>
  );
}
