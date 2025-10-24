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
    label: "리뷰",
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
