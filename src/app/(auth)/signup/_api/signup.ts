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
    const response = await customFetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return response as PostSignupResponse;
  },
};
