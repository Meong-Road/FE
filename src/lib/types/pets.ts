export interface PetType {
  id: number;
  name: string;
  birthYear: string;
  image: string | File | null;
  petType: "dog";
  breed: string;
  gender: "MALE" | "FEMALE";
  neuter: boolean;
}
