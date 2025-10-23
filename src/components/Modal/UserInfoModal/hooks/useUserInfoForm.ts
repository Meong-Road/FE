import { DefaultValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const UserInfoFormSchema = z.object({
  image: z.union([z.instanceof(File), z.string()]).nullable(),
  nickName: z
    .string()
    .trim()
    .min(1, "닉네임을 입력해주세요.")
    .max(20, "닉네임은 20자 이하로 입력해주세요."),
  nickNameCheckPassed: z.boolean().refine((val) => val === true, {
    message: "이미 사용중인 닉네임입니다.",
  }),
  isPetInfoSubmitted: z.boolean().optional(),
});

const UserInfoUpdateSchema = UserInfoFormSchema.partial();

export type UserInfoFormSchema = z.infer<typeof UserInfoFormSchema>;
export type UserInfoUpdateSchema = z.infer<typeof UserInfoUpdateSchema>;

export function useUserInfoForm(initialValues?: Partial<UserInfoFormSchema>) {
  const defaultValues: DefaultValues<UserInfoFormSchema> = {
    image: null,
    nickName: "",
    nickNameCheckPassed: false,
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
