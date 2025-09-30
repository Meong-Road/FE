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
  if (diffMs <= 0)
    return {
      text: "마감 완료",
      variant: "secondary",
    };

  // 1시간 이내
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  if (diffMinutes < 60)
    return {
      text: `${diffMinutes}분 뒤 마감`,
      variant: "primary",
    };

  // 24시간 이내
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 24)
    return {
      text: `${diffHours}시간 뒤 마감`,
      variant: "primary",
    };

  // 그 이상 - n일 전 표시
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return {
    text: `마감 ${diffDays}일 전`,
    variant: "secondary",
  };
}
