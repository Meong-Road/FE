// src/api/constants/endpoints.ts

// 환경별 API 설정
const getApiConfig = () => {
  // Vercel 배포 환경에서는 프록시 사용
  if (process.env.NODE_ENV === "production") {
    console.log("🚀 프로덕션 환경: ", process.env.NODE_ENV);
    // 서버에서 fetch를 호출할 때, 절대 경로로 호출해야 함
    return { BASE_URL: process.env.NEXT_PUBLIC_SITE_URL, PREFIX: "/api" };
  }

  console.log(
    "🛠️ 로컬 개발 환경: ",
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  );
  return {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    PREFIX: "/meong-road",
  };
};

const apiConfig = getApiConfig();
export const BASE_URL = apiConfig.BASE_URL;
export const PREFIX = apiConfig.PREFIX;

export const API_ENDPOINTS = {
  AUTH: `/auth`,
  USER: `/user`,
  REVIEW: `/reviews`,
  GATHERING: `/gatherings`,
  PET: `/pets`,
} as const;

export const FULL_API_ENDPOINTS = {
  AUTH: `${BASE_URL}${PREFIX}${API_ENDPOINTS.AUTH}`,
  USER: `${BASE_URL}${PREFIX}${API_ENDPOINTS.USER}`,
  REVIEW: `${BASE_URL}${PREFIX}${API_ENDPOINTS.REVIEW}`,
  GATHERING: `${BASE_URL}${PREFIX}${API_ENDPOINTS.GATHERING}`,
  PET: `${BASE_URL}${PREFIX}${API_ENDPOINTS.PET}`,
};
