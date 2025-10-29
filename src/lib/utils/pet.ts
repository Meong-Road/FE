import type {
  PetInfoFormSchema,
  PetInfoUpdateSchema,
} from "@/components/Modal/PetInfoModal/hooks/usePetInfoForm";
import type { PetType } from "@/lib/types/pets";

export const transformPetToFormData = (pet: PetType): PetInfoFormSchema => ({
  image: pet?.image ?? null,
  name: pet?.name,
  gender: pet?.gender,
  birthYear: pet?.birthYear,
  breed: pet?.breed,
  neuter: pet?.neuter ? "true" : pet?.neuter === false ? "false" : undefined,
  petType: "dog",
});

export const hasPetFormChanges = (
  current: PetInfoUpdateSchema,
  initial: Partial<PetInfoFormSchema> | null,
): boolean => {
  if (!initial) return false;

  // 이미지 변경 체크 (File 객체인 경우 항상 변경된 것으로 간주)
  const isImageChanged =
    current.image instanceof File || current.image !== initial.image;

  return (
    current.name !== initial.name ||
    current.gender !== initial.gender ||
    current.birthYear !== initial.birthYear ||
    current.breed !== initial.breed ||
    current.neuter !== initial.neuter ||
    current.petType !== initial.petType ||
    isImageChanged
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
