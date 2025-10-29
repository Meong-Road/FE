import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function GatheringIntroductionSectionSkeleton() {
  return (
    <div className="mb-12">
      <Skeleton fontSize="lg" className="mb-2 ml-2 w-10 text-lg" />
      <Card className="px-10 py-10">
        <Skeleton fontSize="base" className="w-full" />
        <Skeleton fontSize="base" className="w-full" />
      </Card>
    </div>
  );
}
