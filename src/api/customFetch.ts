// ========================================================================================
// Types
// ========================================================================================

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface CustomFetchOptions extends RequestInit {
  headers?: HeadersInit & { Authorization?: string };
  /** 로그인 필요 없는 공개 API면 true로 설정 */
  isPublic?: boolean;
}

type CustomFetchMethodOptions = Omit<CustomFetchOptions, "method">;

interface CustomFetchWithMethods {
  <T>(endpoint: string, options?: CustomFetchOptions): Promise<T>;
  get<T>(endpoint: string, options?: CustomFetchMethodOptions): Promise<T>;
  post<T>(endpoint: string, options?: CustomFetchMethodOptions): Promise<T>;
  put<T>(endpoint: string, options?: CustomFetchMethodOptions): Promise<T>;
  patch<T>(endpoint: string, options?: CustomFetchMethodOptions): Promise<T>;
  delete<T>(endpoint: string, options?: CustomFetchMethodOptions): Promise<T>;
}

const DEFAULT_BASE_URL = "http://localhost:3000";

//환경변수에서 API Base URL 가져오기
const getBaseURL = (): string => {
  return process.env.NEXT_PUBLIC_API_URL || DEFAULT_BASE_URL;
};

//요청 URL 생성
const getRequestUrl = (endpoint: string): string => {
  return `${getBaseURL()}${endpoint}`;
};

//기본 헤더 생성
const buildHeaders = (
  headers: CustomFetchOptions["headers"] = {},
): CustomFetchOptions["headers"] => {
  return {
    "Content-Type": "application/json",
    ...headers,
  };
};

//localStorage에서 토큰을 가져와 Authorization 헤더에 추가
const appendAuthorization = (
  headers: CustomFetchOptions["headers"],
): CustomFetchOptions["headers"] => {
  // 서버 사이드 렌더링 시 localStorage 접근 불가
  const token =
    typeof window === "undefined" ? null : localStorage.getItem("accessToken");

  if (!token) {
    return headers;
  }

  return {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
};

//응답 파싱 및 에러 처리
const parseResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `HTTP Error ${response.status}`);
  }

  return response.json() as Promise<T>;
};

//공통 fetch 요청 함수
const request = async <T>(
  endpoint: string,
  options: CustomFetchOptions = {},
): Promise<T> => {
  // 1. 기본 헤더 설정
  const headersWithDefaults = buildHeaders(options.headers);

  // 2. 인증이 필요한 경우 Authorization 헤더 추가
  const headersFinal = options.isPublic
    ? headersWithDefaults
    : appendAuthorization(headersWithDefaults);

  // 3. fetch 요청 실행
  const requestConfig: CustomFetchOptions = {
    ...options,
    headers: headersFinal,
  };

  const response = await fetch(getRequestUrl(endpoint), requestConfig);

  // 4. 응답 파싱
  return parseResponse<T>(response);
};

//HTTP 메서드별 요청 함수 생성
const createMethodRequest =
  (method: HttpMethod) =>
  <T>(endpoint: string, options: CustomFetchMethodOptions = {}): Promise<T> => {
    return request<T>(endpoint, { ...options, method });
  };

/**
 * [임시] 공통 fetch wrapper
 *
 * @example
 * // 기본 사용
 * const data = await customFetch.get<User>('/api/user');
 *
 * // 인증이 필요 없는 공개 API
 * const data = await customFetch.post<Data>('/api/public', {
 *   body: JSON.stringify(payload),
 *   isPublic: true
 * });
 */
export const customFetch = Object.assign(request, {
  get: createMethodRequest("GET"),
  post: createMethodRequest("POST"),
  put: createMethodRequest("PUT"),
  patch: createMethodRequest("PATCH"),
  delete: createMethodRequest("DELETE"),
}) as CustomFetchWithMethods;
