// src/mocks/data/pets.ts
import { PetType } from "@/lib/types/pets";

export const mockPets: PetType[] = [
  {
    id: 1,
    name: "멍멍이",
    birthYear: "2020",
    image: "",
    petType: "dog",
    breed: "골든 리트리버",
    gender: "MALE",
    neuter: true,
  },
  {
    id: 2,
    name: "뽀삐",
    birthYear: "2021",
    image: "",
    petType: "dog",
    breed: "말티즈",
    gender: "FEMALE",
    neuter: false,
  },
  {
    id: 3,
    name: "초코",
    birthYear: "2019",
    image: "",
    petType: "dog",
    breed: "믹스견(혼혈)",
    gender: "MALE",
    neuter: false,
  },
  {
    id: 4,
    name: "루이",
    birthYear: "2022",
    image: "",
    petType: "dog",
    breed: "시바",
    gender: "FEMALE",
    neuter: true,
  },
  {
    id: 5,
    name: "바둑이",
    birthYear: "2018",
    image: "",
    petType: "dog",
    breed: "진도견",
    gender: "MALE",
    neuter: false,
  },
  {
    id: 6,
    name: "마루",
    birthYear: "2024",
    image: "",
    petType: "dog",
    breed: "골든 리트리버",
    gender: "FEMALE",
    neuter: false,
  },
  {
    id: 7,
    name: "코코",
    birthYear: "2023",
    image: "",
    petType: "dog",
    breed: "포메라니안",
    gender: "FEMALE",
    neuter: false,
  },
  {
    id: 8,
    name: "맥스",
    birthYear: "2017",
    image: "",
    petType: "dog",
    breed: "저먼 셰퍼드 독",
    gender: "MALE",
    neuter: true,
  },
];

// 특정 유저의 반려동물 목록
export const mockPetsByUserId: Record<number, PetType[]> = {
  1: [mockPets[0], mockPets[1]],
  2: [mockPets[2]],
  3: [mockPets[3], mockPets[4], mockPets[5]],
  4: [mockPets[5], mockPets[6]],
};

// 현재 로그인한 유저의 반려동물
export const mockMyPets = mockPetsByUserId[1] || [];

// 에러 테스트를 위한 케이스
export const ERROR_TEST_CASES = {
  NON_EXISTENT_PET_ID: 9999,
  NON_EXISTENT_USER_ID: 9999,
} as const;
