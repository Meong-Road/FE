// src/api/constants/endpoints.ts
export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const PREFIX = "/meong-road";

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
