import { isAfter } from "date-fns";

import { DAY_MAP_KR } from "../constants/date";

/**
 * 날짜를 "YY. MM. DD (요일) HH:MM" 형태로 포맷팅합니다.
 * @param date - 날짜 문자열 또는 Date 객체
 * @returns "25. 09. 26 (금) 18:00" 형태의 문자열
 */
export const formatDate = (date: string | Date) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const year = dateObj.getFullYear().toString().slice(-2);
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  const dayOfWeek = dateObj.toLocaleDateString("ko-KR", { weekday: "short" });

  return `${year}. ${month}. ${day} (${dayOfWeek}) ${hours}:${minutes}`;
};

/**
 * 마감까지 남은 시간을 계산하여 표시 텍스트와 색상을 반환합니다.
 * @param registrationEnd - 마감 시간 (ISO string)
 * @returns 텍스트와 색상 객체
 */
export function getRegistrationDeadlineInfo(registrationEnd: string): {
  text: string;
  variant: "primary" | "secondary";
} {
  const now = new Date();
  const endTime = new Date(registrationEnd);
  const diffMs = endTime.getTime() - now.getTime();

  // 이미 마감된 경우
  if (diffMs <= 0) {
    return {
      text: "모집 마감",
      variant: "secondary",
    };
  }

  // 1시간 이내
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  if (diffMinutes < 60) {
    return {
      text: `${diffMinutes}분 후 마감`,
      variant: "primary",
    };
  }

  // 24시간 이내
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 24) {
    return {
      text: `${diffHours}시간 후 마감`,
      variant: "primary",
    };
  }

  // 그 이상 - n일 전 표시
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return {
    text: `${diffDays}일 후 마감`,
    variant: "secondary",
  };
}

/**
 * 리뷰가 생성된 시간과 현재 시간의 차이를 계산해
 * "10분 전", "1시간 전", "1일 전" 또는 "YYYY.MM.DD" 형식으로 반환합니다.
 * @param createdAt - 리뷰가 생성된 시간 (ISO 문자열)
 * @returns 예: "방금 전", "10분 전", "1시간 전", "1일 전", 7일 이상이면 "YYYY.MM.DD"
 */
export function getTimeAgo(createdAt: string): string {
  const created = new Date(createdAt);
  const now = new Date();

  const diffMs = now.getTime() - created.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) {
    return "방금 전";
  }
  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }
  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }
  if (diffDays < 7) {
    return `${diffDays}일 전`;
  }

  const year = created.getFullYear();
  const month = String(created.getMonth() + 1).padStart(2, "0");
  const day = String(created.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

/**
 * 날짜를 "YYYY.MM.DD" 형식으로 포맷팅합니다.
 * @param dateString - 날짜 문자열
 * @returns "2024.01.25" 형태의 문자열
 */
export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

/**
 * 요일 배열을 한글 요일 문자열로 포맷팅합니다.
 * @param daysString - JSON 형식의 요일 배열 문자열 (예: '["MON", "WED", "FRI"]') 또는 "[MON, WED, FRI]" 형태
 * @returns "월, 수, 금" 형태의 문자열
 */
export function formatDays(daysString: string): string {
  try {
    // 먼저 정상적인 JSON 파싱 시도
    const daysArray = JSON.parse(daysString) as string[];
    return daysArray.map((day) => DAY_MAP_KR[day]).join(", ");
  } catch {
    try {
      // "[MON, WED, FRI]" 형태의 문자열 처리
      const cleanString = daysString.replace(/\[|\]/g, ""); // 대괄호 제거
      const daysArray = cleanString
        .split(",")
        .map((day) => day.trim().replace(/"/g, "")); // 쉼표로 분리하고 따옴표 제거
      return daysArray.map((day) => DAY_MAP_KR[day]).join(", ");
    } catch {
      return "";
    }
  }
}

export const checkIsAfter = (
  date: Date | string,
  dateToCompare: Date | string = new Date(),
) => {
  return isAfter(date, dateToCompare);
};
