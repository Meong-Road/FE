import { PetType } from "@/lib/types/pets";

export const PETS_QUERY_KEYS = {
  all: () => ["pets"] as const,

  myPets: () => [...PETS_QUERY_KEYS.all(), "my"] as const,

  petInfoByUserId: (userId: number) =>
    [...PETS_QUERY_KEYS.all(), "user", userId] as const,

  detail: (id: PetType["id"]) =>
    [...PETS_QUERY_KEYS.all(), "detail", id] as const,
};
