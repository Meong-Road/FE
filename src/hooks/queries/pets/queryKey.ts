export const PETS_QUERY_KEYS = {
  all: ["pets"] as const,
  myPets: () => [...PETS_QUERY_KEYS.all, "my"] as const,
  detail: (id: number) => [...PETS_QUERY_KEYS.all, "detail", id] as const,
};
