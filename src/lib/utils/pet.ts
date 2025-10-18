import { PetType } from "@/lib/types/pets";

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
