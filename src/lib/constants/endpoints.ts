// src/api/constants/endpoints.ts

/**
 * API 엔드포인트 설정
 *
 * 프론트엔드와 백엔드가 같은 루트 도메인(meong-road.site)을 사용하므로
 * 프록시 없이 백엔드 API를 직접 호출합니다.
 *
 * - 프론트엔드: https://meong-road.site
 * - 백엔드: https://api.meong-road.site:8050
 *
 * SameSite 쿠키가 정상 동작하며, CORS 설정만 필요합니다.
 */
const getApiConfig = () => {
  // 모든 환경에서 백엔드 API 직접 호출
  // (HttpOnly 쿠키가 정상 작동하려면 프록시 사용 하면 안됨)
  return {
    BASE_URL: "https://api.meong-road.site:8050",
    PREFIX: "/meong-road",
  };
};

const apiConfig = getApiConfig();
export const { BASE_URL, PREFIX } = apiConfig;

export const API_ENDPOINTS = {
  AUTH: `/auth`,
  USER: `/user`,
  REVIEW: `/reviews`,
  GATHERING: `/gatherings`,
  PET: `/pets`,
  OAUTH: {
    GOOGLE: `/auth/google`,
    KAKAO: `/auth/kakao`,
  },
} as const;

export const FULL_API_ENDPOINTS = {
  AUTH: `${BASE_URL}${PREFIX}${API_ENDPOINTS.AUTH}`,
  USER: `${BASE_URL}${PREFIX}${API_ENDPOINTS.USER}`,
  REVIEW: `${BASE_URL}${PREFIX}${API_ENDPOINTS.REVIEW}`,
  GATHERING: `${BASE_URL}${PREFIX}${API_ENDPOINTS.GATHERING}`,
  PET: `${BASE_URL}${PREFIX}${API_ENDPOINTS.PET}`,
  OAUTH: {
    GOOGLE: `${BASE_URL}${PREFIX}${API_ENDPOINTS.OAUTH.GOOGLE}`,
    KAKAO: `${BASE_URL}${PREFIX}${API_ENDPOINTS.OAUTH.KAKAO}`,
  },
};
