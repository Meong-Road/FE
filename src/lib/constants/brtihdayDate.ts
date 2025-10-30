export const CURRENT_YEAR = new Date().getFullYear();

// 현재 연도부터 과거 20년전까지(총 21개) 선택 가능
export const YEARS: readonly number[] = Array.from(
  { length: 21 },
  (_, i) => CURRENT_YEAR - i,
);

export const YEARS_OPTIONS: readonly string[] = YEARS.map((year) =>
  String(year),
);
