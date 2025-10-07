import { customFetch } from "./customFetch";

interface PostSignupReq {
  name: string;
  email: string;
  password: string;
}

interface UserType {
  id: number;
  email: string;
  name: string;
  nickName: string;
  image: string;
  isPetInfoSubmitted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PostSignupRes {
  success: boolean;
  code: number;
  message: string;
  result: {
    token: string;
    user: UserType;
    message: string;
  };
}

export const authApi = {
  signup: async (payload: PostSignupReq): Promise<PostSignupRes> => {
    return await customFetch.post<PostSignupRes>("/meong-road/user", {
      body: JSON.stringify(payload),
    });
  },
};
