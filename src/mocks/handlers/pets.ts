import { http, HttpResponse } from "msw";

import { PetType } from "@/lib/types/pets";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Mock 반려동물 데이터
const mockPets: PetType[] = [
  {
    id: 1,
    name: "초코",
    gender: "MALE",
    birthYear: "2020",
    breed: "골든 리트리버",
    neuter: true,
    petType: "dog",
    image:
      "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "마루",
    gender: "FEMALE",
    birthYear: "2021",
    breed: "웰시코기",
    neuter: false,
    petType: "dog",
    image:
      "https://images.unsplash.com/photo-1612536849080-c65d46f8f42d?w=400&h=400&fit=crop",
  },
];

// 임시 저장소 (실제로는 메모리에만 유지됨)
const pets = [...mockPets];

export const petsHandlers = [
  // GET /meong-road/pets/my - 내 반려동물 목록 조회
  http.get(`${BASE_URL}/meong-road/pets/my`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return HttpResponse.json(
        {
          success: false,
          code: 401,
          message: "인증이 필요합니다.",
        },
        { status: 401 },
      );
    }

    return HttpResponse.json({
      success: true,
      code: 0,
      message: "내 반려동물 목록 조회 성공",
      result: pets,
    });
  }),

  // GET /meong-road/pets/{id} - 반려동물 상세 조회
  http.get(`${BASE_URL}/meong-road/pets/:id`, ({ params, request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return HttpResponse.json(
        {
          success: false,
          code: 401,
          message: "인증이 필요합니다.",
        },
        { status: 401 },
      );
    }

    const id = Number(params.id);
    const pet = pets.find((p) => p.id === id);

    if (!pet) {
      return HttpResponse.json(
        {
          success: false,
          code: 404,
          message: "반려동물을 찾을 수 없습니다.",
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      success: true,
      code: 0,
      message: "반려동물 조회 성공",
      result: pet,
    });
  }),

  // POST /meong-road/pets - 반려동물 등록
  http.post(`${BASE_URL}/meong-road/pets`, async ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return HttpResponse.json(
        {
          success: false,
          code: 401,
          message: "인증이 필요합니다.",
        },
        { status: 401 },
      );
    }

    const formData = await request.formData();
    const newId = Math.max(...pets.map((p) => p.id), 0) + 1;

    const newPet: PetType = {
      id: newId,
      name: formData.get("name") as string,
      gender: formData.get("gender") as "MALE" | "FEMALE",
      birthYear: formData.get("birthYear") as string,
      breed: formData.get("breed") as string,
      neuter: formData.get("neuter") === "true",
      petType: "dog",
      image: formData.get("image")
        ? "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop"
        : "",
    };

    pets.push(newPet);

    return HttpResponse.json({
      success: true,
      code: 0,
      message: "반려동물 등록 성공",
      result: newPet,
    });
  }),

  // PUT /meong-road/pets/{id} - 반려동물 정보 수정
  http.put(`${BASE_URL}/meong-road/pets/:id`, async ({ params, request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return HttpResponse.json(
        {
          success: false,
          code: 401,
          message: "인증이 필요합니다.",
        },
        { status: 401 },
      );
    }

    const id = Number(params.id);
    const petIndex = pets.findIndex((p) => p.id === id);

    if (petIndex === -1) {
      return HttpResponse.json(
        {
          success: false,
          code: 404,
          message: "반려동물을 찾을 수 없습니다.",
        },
        { status: 404 },
      );
    }

    const formData = await request.formData();
    const updatedPet: PetType = {
      ...pets[petIndex],
      name: (formData.get("name") as string) || pets[petIndex].name,
      gender:
        (formData.get("gender") as "MALE" | "FEMALE") || pets[petIndex].gender,
      birthYear:
        (formData.get("birthYear") as string) || pets[petIndex].birthYear,
      breed: (formData.get("breed") as string) || pets[petIndex].breed,
      neuter: formData.has("neuter")
        ? formData.get("neuter") === "true"
        : pets[petIndex].neuter,
    };

    pets[petIndex] = updatedPet;

    return HttpResponse.json({
      success: true,
      code: 0,
      message: "반려동물 정보 수정 성공",
      result: updatedPet,
    });
  }),

  // DELETE /meong-road/pets/{id} - 반려동물 삭제
  http.delete(`${BASE_URL}/meong-road/pets/:id`, ({ params, request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return HttpResponse.json(
        {
          success: false,
          code: 401,
          message: "인증이 필요합니다.",
        },
        { status: 401 },
      );
    }

    const id = Number(params.id);
    const petIndex = pets.findIndex((p) => p.id === id);

    if (petIndex === -1) {
      return HttpResponse.json(
        {
          success: false,
          code: 404,
          message: "반려동물을 찾을 수 없습니다.",
        },
        { status: 404 },
      );
    }

    pets.splice(petIndex, 1);

    return HttpResponse.json({
      success: true,
      code: 0,
      message: "반려동물 삭제 성공",
      result: null,
    });
  }),
];
