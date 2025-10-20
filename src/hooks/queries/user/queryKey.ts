export const USER_QUERY_KEYS = {
  all: () => ["user"] as const,
  my: () => [...USER_QUERY_KEYS.all(), "my"] as const,
};
