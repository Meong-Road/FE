/**
 * 문자열의 마지막 글자에 종성이 있는지 확인하는 함수
 * @param text - 확인할 문자열
 * @returns 마지막 글자에 종성이 있는지 여부
 */
export function hasLastConsonantLetter(text: string): boolean {
  return (text.charCodeAt(text.length - 1) - "가".charCodeAt(0)) % 28 !== 0;
}
