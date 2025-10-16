/**
 * ISO 8601 날짜 문자열을 한국어 형식으로 변환
 * @param dateString - ISO 8601 형식의 날짜 문자열
 * @returns "11월 17일" 형식의 문자열
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
  });
}

/**
 * ISO 8601 날짜 문자열을 24시간 형식의 시간으로 변환
 * @param dateString - ISO 8601 형식의 날짜 문자열
 * @returns "17:30" 형식의 문자열
 */
export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/**
 * ISO 8601 날짜 문자열을 날짜와 시간으로 변환
 * @param dateString - ISO 8601 형식의 날짜 문자열
 * @returns { date: "11월 17일", time: "17:30" }
 */
export function formatDateTime(dateString: string): {
  date: string;
  time: string;
} {
  return {
    date: formatDate(dateString),
    time: formatTime(dateString),
  };
}
