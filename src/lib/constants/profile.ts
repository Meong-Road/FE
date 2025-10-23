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
    label: "작성한 리뷰",
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
