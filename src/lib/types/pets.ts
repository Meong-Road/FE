export interface PetType {
  id: number;
  name: string;
  birthYear: string;
  image: string;
  petType: string;
  breed: string;
  gender: "MALE" | "FEMALE";
  neuter: boolean | null;
}

export interface PetResultType {
  result: string;
}

export interface PetResponse {
  success: boolean;
  code: number;
  message: string;
  result: PetType | PetType[] | PetResultType;
  errorCode: string | null;
}
