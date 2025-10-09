import { server } from "@/mocks/server";

import { authService } from "./auth";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("로그인 테스트", () => {
  // it("500 서버 오류 테스트", async () => {
  //   await expect(
  //     authService.login({
  //       email: "error@example.com",
  //       password: "00000000",
  //     }),
  //   ).rejects.toThrow("서버 오류가 발생했습니다");
  // });

  // it("404 존재하지 않는 아이디 테스트", async () => {
  //   await expect(
  //     authService.login({
  //       email: "anonymous@example.com",
  //       password: "00000000",
  //     }),
  //   ).rejects.toThrow("존재하지 않는 아이디입니다");
  // });

  it("401 이메일 실패", async () => {
    await expect(
      authService.login({
        email: "wrong@test.com",
        password: "00000000",
      }),
    ).rejects.toThrow("이메일 또는 비밀번호가 일치하지 않습니다.");
  });

  it("401 비밀번호 실패", async () => {
    await expect(
      authService.login({
        email: "test@example.com",
        password: "wrongpassword",
      }),
    ).rejects.toThrow("이메일 또는 비밀번호가 일치하지 않습니다.");
  });

  it("200 로그인 성공", async () => {
    const result = await authService.login({
      email: "test@example.com",
      password: "12345678",
    });

    expect(result.user.email).toBe("test@example.com");
    expect(result.user.isPetInfoSubmitted).toBe(false);
  });
});
