import {
  PetInfoFormSchema,
  PetInfoUpdateSchema,
} from "@/components/Modal/_hooks/usePetInfoForm";
import { API_ENDPOINTS } from "@/lib/constants/endpoints";

import {
  CreatePetRes,
  DeletePetReq,
  DeletePetRes,
  GetMyPetsRes,
  GetPetReq,
  GetPetRes,
  UpdatePetRes,
} from "./types/pets";
import { customFetch } from "./customFetch";

// FormData 생성 헬퍼 함수 - 폼 스키마에서 FormData로 변환
function createPetFormData(
  data: PetInfoFormSchema | PetInfoUpdateSchema,
): FormData {
  const formData = new FormData();

  if (data.photo) formData.append("image", data.photo);
  if (data.name) formData.append("name", data.name);
  if (data.gender) formData.append("gender", data.gender.toUpperCase());
  if (data.birthYear) formData.append("birthYear", data.birthYear);
  if (data.breed) formData.append("breed", data.breed);

  if (data.neuter) {
    if (data.neuter === "did") {
      formData.append("neuter", "true");
    } else if (data.neuter === "didnot") {
      formData.append("neuter", "false");
    } else {
      formData.append("neuter", "null");
    }
  }

  formData.append("petType", "dog");

  return formData;
}

export const petsApi = {
  // GET /meong-road/pets/{id} - 반려동물 상세 조회
  getPetInfo: async ({ id }: GetPetReq): Promise<GetPetRes> => {
    return await customFetch.get(`${API_ENDPOINTS.PET}/${id}`);
  },

  // POST /meong-road/pets - 반려동물 등록
  postPetInfo: async (data: PetInfoFormSchema): Promise<CreatePetRes> => {
    const formData = createPetFormData(data);
    return await customFetch.post(`${API_ENDPOINTS.PET}`, {
      body: formData,
      headers: {},
    });
  },

  // PUT /meong-road/pets/{id} - 반려동물 정보 수정
  putPetInfo: async (
    id: number,
    data: PetInfoUpdateSchema,
  ): Promise<UpdatePetRes> => {
    const formData = createPetFormData(data);
    return await customFetch.put(`${API_ENDPOINTS.PET}/${id}`, {
      body: formData,
      headers: {},
    });
  },

  // DELETE /meong-road/pets/{id} - 반려동물 삭제
  deletePetInfo: async ({ id }: DeletePetReq): Promise<DeletePetRes> => {
    return await customFetch.delete(`${API_ENDPOINTS.PET}/${id}`);
  },

  // GET /meong-road/pets/my - 내 반려동물 목록 조회
  getMyPetInfo: async (): Promise<GetMyPetsRes> => {
    return await customFetch.get(`${API_ENDPOINTS.PET}/my`);
  },
};
