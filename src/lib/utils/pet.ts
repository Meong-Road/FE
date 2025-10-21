import {
  PetInfoFormSchema,
  PetInfoUpdateSchema,
} from "@/components/Modal/_hooks/usePetInfoForm";
import { PetType } from "@/lib/types/pets";

import { hasFormChanges } from "./form";

/**
 * 펫 정보를 폼 스키마 형태로 변환하는 유틸 함수
 */
export const transformPetToFormData = (pet: PetType): PetInfoFormSchema => ({
  name: pet?.name || "",
  gender: pet?.gender?.toLowerCase() as "male" | "female",
  birthYear: pet?.birthYear || "",
  breed: pet?.breed || "",
  neuter:
    pet?.neuter === true ? "did" : pet?.neuter === false ? "didnot" : undefined,
  existingPhotoUrl: pet?.image,
});

/**
 * 펫 정보 폼의 변경사항 확인
 */
export const hasPetFormChanges = (
  current: PetInfoUpdateSchema,
  initial: PetInfoFormSchema | null,
): boolean => {
  const keysToCheck: (keyof PetInfoUpdateSchema)[] = [
    "name",
    "gender",
    "birthYear",
    "breed",
    "neuter",
  ];

  return hasFormChanges(current, initial, keysToCheck);
};

/**
 * 펫의 나이를 계산하여 반환
 */
export const calculatePetAge = (birthYear: string): string => {
  const currentYear = new Date().getFullYear();
  const age = currentYear - parseInt(birthYear);
  return `${age}살`;
};

/**
 * 성별을 한글로 변환
 */
export const formatGender = (gender: PetType["gender"]): string => {
  return gender === "MALE" ? "남" : "여";
};

/**
 * 펫 정보를 가공하여 반환
 */
export const processPetInfo = (pet: PetType) => {
  return {
    ...pet,
    age: calculatePetAge(pet.birthYear),
    genderText: formatGender(pet.gender),
  };
};

/**
 * 펫 리스트를 가공하여 반환
 */
export const processPetsInfo = (pets: PetType[]) => {
  return pets.map(processPetInfo);
};
