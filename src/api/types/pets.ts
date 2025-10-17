import { Response } from "./common";

export interface PetType {
  id: number;
  name: string;
  birthYear: string;
  image: string;
  petType: "dog";
  breed: string;
  gender: "MALE" | "FEMALE";
  neuter: boolean | null;
}

// GET /meong-road/pets/{id}
export interface GetPetReq {
  id: number;
}
export type GetPetRes = Response<PetType>;

// POST /meong-road/pets
export interface CreatePetReq {
  image?: File | null;
  name: string;
  gender: "MALE" | "FEMALE";
  birthYear: string;
  breed: string;
  neuter: boolean | null;
  petType: "dog";
}
export type CreatePetRes = Response<PetType>;

// PUT /meong-road/pets/{id}
export interface UpdatePetReq {
  id: number;
  image?: File | null;
  name?: string;
  gender?: "MALE" | "FEMALE";
  birthYear?: string;
  breed?: string;
  neuter?: boolean | null;
}
export type UpdatePetRes = Response<PetType>;

// DELETE /meong-road/pets/{id}
export interface DeletePetReq {
  id: number;
}
export type DeletePetRes = Response<void>;

// GET /meong-road/pets/my
export type GetMyPetsRes = Response<PetType[]>;
