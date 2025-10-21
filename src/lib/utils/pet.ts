import { PostPetReq } from "@/api/types/pets";
import type {
  PetInfoFormSchema,
  PetInfoUpdateSchema,
} from "@/components/Modal/_hooks/usePetInfoForm";
import type { PetType } from "@/lib/types/pets";

const normalizeNeuter = (
  value: PetInfoFormSchema["neuter"] | PetInfoUpdateSchema["neuter"],
): "true" | "false" | undefined => {
  if (typeof value === "string") {
    return value === "true" ? "true" : value === "false" ? "false" : undefined;
  }

  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }

  return undefined;
};

export const transformPetToFormData = (pet: PetType): PetInfoFormSchema => ({
  image: pet?.image ?? null,
  name: pet?.name,
  gender: pet?.gender,
  birthYear: pet?.birthYear,
  breed: pet?.breed,
  neuter: pet?.neuter ? "true" : "false",
  petType: "dog",
});

export const hasPetFormChanges = (
  current: PetInfoUpdateSchema,
  initial: Partial<PetInfoFormSchema> | null,
): boolean => {
  if (!initial) return false;

  return (
    current.name !== initial.name ||
    current.gender !== initial.gender ||
    current.birthYear !== initial.birthYear ||
    current.breed !== initial.breed ||
    current.neuter !== initial.neuter ||
    current.petType !== initial.petType ||
    current.image !== initial.image
  );
};

export const calculatePetAge = (birthYear: string): string => {
  const parsedYear = parseInt(birthYear, 10);
  if (Number.isNaN(parsedYear)) {
    return "";
  }

  const currentYear = new Date().getFullYear();
  const age = Math.max(currentYear - parsedYear, 0);

  return `${age}살`;
};

export const formatGender = (gender: PetType["gender"]): string => {
  switch (gender) {
    case "MALE":
      return "남아";
    case "FEMALE":
      return "여아";
    default:
      return "";
  }
};

export const processPetInfo = (pet: PetType) => ({
  ...pet,
  age: calculatePetAge(pet.birthYear),
  genderText: formatGender(pet.gender),
});

export const processPetsInfo = (pets: PetType[]) =>
  pets.map((pet) => processPetInfo(pet));
