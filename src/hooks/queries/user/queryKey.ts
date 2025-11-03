export const USER_QUERY_KEYS = {
  all: () => ["user"] as const,
  my: () => [...USER_QUERY_KEYS.all(), "my"] as const,
  byId: (userId: number) =>
    [...USER_QUERY_KEYS.all(), "detail", userId] as const,
};
