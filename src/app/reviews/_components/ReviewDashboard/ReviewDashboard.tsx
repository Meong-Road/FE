import ProgressBar from "@/components/ProgressBar";
import { Rating } from "@/components/ReviewCard";
import { ReviewDashboardType, ReviewScore } from "@/lib/types/review";

interface ReviewDashboardProps {
  DashboardInfo: ReviewDashboardType | null;
}

export default function ReviewDashboard({
  DashboardInfo,
}: ReviewDashboardProps) {
  if (!DashboardInfo) {
    return null;
  }

  const totalReviews =
    DashboardInfo.OneStar +
    DashboardInfo.TwoStar +
    DashboardInfo.ThreeStar +
    DashboardInfo.FourStar +
    DashboardInfo.FiveStar;

  // 0.5 단위로 반올림
  const roundedScore = (Math.round(DashboardInfo.averageScore * 2) /
    2) as ReviewScore;

  const starData = [
    { label: "5점", count: DashboardInfo.FiveStar },
    { label: "4점", count: DashboardInfo.FourStar },
    { label: "3점", count: DashboardInfo.ThreeStar },
    { label: "2점", count: DashboardInfo.TwoStar },
    { label: "1점", count: DashboardInfo.OneStar },
  ];

  return (
    <div className="flex w-full flex-col items-center gap-8 rounded-3xl bg-orange-50 px-6 py-8 sm:flex-row sm:gap-16 sm:px-12 sm:py-10">
      {/* 왼쪽: 평균 점수 */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-end gap-1.5">
          <p className="text-[40px] leading-none font-semibold">
            {DashboardInfo.averageScore.toFixed(1)}
          </p>
          <p className="text-base leading-5 text-gray-600">
            (총 {totalReviews}명 참여)
          </p>
        </div>
        <Rating score={roundedScore} size="lg" />
      </div>

      {/* 오른쪽: 별점 분포 */}
      <div className="flex w-full flex-1 flex-col gap-2.5">
        {starData.map(({ label, count }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="w-8 text-sm font-medium text-gray-700">
              {label}
            </span>
            <div className="flex-1">
              <ProgressBar
                percentage={totalReviews > 0 ? (count / totalReviews) * 100 : 0}
                className="h-2"
              />
            </div>
            <span className="w-6 text-right text-sm font-medium text-gray-700">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
