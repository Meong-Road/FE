/**
 * 두 객체의 특정 키들에 대해 변경사항이 있는지 확인하는 공통 유틸리티
 */
export const hasFormChanges = <T extends Record<string, unknown>>(
  current: T,
  initial: T | null,
  keysToCheck: (keyof T)[],
): boolean => {
  if (!initial) return false;

  return keysToCheck.some((key) => current[key] !== initial[key]);
};
