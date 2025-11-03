type StorageType = "localStorage" | "sessionStorage";

// 기본 스토리지 유틸리티
export const storageUtils = {
  setItem<T>(key: string, value: T, storageType: StorageType = "localStorage") {
    const storage =
      storageType === "localStorage" ? localStorage : sessionStorage;
    storage.setItem(key, JSON.stringify(value));
  },

  getItem<T>(key: string, storageType: StorageType = "localStorage"): T | null {
    try {
      const storage =
        storageType === "localStorage" ? localStorage : sessionStorage;
      const stored = storage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  removeItem(key: string, storageType: StorageType = "localStorage") {
    const storage =
      storageType === "localStorage" ? localStorage : sessionStorage;
    storage.removeItem(key);
  },

  clear(storageType: StorageType = "localStorage") {
    const storage =
      storageType === "localStorage" ? localStorage : sessionStorage;
    storage.clear();
  },
};

/**
 * @deprecated HttpOnly + Secure 쿠키 기반 인증으로 전환되어 더 이상 사용되지 않습니다.
 * 쿠키는 백엔드가 자동으로 관리하며, 프론트엔드에서 토큰을 직접 저장/조회할 필요가 없습니다.
 */
export const tokenStorage = {
  set() {
    console.warn(
      "tokenStorage.set() is deprecated. Tokens are now managed via HttpOnly cookies.",
    );
  },

  getAccess(): string | null {
    console.warn(
      "tokenStorage.getAccess() is deprecated. Use cookie-based authentication.",
    );
    return null;
  },

  getRefresh(): string | null {
    console.warn(
      "tokenStorage.getRefresh() is deprecated. Use cookie-based authentication.",
    );
    return null;
  },

  clear() {
    console.warn(
      "tokenStorage.clear() is deprecated. Logout should be handled via API call.",
    );
  },

  hasValidAccess(): boolean {
    console.warn(
      "tokenStorage.hasValidAccess() is deprecated. Check authentication via API.",
    );
    return false;
  },

  hasValidRefresh(): boolean {
    console.warn(
      "tokenStorage.hasValidRefresh() is deprecated. Check authentication via API.",
    );
    return false;
  },

  isTokenValid(): boolean {
    return false;
  },

  parseTokenPayload<T>(): T {
    throw new Error(
      "Deprecated: Token parsing not supported in cookie-based auth",
    );
  },
};

// 데이터 지속성 훅
