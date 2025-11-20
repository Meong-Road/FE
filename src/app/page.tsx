// 루트 페이지는 next.config.ts의 redirects 설정에 의해 /regular로 자동 리다이렉트됨

import QuickGatheringsByParticipation from "./_components/QuickGatheringsByParticipation";
import RegularGatheringsByParticipation from "./_components/RegularGatheringsByParticipation";

export default function Home() {
  return (
    <section className="gird-cols-1 grid gap-y-6">
      <h2 className="text-xl font-bold">많은 사람들이 참여했어요 🐶</h2>
      <RegularGatheringsByParticipation />
      <QuickGatheringsByParticipation />
    </section>
  );
}
