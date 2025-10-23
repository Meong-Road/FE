import { DefaultValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const UserInfoFormSchema = z
  .object({
    image: z.union([z.instanceof(File), z.string()]).nullable(),
    nickName: z
      .string()
      .trim()
      .min(1, "닉네임을 입력해주세요.")
      .max(20, "닉네임은 20자 이하로 입력해주세요."),
    nickNameCheckPassed: z.boolean(),
    isPetInfoSubmitted: z.boolean().optional(),
    initialNickName: z.string().optional(), // 초기 닉네임 추적용
  })
  .refine(
    (data) => {
      // 닉네임이 변경되지 않았으면 중복체크 불필요
      if (data.nickName === data.initialNickName) {
        return true;
      }
      // 닉네임이 변경되었으면 중복체크 필수
      return data.nickNameCheckPassed === true;
    },
    {
      message: "닉네임 중복확인이 필요합니다.",
      path: ["nickNameCheckPassed"],
    },
  );

const UserInfoUpdateSchema = UserInfoFormSchema.partial();

export type UserInfoFormSchema = z.infer<typeof UserInfoFormSchema>;
export type UserInfoUpdateSchema = z.infer<typeof UserInfoUpdateSchema>;

export function useUserInfoForm(initialValues?: Partial<UserInfoFormSchema>) {
  const defaultValues: DefaultValues<UserInfoFormSchema> = {
    image: null,
    nickName: "",
    nickNameCheckPassed: false,
    isPetInfoSubmitted: false,
    initialNickName: undefined,
  };

  return useForm<UserInfoFormSchema>({
    resolver: zodResolver(UserInfoFormSchema),
    defaultValues: initialValues
      ? { ...defaultValues, ...initialValues }
      : defaultValues,
    mode: "onChange",
  });
}
