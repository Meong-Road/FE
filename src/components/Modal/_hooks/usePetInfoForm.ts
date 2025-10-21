import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const PetInfoFormSchema = z.object({
  photo: z.instanceof(File).optional(),
  existingPhotoUrl: z.string().optional(),
  name: z.string().min(1, "이름을 입력해주세요"),
  gender: z.enum(["male", "female"]),
  neuter: z.enum(["did", "didnot"]).optional(),
  birthYear: z.string().min(1, "출생연도를 입력해주세요"),
  breed: z.string().min(1, "견종을 선택해주세요"),
});

const PetInfoUpdateSchema = PetInfoFormSchema.partial();

export type PetInfoFormSchema = z.infer<typeof PetInfoFormSchema>;
export type PetInfoUpdateSchema = z.infer<typeof PetInfoUpdateSchema>;

export function usePetInfoForm(initialValues?: Partial<PetInfoFormSchema>) {
  const defaultValues = {
    photo: undefined,
    existingPhotoUrl: undefined,
    name: "",
    gender: "male" as const,
    neuter: undefined,
    birthYear: "",
    breed: "",
  };

  return useForm<PetInfoFormSchema>({
    resolver: zodResolver(PetInfoFormSchema),
    defaultValues: initialValues
      ? { ...defaultValues, ...initialValues }
      : defaultValues,
    mode: "onChange",
  });
}
