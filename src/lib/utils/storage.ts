type StorageType = "localStorage" | "sessionStorage";

interface TokenPayload {
  exp: number;
  [key: string]: unknown;
}

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

// 토큰 전용 스토리지
export const tokenStorage = {
  set(accessToken?: string | null, refreshToken?: string | null) {
    if (accessToken) storageUtils.setItem("accessToken", accessToken);
    if (refreshToken) storageUtils.setItem("refreshToken", refreshToken);
  },

  getAccess(): string | null {
    return storageUtils.getItem<string>("accessToken");
  },

  getRefresh(): string | null {
    return storageUtils.getItem<string>("refreshToken");
  },

  clear() {
    storageUtils.removeItem("accessToken");
    storageUtils.removeItem("refreshToken");
  },

  hasValidAccess(): boolean {
    return this.isTokenValid("accessToken");
  },

  hasValidRefresh(): boolean {
    return this.isTokenValid("refreshToken");
  },

  isTokenValid(tokenKey: string): boolean {
    const token = storageUtils.getItem<string>(tokenKey);
    if (!token) return false;

    try {
      const payload = this.parseTokenPayload<TokenPayload>(token);
      return Date.now() < payload.exp * 1000;
    } catch {
      return false;
    }
  },

  parseTokenPayload<T>(token: string) {
    return JSON.parse(atob(token.split(".")[1])) as T;
  },
};

// 데이터 지속성 훅
