import { customFetch } from "./customFetch";

interface PostSignupType {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface PostSignupResponse {
  message: string;
  petInfo: null;
}

export const authApi = {
  signup: async (payload: PostSignupType): Promise<PostSignupResponse> => {
    return await customFetch.post<PostSignupResponse>("/auth/signup", {
      body: JSON.stringify(payload),
    });
  },
};
