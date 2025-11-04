import { DefaultValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const UserInfoFormSchema = z
  .object({
    image: z.union([z.instanceof(File), z.string()]).nullable(),
    nickName: z
      .string()
      .trim()
      .min(2, "닉네임을 2자 이상 입력해주세요.")
      .max(18, "닉네임은 18자 이하로 입력해주세요.")
      .regex(
        /^[가-힣a-zA-Z0-9_]+$/,
        "초성, 특수문자, 공백은 사용할 수 없습니다.",
      ),
    nickNameCheckPassed: z.boolean(),
    isPetInfoSubmitted: z.boolean().optional(),
    initialNickName: z.string().optional(), // 초기 닉네임 추적용
  })
  .refine(
    (data) => {
      // 닉네임이 초기값과 같으면 중복체크 불필요
      if (data.nickName === data.initialNickName) return true;
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
    defaultValues: { ...defaultValues, ...initialValues },
    mode: "onChange",
  });
}
