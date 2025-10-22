import { customFetch } from "@/lib/api/customFetch";
import { API_ENDPOINTS } from "@/lib/constants/endpoints";
import { PetType } from "@/lib/types/pets";

import { Response } from "./types/common";
import {
  GetMyPetsRes,
  ImageUploadRes,
  PostPetReq,
  PutPetReq,
} from "./types/pets";

export const petsApi = {
  uploadPetImage: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return customFetch.post<ImageUploadRes>(
      `${API_ENDPOINTS.PET}/image/upload`,
      {
        body: formData,
      },
    );
  },

  getPetInfo: (petId: number) => {
    return customFetch.get<Response<PetType>>(`${API_ENDPOINTS.PET}/${petId}`);
  },

  putPetInfo: (petId: number, data: PutPetReq) => {
    return customFetch.put<Response<PetType>>(`${API_ENDPOINTS.PET}/${petId}`, {
      body: JSON.stringify(data),
    });
  },

  deletePetInfo: (petId: number) => {
    return customFetch.delete<Response<string>>(
      `${API_ENDPOINTS.PET}/${petId}`,
    );
  },

  postPetInfo: (data: PostPetReq) => {
    return customFetch.post<Response<PetType>>(`${API_ENDPOINTS.PET}`, {
      body: JSON.stringify(data),
    });
  },

  getPetInfoByUserId: (userId: number) => {
    return customFetch.get<Response<PetType[]>>(
      `${API_ENDPOINTS.PET}/user/${userId}`,
    );
  },

  getMyPetInfo: () => {
    return customFetch.get<GetMyPetsRes>(`${API_ENDPOINTS.PET}/my`);
  },

  getPetInfoByPetType: (petType: string = "dog") => {
    return customFetch.get<Response<PetType[]>>(
      `${API_ENDPOINTS.PET}/type/${petType}`,
    );
  },
};
