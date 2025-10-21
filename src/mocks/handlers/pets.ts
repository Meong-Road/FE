// src/mocks/handlers/pets.ts
import { http, HttpResponse } from "msw";

import { FULL_API_ENDPOINTS } from "@/lib/constants/endpoints";
import { PetType } from "@/lib/types/pets";

import { mockMyPets, mockPets, mockPetsByUserId } from "../data/pets";

export const petsHandlers = [
  // ========== 구체적인 경로들 (먼저 배치) ==========

  // 내 반려동물 목록 조회
  http.get(`${FULL_API_ENDPOINTS.PET}/my`, () => {
    return HttpResponse.json({
      success: true,
      code: 0,
      message: "내 반려동물 목록 조회 성공",
      result: mockMyPets,
      errorCode: null,
    });
  }),

  // 특정 유저의 반려동물 목록 조회
  http.get(`${FULL_API_ENDPOINTS.PET}/user/:userId`, ({ params }) => {
    const userId = Number(params.userId);
    const userPets = mockPetsByUserId[userId] || [];

    return HttpResponse.json({
      success: true,
      code: 0,
      message: "유저 반려동물 목록 조회 성공",
      result: userPets,
      errorCode: null,
    });
  }),

  // 타입별 반려동물 조회
  http.get(`${FULL_API_ENDPOINTS.PET}/type/:petType`, ({ params }) => {
    const petType = params.petType as string;
    const filteredPets = mockPets.filter(
      (pet) => pet.petType.toLowerCase() === petType.toLowerCase(),
    );

    return HttpResponse.json({
      success: true,
      code: 0,
      message: `${petType} 타입 반려동물 조회 성공`,
      result: filteredPets,
      errorCode: null,
    });
  }),

  // ========== 일반적인 경로들 (나중에 배치) ==========

  // 반려동물 등록
  http.post(`${FULL_API_ENDPOINTS.PET}`, async ({ request }) => {
    const body = (await request.json()) as Omit<PetType, "id">;

    // 새로운 반려동물 생성
    const newPet: PetType = {
      id: mockPets.length + 1,
      ...body,
    };

    mockPets.push(newPet);

    return HttpResponse.json({
      success: true,
      code: 0,
      message: "반려동물 등록 성공",
      result: newPet,
      errorCode: null,
    });
  }),

  // 반려동물 상세 조회
  http.get(`${FULL_API_ENDPOINTS.PET}/:petId`, ({ params }) => {
    const petId = Number(params.petId);
    const pet = mockPets.find((p) => p.id === petId);

    if (!pet) {
      return HttpResponse.json(
        {
          success: false,
          code: 404,
          message: "반려동물을 찾을 수 없습니다.",
          errorCode: "PET_NOT_FOUND",
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      success: true,
      code: 0,
      message: "반려동물 조회 성공",
      result: pet,
      errorCode: null,
    });
  }),

  // 반려동물 정보 수정
  http.put(`${FULL_API_ENDPOINTS.PET}/:petId`, async ({ params, request }) => {
    const petId = Number(params.petId);
    const body = (await request.json()) as Omit<PetType, "id">;

    const petIndex = mockPets.findIndex((p) => p.id === petId);

    if (petIndex === -1) {
      return HttpResponse.json(
        {
          success: false,
          code: 404,
          message: "반려동물을 찾을 수 없습니다.",
          errorCode: "PET_NOT_FOUND",
        },
        { status: 404 },
      );
    }

    // 실패 케이스: 잘못된 데이터
    if (body.name && body.name.length < 1) {
      return HttpResponse.json(
        {
          success: false,
          code: 400,
          message: "이름은 1자 이상이어야 합니다.",
          errorCode: "INVALID_NAME",
        },
        { status: 400 },
      );
    }

    // 반려동물 정보 업데이트
    const updatedPet: PetType = {
      id: petId,
      ...body,
    };

    mockPets[petIndex] = updatedPet;

    return HttpResponse.json({
      success: true,
      code: 0,
      message: "반려동물 정보 수정 성공",
      result: updatedPet,
      errorCode: null,
    });
  }),

  // 반려동물 정보 삭제
  http.delete(`${FULL_API_ENDPOINTS.PET}/:petId`, ({ params }) => {
    const petId = Number(params.petId);
    const petIndex = mockPets.findIndex((p) => p.id === petId);

    if (petIndex === -1) {
      return HttpResponse.json(
        {
          success: false,
          code: 404,
          message: "반려동물을 찾을 수 없습니다.",
          errorCode: "PET_NOT_FOUND",
        },
        { status: 404 },
      );
    }

    // 반려동물 삭제
    mockPets.splice(petIndex, 1);

    return HttpResponse.json({
      success: true,
      code: 0,
      message: "반려동물 삭제 성공",
      result: "삭제되었습니다.",
      errorCode: null,
    });
  }),
];
