import { Card } from "@/components/ui/card";

interface GatheringIntroductionSectionProps {
  description: string;
}

export default function GatheringIntroductionSection({
  description,
}: GatheringIntroductionSectionProps) {
  return (
    <section className="mb-12">
      <div className="mb-2 ml-2 text-lg font-semibold">소개</div>
      <Card className="px-7 py-7">{description}</Card>
    </section>
  );
}
