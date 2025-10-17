import {
  PetInfoFormSchema,
  PetInfoUpdateSchema,
} from "@/components/Modal/_hooks/usePetInfoForm";
import { API_ENDPOINTS } from "@/lib/constants/endpoints";
import { PetType } from "@/lib/types/pets";

import { Response } from "./types/common";
import { customFetch } from "./customFetch";

type PetRequestData = Omit<PetType, "id">;

function petFormData(
  data: PetInfoFormSchema | PetInfoUpdateSchema,
): PetRequestData {
  return {
    name: data.name || "",
    birthYear: data.birthYear || "",
    image: "", // image upload api가 없어서 임시로 빈 문자열로 설정
    // image: data.photo ? data.photo : "", // 파일 대신 URL 문자열
    petType: "dog",
    breed: data.breed || "",
    gender: data.gender?.toUpperCase() as "MALE" | "FEMALE",
    neuter:
      data.neuter === "did" ? true : data.neuter === "didnot" ? false : null,
  };
}

export const petsApi = {
  // 반려동물 상세 조회
  getPetInfo: async (petId: number) => {
    return await customFetch.get<Response<PetType>>(
      `${API_ENDPOINTS.PET}/${petId}`,
    );
  },

  // 반려동물 정보 수정
  putPetInfo: async (petId: number, data: PetInfoUpdateSchema) => {
    const formData = petFormData(data);
    return await customFetch.put<Response<PetType>>(
      `${API_ENDPOINTS.PET}/${petId}`,
      {
        body: JSON.stringify(formData),
      },
    );
  },

  // 반려동물 정보 삭제
  deletePetInfo: async (petId: number) => {
    return await customFetch.delete<Response<string>>(
      `${API_ENDPOINTS.PET}/${petId}`,
    );
  },

  // 반려동물 등록
  postPetInfo: async (data: PetInfoFormSchema) => {
    const formData = petFormData(data);
    return await customFetch.post<Response<PetType>>(`${API_ENDPOINTS.PET}`, {
      body: JSON.stringify(formData),
    });
  },

  // 특정 유저의 반려동물 목록 조회
  getPetInfoByUserId: async (userId: number) => {
    return await customFetch.get<Response<PetType[]>>(
      `${API_ENDPOINTS.PET}/user/${userId}`,
    );
  },

  // 내 반려동물 목록 조회
  getMyPetInfo: async () => {
    return await customFetch.get<Response<PetType[]>>(
      `${API_ENDPOINTS.PET}/my`,
    );
  },

  // 타입 별 반려동물 조회(추후 확장성 고려, 현재는 "DOG"밖에 없음)
  getPetInfoByPetType: async (petType: string = "DOG") => {
    return await customFetch.get<Response<PetType[]>>(
      `${API_ENDPOINTS.PET}/type/${petType}`,
    );
  },
};
