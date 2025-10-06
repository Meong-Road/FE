import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const PetInfoFormSchema = z.object({
  photo: z.instanceof(File).optional(),
  name: z.string().min(1, "이름을 입력해주세요"),
  gender: z.enum(["male", "female"]),
  neuter: z.enum(["did", "didnot"]),
  birthday: z.object({
    year: z.number(),
    month: z.number(),
    day: z.number(),
  }),
  breed: z.string(),
});

export type PetInfoFormSchema = z.infer<typeof PetInfoFormSchema>;

export function usePetInfoForm(initialValues?: Partial<PetInfoFormSchema>) {
  return useForm<PetInfoFormSchema>({
    resolver: zodResolver(PetInfoFormSchema),
    defaultValues: {
      photo: undefined,
      name: "",
      gender: "male",
      neuter: "did",
      birthday: { year: 2025, month: 1, day: 1 },
      breed: "",
    },
    ...initialValues,
    mode: "onChange",
  });
}
