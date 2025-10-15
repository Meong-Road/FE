import { renderHook } from "@testing-library/react";
import { ZodError } from "zod";

import { formSchema, useSigninForm } from "@/hooks/auth/useSigninForm";

describe("useSigninForm 테스트", () => {
  it("훅 생성", () => {
    const { result } = renderHook(() => useSigninForm());
    expect(result.current).toBeTruthy();
  });

  it("초기값 세팅", () => {
    const { result } = renderHook(() => useSigninForm());
    expect(result.current.getValues()).toEqual({ email: "", password: "" });
  });
});

describe("SigninFormSchema 테스트", () => {
  it("유효한 로그인 폼 데이터", () => {
    const validFormData = {
      email: "test@example.com",
      password: "00000000",
    };
    expect(() => formSchema.parse(validFormData)).not.toThrow();
  });

  it("유효하지 않은 이메일", () => {
    const invalidFormData = {
      email: "test",
      password: "00000000",
    };
    expect(() => formSchema.parse(invalidFormData)).toThrow(ZodError);
  });

  it("50자 초과 이메일", () => {
    const invalidFormData = {
      email: "test@test.comcomcomcomcomcomcomcomcomcomcomcomcomco",
      password: "00000000",
    };
    expect(() => formSchema.parse(invalidFormData)).toThrow(ZodError);
  });

  it("8자 미만 비밀번호", () => {
    const invalidFormData = {
      email: "test@example.com",
      password: "0000",
    };
    expect(() => formSchema.parse(invalidFormData)).toThrow(ZodError);
  });

  it("50자 초과 비밀번호", () => {
    const invalidFormData = {
      email: "test@example.com",
      password: "000000000000000000000000000000000000000000000000000",
    };
    expect(() => formSchema.parse(invalidFormData)).toThrow(ZodError);
  });
});
