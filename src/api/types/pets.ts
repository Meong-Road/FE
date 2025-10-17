import { PetType } from "@/lib/types/pets";

import { Response } from "./common";

// GET /meong-road/pets/{id}
export type GetPetReq = Pick<PetType, "id">;
export type GetPetRes = Response<PetType>;

// POST /meong-road/pets
export interface CreatePetReq {
  image?: File | null;
  name: PetType["name"];
  gender: PetType["gender"];
  birthYear: PetType["birthYear"];
  breed: PetType["breed"];
  neuter: PetType["neuter"];
  petType: PetType["petType"];
}
export type CreatePetRes = Response<PetType>;

// PUT /meong-road/pets/{id}
export interface UpdatePetReq {
  id: PetType["id"];
  image?: File | null;
  name?: PetType["name"];
  gender?: PetType["gender"];
  birthYear?: PetType["birthYear"];
  breed?: PetType["breed"];
  neuter?: PetType["neuter"];
}
export type UpdatePetRes = Response<PetType>;

// DELETE /meong-road/pets/{id}
export type DeletePetReq = Pick<PetType, "id">;
export type DeletePetRes = Response<void>;

// GET /meong-road/pets/my
export type GetMyPetsRes = Response<PetType[]>;
