// src/lib/utils/token.ts

/**
 * 토큰 저장소
 * @description 토큰을 저장하고 가져오는 함수
 * @returns {Object} 토큰 저장소 객체
 * @property {Function} set - 토큰 설정 함수
 * @property {Function} getAccess - 액세스 토큰 가져오기 함수
 * @property {Function} getRefresh - 리프레시 토큰 가져오기 함수
 * @property {Function} clear - 토큰 제거 함수
 * @example
 * tokenStorage.set("accessToken", "refreshToken");
 * tokenStorage.getAccess();
 * tokenStorage.getRefresh();
 * tokenStorage.clear();
 */
export const tokenStorage = {
  set: (access?: string | null, refresh?: string | null) => {
    if (access) localStorage.setItem("accessToken", access);
    if (refresh) localStorage.setItem("refreshToken", refresh);
  },

  getAccess: () => localStorage.getItem("accessToken"),
  getRefresh: () => localStorage.getItem("refreshToken"),

  clear: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};
