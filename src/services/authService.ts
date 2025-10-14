export const authService = {
  signout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};
