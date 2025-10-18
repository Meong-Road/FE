export const PATH = {
  HOME: "/",
  // AUTH
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  // GATHERINGS
  REGULAR: "/regular",
  REGULAR_DETAIL: (gatheringId: string | number) => `/regular/${gatheringId}`,
  REGULAR_CREATE: "/regular/create",
  QUICK: "/quick",
  QUICK_DETAIL: (gatheringId: string | number) => `/quick/${gatheringId}`,
  QUICK_CREATE: "/quick/create",
  // FAVORITES
  FAVORITES: `/favorites`,
  // PROFILE
  MY_PROFILE: "/profile",
  PROFILE: (userId: string | number) => `/profile/${userId}`,
  // REVIEWS
  REVIEWS: "/reviews",
};

/**
 * 인증이 필요한 경로 목록
 * 이 배열에 경로를 추가하면 자동으로 인증 체크가 적용됩니다.
 */
export const PROTECTED_ROUTES = [
  PATH.MY_PROFILE,
  PATH.FAVORITES,
  PATH.QUICK_CREATE,
  PATH.REGULAR_CREATE,
] as const;
