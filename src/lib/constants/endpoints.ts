// src/api/constants/endpoints.ts
const PREFIX = "/meong-road";

export const API_ENDPOINTS = {
  AUTH: `${PREFIX}/auth`,
  USER: `${PREFIX}/user`,
  REVIEW: `${PREFIX}/reviews`,
  GATHERING: `${PREFIX}/gatherings`,
  PET: `${PREFIX}/pets`,
} as const;
