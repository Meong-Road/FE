import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const PetInfoFormSchema = z.object({
  photo: z.instanceof(File).optional(),
  name: z.string().min(1, "이름을 입력해주세요"),
  gender: z.enum(["male", "female"]),
  neuter: z.enum(["did", "didnot"]).optional(),
  birthday: z
    .object({
      year: z.number(),
      month: z.number(),
      day: z.number(),
    })
    .refine((data) => data.year > 0 && data.month > 0 && data.day > 0, {
      message: "정확한 생일을 선택해주세요",
    }),
  breed: z.string().min(1, "견종을 선택해주세요"),
});

export type PetInfoFormSchema = z.infer<typeof PetInfoFormSchema>;

export function usePetInfoForm(initialValues?: Partial<PetInfoFormSchema>) {
  const defaultValues = {
    photo: undefined,
    name: "",
    gender: "male" as const,
    neuter: "did" as const,
    birthday: { year: 0, month: 0, day: 0 },
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
