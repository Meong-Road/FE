import { Card } from "@/components/ui/card";

interface GatheringIntroductionSectionProps {
  description: string;
}

export default function GatheringIntroductionSection({
  description,
}: GatheringIntroductionSectionProps) {
  return (
    <section className="mb-12">
      <div className="mb-6 text-2xl font-semibold">모임 소개</div>
      <Card className="px-10 py-10">{description}</Card>
    </section>
  );
}
