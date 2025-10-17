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

export interface PetResponse {
  success: boolean;
  code: number;
  message: string;
  result: PetType;
  errorCode: string | null;
}
