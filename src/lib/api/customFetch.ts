// Custom Fetch API - 통합 HTTP 클라이언트
// HttpOnly + Secure 쿠키 기반 인증

import { BASE_URL, PREFIX } from "@/lib/constants/endpoints";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface CustomFetchOptions extends RequestInit {
  skipAuth?: boolean; // 현재는 사용하지 않지만 API 호환성을 위해 유지
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

/**
 * 토큰 갱신 중복 방지를 위한 전역 플래그
 * - 동시에 여러 요청에서 401 발생 시 refresh를 한 번만 수행
 */
let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

/**
 * 리프레시 토큰으로 액세스 토큰 갱신
 * - HttpOnly 쿠키 기반 (자동으로 쿠키 포함/저장)
 * - 실패 시 ApiError throw
 */
async function refreshToken(): Promise<void> {
  const response = await fetch(`${BASE_URL}${PREFIX}/auth/refresh`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(response.status, error.message || "토큰 갱신 실패");
  }

  await response.json(); // 새 토큰은 쿠키에 자동 저장
}

// 공통 fetch 요청 함수
async function request<T>(
  endpoint: string,
  options: CustomFetchOptions = {},
): Promise<T> {
  const { headers, ...rest } = options;

  // 1. URL 생성
  const url = `${BASE_URL}${PREFIX}${endpoint}`;

  // 2. 헤더 설정
  const finalHeaders: HeadersInit = new Headers(headers);

  // FormData가 아닌 경우에만 Content-Type을 application/json으로 설정
  if (!(rest.body instanceof FormData)) {
    finalHeaders.set("Content-Type", "application/json");
  }

  // 3. 요청 실행
  // credentials: 'include'를 통해 쿠키를 자동으로 포함
  try {
    const response = await fetch(url, {
      ...rest,
      headers: finalHeaders,
      credentials: "include", // HttpOnly 쿠키를 요청에 포함
    });

    // 4. 응답 처리 or 에러 Throw
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));

      // 4-1. 401 에러 시 자동 토큰 갱신 시도 (refresh API 자체는 제외)
      if (response.status === 401 && !endpoint.includes("/auth/refresh")) {
        // 중복 갱신 방지: 이미 갱신 중이면 기존 Promise 재사용
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = refreshToken().finally(() => {
            isRefreshing = false;
            refreshPromise = null;
          });
        }

        try {
          await refreshPromise; // 갱신 완료 대기
          return request<T>(endpoint, options); // 갱신 성공 → 원래 요청 재시도
        } catch (refreshError) {
          throw refreshError; // 갱신 실패 → 에러 전파 (queryFn에서 처리)
        }
      }

      // 4-2. 다른 에러는 즉시 전파
      throw new ApiError(
        response.status,
        error.message || `HTTP Error ${response.status}`,
      );
    }

    return response.json();
  } catch (error) {
    // ApiError는 이미 로깅되었거나 상위에서 처리할 것이므로 여기서는 그냥 throw
    throw error;
  }
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
