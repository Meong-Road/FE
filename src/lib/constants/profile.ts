/**
 * 프로필 탭 정보
 */
export const PROFILE_TABS = {
  JOINED: {
    label: "참여한 모임",
    value: "joined",
  },
  CREATED: {
    label: "만든 모임",
    value: "created",
  },
  REVIEWS: {
    label: "내 리뷰",
    value: "reviews",
  },
  PETS: {
    label: "반려견 정보",
    value: "pets",
  },
} as const;

export const PROFILE_TAB_LIST = [
  PROFILE_TABS.JOINED,
  PROFILE_TABS.CREATED,
  PROFILE_TABS.REVIEWS,
  PROFILE_TABS.PETS,
];

/**
 * 리뷰 서브탭 정보
 */
export const REVIEW_SUB_TABS = {
  WRITABLE: {
    label: "작성 가능",
    value: "writable",
  },
  WRITTEN: {
    label: "작성한 리뷰",
    value: "written",
  },
} as const;

export const REVIEW_SUB_TAB_LIST = [
  REVIEW_SUB_TABS.WRITABLE,
  REVIEW_SUB_TABS.WRITTEN,
];

/**
 * 참여한 모임 서브탭 정보
 */
export const JOINED_SUB_TABS = {
  PENDING: {
    label: "개설 예정",
    value: "pending",
  },
  CONFIRMED: {
    label: "개설 확정",
    value: "confirmed",
  },
  CANCELED: {
    label: "개설 취소",
    value: "canceled",
  },
  CLOSED: {
    label: "마감된 모임",
    value: "closed",
  },
} as const;

export const JOINED_SUB_TAB_LIST = [
  JOINED_SUB_TABS.PENDING,
  JOINED_SUB_TABS.CONFIRMED,
  JOINED_SUB_TABS.CANCELED,
  JOINED_SUB_TABS.CLOSED,
];

/**
 * 만든 모임 서브탭 정보
 */
export const CREATED_SUB_TABS = {
  PENDING: {
    label: "개설 예정",
    value: "pending",
  },
  CONFIRMED: {
    label: "개설 확정",
    value: "confirmed",
  },
  CANCELED: {
    label: "개설 취소",
    value: "canceled",
  },
  CLOSED: {
    label: "마감된 모임",
    value: "closed",
  },
} as const;

export const CREATED_SUB_TAB_LIST = [
  CREATED_SUB_TABS.PENDING,
  CREATED_SUB_TABS.CONFIRMED,
  CREATED_SUB_TABS.CANCELED,
  CREATED_SUB_TABS.CLOSED,
];
