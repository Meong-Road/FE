import { customFetch } from "./customFetch";

interface PostSignupReq {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface PostSignupRes {
  message: string;
  petInfo: null;
}

export const authApi = {
  signup: async (payload: PostSignupReq): Promise<PostSignupRes> => {
    return await customFetch.post<PostSignupRes>("/auth/signup", {
      body: JSON.stringify(payload),
    });
  },
};
