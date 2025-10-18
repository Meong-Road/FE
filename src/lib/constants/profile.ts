import { PATH } from "./path";

/**
 * 프로필 탭 정보
 */
export const PROFILE_TABS = {
  JOINED: {
    key: "joined",
    label: "내 모임",
    href: PATH.MY_PROFILE,
  },
  REVIEWS: {
    key: "reviews",
    label: "내 리뷰",
    href: `${PATH.MY_PROFILE}?tab=reviews`,
  },
  CREATED: {
    key: "created",
    label: "내가 만든 모임",
    href: `${PATH.MY_PROFILE}?tab=created`,
  },
  PETS: {
    key: "pets",
    label: "반려견 정보",
    href: `${PATH.MY_PROFILE}?tab=pets`,
  },
} as const;

/**
 * 탭 키 타입
 */
export type ProfileTabKey = keyof typeof PROFILE_TABS;
