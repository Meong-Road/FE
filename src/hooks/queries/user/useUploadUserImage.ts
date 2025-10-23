import { useMutation } from "@tanstack/react-query";

import { PutUserImageReq, PutUserImageRes } from "@/api/types/user";
import { userApi } from "@/api/user";

export function useUploadUserImage() {
  return useMutation<PutUserImageRes, Error, PutUserImageReq>({
    mutationFn: (data: PutUserImageReq) => userApi.uploadUserImage(data),
  });
}
