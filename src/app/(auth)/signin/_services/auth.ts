interface LoginReq {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  nickName: string;
  image: string;
  isPetInfoSubmitted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface LoginRes {
  token: string;
  user: User;
}

interface CommonResponseLoginRes {
  success: boolean;
  code: number;
  message: string;
  result: LoginRes; // !!!
  errorCode: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const authService = {
  async login(payload: LoginReq): Promise<LoginRes> {
    const res = await fetch(`${BASE_URL}/meong-road/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // 실제 에러들 반영하기
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "로그인 실패");
    }

    const data: CommonResponseLoginRes = await res.json();
    return data.result;
  },

  logout() {
    console.log("로그아웃");
  },
};
