import { PetType } from "@/lib/types/pets";

export const petsQueryKeys = {
  all: () => ["pets"] as const,

  myPets: () => [...petsQueryKeys.all(), "my"] as const,

  petInfoByUserId: (userId: number) =>
    [...petsQueryKeys.all(), "user", userId] as const,

  detail: (id: PetType["id"]) =>
    [...petsQueryKeys.all(), "detail", id] as const,
};
