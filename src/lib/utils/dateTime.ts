import { isAfter, isBefore, subHours } from "date-fns";

import { DAY_MAP_KR } from "../constants/date";
import { DayOfWeek } from "../types/gatherings";

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
 * 마감까지 남은 시간을 계산하여 표시할 텍스트를 반환합니다.
 * @param registrationEnd - 마감 시간 (ISO string)
 * @returns 텍스트
 */
export function getRegistrationDeadlineInfo(
  registrationEnd: string | Date,
): string {
  const now = new Date();
  const endTime = new Date(registrationEnd);
  const diffMs = endTime.getTime() - now.getTime();

  if (diffMs <= 0) return "모집 마감";
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  if (diffMinutes < 60) return `${diffMinutes}분 후 마감`;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 24) return `${diffHours}시간 후 마감`;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return `${diffDays}일 후 마감`;
}

/**
 * 리뷰가 생성된 시간과 현재 시간의 차이를 계산해
 * "10분 전", "1시간 전", "1일 전" 또는 "YYYY.MM.DD" 형식으로 반환합니다.
 * @param createdAt - 리뷰가 생성된 시간 (ISO 문자열)
 * @returns 예: "방금 전", "10분 전", "1시간 전", "1일 전", 7일 이상이면 "YYYY.MM.DD"
 */
export function getTimeAgo(createdAt: string | Date): string {
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
 * @param days - 요일 배열 (예: ["MON", "WED", "FRI"])을 한글 요일 문자열로 포맷팅합니다.
 * @returns "월, 수, 금" 형태의 문자열
 */
export function formatDays(days: DayOfWeek[]): string {
  return days.map((day) => DAY_MAP_KR[day]).join(", ");
}

/**
 * Date 객체를 "YYYY-MM-DD" 형식의 문자열로 변환합니다.
 * @param date - Date 객체
 * @returns "2024-01-15" 형태의 문자열
 */
export const formatDateToISOString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/**
 * 주어진 날짜시간에서 지정된 시간을 빼서 새로운 날짜시간을 반환합니다.
 * 시간이 음수가 되면 이전 날로 넘어갑니다.
 * @param dateTime - ISO 문자열 형태의 날짜시간 (예: "2024-01-15T18:00")
 * @param hoursToSubtract - 빼고자 하는 시간 (기본값: 3)
 * @returns 새로운 날짜시간 ISO 문자열
 */
export const subtractHoursFromDateTime = (
  dateTime: string,
  hoursToSubtract: number = 3,
) => {
  const [date, time] = dateTime.split("T");
  const [hours, minutes] = time.split(":");

  let newHours = parseInt(hours) - hoursToSubtract;
  let newDate = date;

  if (newHours < 0) {
    newHours += 24;
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - 1);
    newDate = currentDate.toISOString().split("T")[0];
  }

  const newTime = `${String(newHours).padStart(2, "0")}:${minutes}:00`;
  return `${newDate}T${newTime}`;
};

export const checkIsBefore = (
  date: Date | string,
  dateToCompare: Date | string = new Date(),
) => {
  return isBefore(date, dateToCompare);
};

export const checkIsAfter = (
  date: Date | string,
  dateToCompare: Date | string = new Date(),
) => {
  return isAfter(date, dateToCompare);
};

export const getHoursBefore = (date: Date | string, amount: number) => {
  return subHours(date, amount);
};
