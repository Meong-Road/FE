export interface CustomFetchOptions extends RequestInit {
  headers?: HeadersInit & { Authorization?: string };
}

const DEFAULT_BASE_URL = "http://localhost:3000";

export const getBaseURL = () =>
  process.env.NEXT_PUBLIC_API_URL || DEFAULT_BASE_URL;

export const buildHeaders = (
  headers: CustomFetchOptions["headers"] = {},
): CustomFetchOptions["headers"] => ({
  "Content-Type": "application/json",
  ...headers,
});

export const appendAuthorization = (
  headers: CustomFetchOptions["headers"],
): CustomFetchOptions["headers"] => {
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

export const buildRequestConfig = (
  options: CustomFetchOptions,
  headers: CustomFetchOptions["headers"],
): CustomFetchOptions => ({
  ...options,
  headers,
});

export const getRequestUrl = (endpoint: string) => `${getBaseURL()}${endpoint}`;

export const parseResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `HTTP Error ${response.status}`);
  }

  return response.json() as Promise<T>;
};

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type CustomFetchMethodOptions = Omit<CustomFetchOptions, "method">;

interface CustomFetchWithMethods {
  <T>(endpoint: string, options?: CustomFetchOptions): Promise<T>;
  get<T>(endpoint: string, options?: CustomFetchMethodOptions): Promise<T>;
  post<T>(endpoint: string, options?: CustomFetchMethodOptions): Promise<T>;
  put<T>(endpoint: string, options?: CustomFetchMethodOptions): Promise<T>;
  patch<T>(endpoint: string, options?: CustomFetchMethodOptions): Promise<T>;
  delete<T>(endpoint: string, options?: CustomFetchMethodOptions): Promise<T>;
}

const request = async <T>(
  endpoint: string,
  options: CustomFetchOptions = {},
): Promise<T> => {
  const headersWithDefaults = buildHeaders(options.headers);
  const headersWithToken = appendAuthorization(headersWithDefaults);
  const requestConfig = buildRequestConfig(options, headersWithToken);
  const response = await fetch(getRequestUrl(endpoint), requestConfig);

  return parseResponse<T>(response);
};

const createMethodRequest =
  (method: HttpMethod) =>
  <T>(endpoint: string, options: CustomFetchMethodOptions = {}) => {
    const requestOptions: CustomFetchOptions = {
      ...options,
      method,
    };

    return request<T>(endpoint, requestOptions);
  };

/**
 * 임시 customFetch입니다.
 * @param endpoint request URL
 * @param options request options (headers, method, body, etc.)
 * @returns response data as JSON
 */
export const customFetch = Object.assign(request, {
  get: createMethodRequest("GET"),
  post: createMethodRequest("POST"),
  put: createMethodRequest("PUT"),
  patch: createMethodRequest("PATCH"),
  delete: createMethodRequest("DELETE"),
}) as CustomFetchWithMethods;
