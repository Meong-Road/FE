import { DefaultValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const PetInfoFormSchema = z.object({
  image: z.union([z.instanceof(File), z.string()]).nullable(),
  name: z
    .string()
    .trim()
    .min(1, "반려동물 이름을 입력해주세요.")
    .max(50, "이름은 50자 이하로 입력해 주세요."),
  gender: z.enum(["MALE", "FEMALE"]),
  neuter: z.enum(["true", "false"]), // optional로 변경
  birthYear: z
    .string()
    .trim()
    .min(4, "출생 연도를 선택해주세요.")
    .max(4, "출생 연도는 4자리여야 해요."),
  breed: z
    .string()
    .trim()
    .min(1, "견종을 선택해주세요.")
    .max(50, "견종은 50자 이하로 입력해 주세요."),
  petType: z.literal("dog"),
});

const PetInfoUpdateSchema = PetInfoFormSchema.partial();

export type PetInfoFormSchema = z.infer<typeof PetInfoFormSchema>;
export type PetInfoUpdateSchema = z.infer<typeof PetInfoUpdateSchema>;

export function usePetInfoForm(initialValues?: Partial<PetInfoFormSchema>) {
  const defaultValues: DefaultValues<PetInfoFormSchema> = {
    image: null,
    name: "",
    gender: undefined,
    neuter: undefined,
    birthYear: "",
    breed: "",
    petType: "dog",
  };

  return useForm<PetInfoFormSchema>({
    resolver: zodResolver(PetInfoFormSchema),
    defaultValues: initialValues
      ? { ...defaultValues, ...initialValues }
      : defaultValues,
    mode: "onChange",
  });
}
