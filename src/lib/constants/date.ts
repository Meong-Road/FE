export const DAY_OF_WEEK = [
  {
    key: "mon",
    name: "월",
  },
  {
    key: "tue",
    name: "화",
  },
  {
    key: "wed",
    name: "수",
  },
  {
    key: "thu",
    name: "목",
  },
  {
    key: "fri",
    name: "금",
  },
  {
    key: "sat",
    name: "토",
  },
  {
    key: "sun",
    name: "일",
  },
];

export const DAY_OF_WEEK_MAP = Object.fromEntries(
  DAY_OF_WEEK.map((day) => [day.key, day.name]),
);
