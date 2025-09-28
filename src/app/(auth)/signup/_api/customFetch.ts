export interface CustomFetchOptions extends RequestInit {
  headers?: HeadersInit & { Authorization?: string };
}

/**
 *
 * @param endpoint 요청 주소
 * @param options 요청 옵션 (headers, method, body 등)
 * @returns 응답 데이터 json 타입
 */
export async function customFetch<T>(
  endpoint: string,
  options: CustomFetchOptions = {},
): Promise<T> {
  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const headers: CustomFetchOptions["headers"] = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // 토큰 있으면 무조건 보내기
  const token = localStorage.getItem("accessToken");
  if (token) {
    (
      headers as CustomFetchOptions["headers"] & { Authorization?: string }
    ).Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `HTTP Error ${response.status}`);
  }

  return response.json() as Promise<T>;
}
