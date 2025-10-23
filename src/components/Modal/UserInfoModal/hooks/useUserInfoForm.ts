import { DefaultValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const UserInfoFormSchema = z.object({
  image: z.union([z.instanceof(File), z.string()]).nullable(),
  name: z
    .string()
    .trim()
    .min(1, "이름을 입력해주세요.")
    .max(20, "이름은 20자 이하로 입력해 주세요."),
  nickName: z
    .string()
    .trim()
    .min(1, "닉네임을 입력해주세요.")
    .max(20, "닉네임은 20자 이하로 입력해 주세요."),
  isPetInfoSubmitted: z.boolean().optional(),
});

const UserInfoUpdateSchema = UserInfoFormSchema.partial();

export type UserInfoFormSchema = z.infer<typeof UserInfoFormSchema>;
export type UserInfoUpdateSchema = z.infer<typeof UserInfoUpdateSchema>;

export function useUserInfoForm(initialValues?: Partial<UserInfoFormSchema>) {
  const defaultValues: DefaultValues<UserInfoFormSchema> = {
    image: null,
    name: "",
    nickName: "",
    isPetInfoSubmitted: false,
  };

  return useForm<UserInfoFormSchema>({
    resolver: zodResolver(UserInfoFormSchema),
    defaultValues: initialValues
      ? { ...defaultValues, ...initialValues }
      : defaultValues,
    mode: "onChange",
  });
}
