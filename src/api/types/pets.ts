import { PetType } from "@/lib/types/pets";

import { Response } from "./common";

// 이미지 업로드 관련 타입
export interface ImageUploadReq {
  file: File;
}

export interface ImageUploadResult {
  imageUrl: string;
  originalFilename: string;
  fileSize: number;
  contentType: string;
}

export type ImageUploadRes = Response<ImageUploadResult>;

// GET /meong-road/pets/{id}
export type GetPetReq = Pick<PetType, "id">;
export type GetPetRes = Response<PetType>;

// POST /meong-road/pets
export interface PostPetReq {
  image: PetType["image"];
  name: PetType["name"];
  gender: PetType["gender"];
  birthYear: PetType["birthYear"];
  breed: PetType["breed"];
  neuter: PetType["neuter"];
  petType: PetType["petType"];
}
export type PostPetRes = Response<PetType>;

// PUT /meong-road/pets/{id}
export interface PutPetReq {
  image?: PetType["image"];
  name?: PetType["name"];
  gender?: PetType["gender"];
  birthYear?: PetType["birthYear"];
  breed?: PetType["breed"];
  neuter?: PetType["neuter"];
  petType?: PetType["petType"];
}
export type PutPetRes = Response<PetType>;

// DELETE /meong-road/pets/{id}
export type DeletePetReq = Pick<PetType, "id">;
export type DeletePetRes = Response<void>;

// GET /meong-road/pets/my
export type GetMyPetsReq = void;
export type GetMyPetsRes = Response<PetType[]>;
