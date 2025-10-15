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

    try {
      formSchema.parse(invalidFormData);
    } catch (error) {
      const zodError = error as ZodError;
      expect(zodError.issues[0].message).toEqual(
        "유효한 이메일을 입력해주세요",
      );
    }
  });

  it("50자 초과 이메일", () => {
    const invalidFormData = {
      email: "test@test.comcomcomcomcomcomcomcomcomcomcomcomcomco", // 51자 with email 형식
      password: "00000000",
    };
    expect(() => formSchema.parse(invalidFormData)).toThrow(ZodError);

    try {
      formSchema.parse(invalidFormData);
    } catch (error) {
      const zodError = error as ZodError;
      expect(zodError.issues[0].message).toEqual(
        "이메일은 50자 이하여야 합니다",
      );
    }
  });

  it("8자 미만 비밀번호", () => {
    const invalidFormData = {
      email: "test@example.com",
      password: "0000",
    };
    expect(() => formSchema.parse(invalidFormData)).toThrow(ZodError);

    try {
      formSchema.parse(invalidFormData);
    } catch (error) {
      const zodError = error as ZodError;
      expect(zodError.issues[0].message).toEqual(
        "비밀번호는 8자 이상이어야 합니다",
      );
    }
  });

  it("50자 초과 비밀번호", () => {
    const invalidFormData = {
      email: "test@example.com",
      password: "000000000000000000000000000000000000000000000000000", // 51자
    };
    expect(() => formSchema.parse(invalidFormData)).toThrow(ZodError);

    try {
      formSchema.parse(invalidFormData);
    } catch (error) {
      const zodError = error as ZodError;
      expect(zodError.issues[0].message).toEqual(
        "비밀번호는 50자 이하여야 합니다",
      );
    }
  });
});
