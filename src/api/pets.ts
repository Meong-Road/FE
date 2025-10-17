import {
  PetInfoFormSchema,
  PetInfoUpdateSchema,
} from "@/components/Modal/_hooks/usePetInfoForm";
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

// 반려동물 상세 조회
export async function getPetInfo(petId: number) {
  return callPetAPI(`/pets/${petId}`);
}

// 반려동물 정보 수정
export async function putPetInfo(petId: number, data: PetInfoUpdateSchema) {
  const formData = petFormData(data);
  return callPetAPI(`/pets/${petId}`, "PUT", formData);
}

// 반려동물 정보 삭제
export async function deletePetInfo(petId: number) {
  return callPetAPI(`pets/${petId}`, "DELETE");
}

// 반려동물 등록
export async function postPetInfo(data: PetInfoFormSchema) {
  const formData = petFormData(data);
  return callPetAPI(`/pets`, "POST", formData);
}

// 특정 유저의 반려동물 목록 조회
export async function getPetInfoByUserId(userId: number) {
  return callPetAPI(`/pets/user/${userId}`);
}

// 타입 별 반려동물 조회
export async function getPetInfoByPetType(petType: string = "DOG") {
  return callPetAPI(`/pets/type/${petType}`);
}

// 내 반려동물 목록 조회
export async function getMyPetInfo() {
  return callPetAPI(`/pets/my`);
}
