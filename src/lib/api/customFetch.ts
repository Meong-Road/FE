// Custom Fetch API - 통합 HTTP 클라이언트

import { BASE_URL, PREFIX } from "@/lib/constants/endpoints";
import { tokenStorage } from "@/lib/utils/token";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface CustomFetchOptions extends RequestInit {
  skipAuth?: boolean;
}

// API 전용 에러 클래스
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// 공통 fetch 요청 함수
async function request<T>(
  endpoint: string,
  options: CustomFetchOptions = {},
): Promise<T> {
  const { skipAuth, headers, ...rest } = options;

  // 1. URL 생성
  const url = `${BASE_URL}${PREFIX}${endpoint}`;

  // 2. 헤더 설정
  const token =
    !skipAuth && typeof window !== "undefined"
      ? tokenStorage.getAccess()
      : null;

  const finalHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  // 3. 요청 실행
  const response = await fetch(url, {
    ...rest,
    headers: finalHeaders,
  });

  // 4. 응답 처리 or 에러 Throw
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      error.message || `HTTP Error ${response.status}`,
    );
  }

  return response.json();
}

// HTTP 메서드별 헬퍼
const createMethod =
  (method: HttpMethod) =>
  <T>(endpoint: string, options?: Omit<CustomFetchOptions, "method">) =>
    request<T>(endpoint, { ...options, method });

/**
 * 커스텀 fetch 클라이언트
 *
 * @example
 * await customFetch.get<User>('/user/my');
 * await customFetch.post('/login', { body: JSON.stringify(data), skipAuth: true });
 */
export const customFetch = Object.assign(request, {
  get: createMethod("GET"),
  post: createMethod("POST"),
  put: createMethod("PUT"),
  patch: createMethod("PATCH"),
  delete: createMethod("DELETE"),
});
