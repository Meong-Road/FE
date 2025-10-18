import { ReviewDashboardType, ReviewScore } from "@/lib/types/reviews";

/**
 * 리뷰 대시보드 데이터를 처리하는 유틸 함수들
 */

/**
 * 총 리뷰 수를 계산합니다
 */
export function calculateTotalReviews(
  dashboardData: ReviewDashboardType,
): number {
  return (
    dashboardData.oneStar +
    dashboardData.twoStars +
    dashboardData.threeStars +
    dashboardData.fourStars +
    dashboardData.fiveStars
  );
}

/**
 * 평균 점수를 0.5 단위로 반올림합니다
 */
export function roundAverageScore(averageScore: number): ReviewScore {
  return (Math.round(averageScore * 2) / 2) as ReviewScore;
}

/**
 * 별점 분포 데이터를 생성합니다
 */
export function createStarDistributionData(dashboardData: ReviewDashboardType) {
  const totalReviews = calculateTotalReviews(dashboardData);

  return [
    { label: "5점", count: dashboardData.fiveStars },
    { label: "4점", count: dashboardData.fourStars },
    { label: "3점", count: dashboardData.threeStars },
    { label: "2점", count: dashboardData.twoStars },
    { label: "1점", count: dashboardData.oneStar },
  ].map(({ label, count }) => ({
    label,
    count,
    percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0,
  }));
}

/**
 * 리뷰 대시보드 데이터를 처리하여 UI에서 사용할 수 있는 형태로 변환합니다
 */
export function processReviewDashboardData(dashboardData: ReviewDashboardType) {
  const totalReviews = calculateTotalReviews(dashboardData);
  const roundedScore = roundAverageScore(dashboardData.averageScore);
  const starData = createStarDistributionData(dashboardData);

  return {
    totalReviews,
    roundedScore,
    starData,
    averageScore: dashboardData.averageScore,
  };
}
