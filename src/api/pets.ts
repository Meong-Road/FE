import {
  PetInfoFormSchema,
  PetInfoUpdateSchema,
} from "@/components/Modal/_hooks/usePetInfoForm";
import { API_ENDPOINTS } from "@/lib/constants/endpoints";
import { PetResponse } from "@/lib/types/pets";

const baseUrl = process.env.NEXT_PUBLIC_URL;

function petFormData(data: PetInfoFormSchema | PetInfoUpdateSchema): FormData {
  const formData = new FormData();

  if (data.photo) formData.append("image", data.photo);
  if (data.neuter === "did") formData.append("neuter", "true");
  else if (data.neuter === "didnot") formData.append("neuter", "false");
  else formData.append("neuter", "null");

  if (data.name) formData.append("name", data.name);
  if (data.gender) formData.append("gender", data.gender.toUpperCase());
  if (data.birthYear) formData.append("birthYear", data.birthYear);
  if (data.breed) formData.append("breed", data.breed);

  formData.append("petType", "dog");

  return formData;
}

async function callPetAPI(
  endpoint: string,
  method: string = "GET",
  formData?: FormData,
) {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method,
      body: formData,
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}: API 호출 실패`);

    const apiResponse: PetResponse = await response.json();

    if (!apiResponse.success)
      throw new Error(apiResponse.message || `API 호출 실패`);

    return apiResponse.result;
  } catch (error) {
    console.error(error);
  }
}

export const petsApi = {
  // 반려동물 상세 조회
  getPetInfo: async (petId: number) => {
    return callPetAPI(`${API_ENDPOINTS.PET}/${petId}`);
  },

  // 반려동물 정보 수정
  putPetInfo: async (petId: number, data: PetInfoUpdateSchema) => {
    const formData = petFormData(data);
    return callPetAPI(`${API_ENDPOINTS.PET}/${petId}`, "PUT", formData);
  },

  // 반려동물 정보 삭제
  deletePetInfo: async (petId: number) => {
    return callPetAPI(`${API_ENDPOINTS.PET}/${petId}`, "DELETE");
  },

  // 반려동물 등록
  postPetInfo: async (data: PetInfoFormSchema) => {
    const formData = petFormData(data);
    return callPetAPI(`${API_ENDPOINTS.PET}`, "POST", formData);
  },

  // 특정 유저의 반려동물 목록 조회
  getPetInfoByUserId: async (userId: number) => {
    return callPetAPI(`${API_ENDPOINTS.PET}/user/${userId}`);
  },

  // 내 반려동물 목록 조회
  getMyPetInfo: async () => {
    return callPetAPI(`${API_ENDPOINTS.PET}/my`);
  },

  // 타입 별 반려동물 조회(추후 확장성 고려, 현재는 "DOG"밖에 없음)
  getPetInfoByPetType: async (petType: string = "DOG") => {
    return callPetAPI(`${API_ENDPOINTS.PET}/type/${petType}`);
  },
};
