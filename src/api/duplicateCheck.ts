import { customFetch } from "@/api/customFetch";
import type {
  GetEmailDuplicateCheckRes,
  PostNicknameDuplicateCheckRes,
} from "@/lib/types/duplicateCheck";

export async function checkEmailDuplicate(email: string): Promise<boolean> {
  const response = await customFetch.get<GetEmailDuplicateCheckRes>(
    `/meong-road/user/exists?email=${encodeURIComponent(email)}`,
    { isPublic: true }, //얘는 Authorization 헤더 붙이면 에러남(403)
  );
  return Boolean(response?.result?.exists);
}

export async function checkNicknameDuplicate(
  nickname: string,
): Promise<boolean> {
  const response = await customFetch.post<PostNicknameDuplicateCheckRes>(
    "/meong-road/user/nickname/check",
    { body: JSON.stringify({ nickName: nickname }) },
  );
  return Boolean(response?.result);
}
