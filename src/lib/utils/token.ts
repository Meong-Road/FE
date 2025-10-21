// src/lib/auth/tokenStorage.ts

/**
 * 개발/배포 공통 localStorage 기반 토큰 관리 유틸
 * (추후 백엔드 쿠키 인증 전환 시 삭제 예정)
 */

/**
 * @description 토큰 저장 및 조회
 * @param accessToken - 접근 토큰
 * @param refreshToken - 리프레시 토큰
 * @returns void
 * @example
 * tokenStorage.set("accessToken", "refreshToken");
 * tokenStorage.getAccess();
 * tokenStorage.getRefresh();
 * tokenStorage.clear();
 * tokenStorage.hasValidAccess();
 * tokenStorage.hasValidRefresh();
 */
export const tokenStorage = {
  set(accessToken?: string | null, refreshToken?: string | null) {
    if (accessToken) localStorage.setItem("accessToken", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
  },

  getAccess(): string | null {
    return localStorage.getItem("accessToken");
  },

  getRefresh(): string | null {
    return localStorage.getItem("refreshToken");
  },

  clear() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  hasValidAccess(): boolean {
    const token = tokenStorage.getAccess();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return Date.now() < payload.exp * 1000;
    } catch {
      return false;
    }
  },

  hasValidRefresh(): boolean {
    const token = tokenStorage.getRefresh();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return Date.now() < payload.exp * 1000;
    } catch {
      return false;
    }
  },
};
