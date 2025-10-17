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

export interface PetResponse<T = PetType | PetType[] | string> {
  success: boolean;
  code: number;
  message: string;
  result: T;
  errorCode: string | null;
}
