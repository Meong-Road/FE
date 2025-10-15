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
