export interface PetType {
  id: number;
  name: string;
  birthYear: string;
  image: string;
  petType: string;
  breed: string;
}

export interface PetResponse {
  success: boolean;
  code: number;
  message: string;
  result: PetType[];
  errorCode: string;
}
