import { act, renderHook, waitFor } from "@testing-library/react";
import { ZodError } from "zod";

import { signinFormSchema, useSigninForm } from "@/hooks/auth/useSigninForm";

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
    expect(() => signinFormSchema.parse(validFormData)).not.toThrow();

    const result = signinFormSchema.parse(validFormData);
    expect(result.email).toEqual("test@example.com");
    expect(result.password).toEqual("00000000");
  });

  it("유효하지 않은 이메일", () => {
    const invalidFormData = {
      email: "test",
      password: "00000000",
    };
    expect(() => signinFormSchema.parse(invalidFormData)).toThrow(ZodError);

    try {
      signinFormSchema.parse(invalidFormData);
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
    expect(() => signinFormSchema.parse(invalidFormData)).toThrow(ZodError);

    try {
      signinFormSchema.parse(invalidFormData);
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
    expect(() => signinFormSchema.parse(invalidFormData)).toThrow(ZodError);

    try {
      signinFormSchema.parse(invalidFormData);
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
    expect(() => signinFormSchema.parse(invalidFormData)).toThrow(ZodError);

    try {
      signinFormSchema.parse(invalidFormData);
    } catch (error) {
      const zodError = error as ZodError;
      expect(zodError.issues[0].message).toEqual(
        "비밀번호는 50자 이하여야 합니다",
      );
    }
  });
});

describe("zodResolver 연동 테스트", () => {
  it("유효한 로그인 폼 데이터로 로그인 가능", async () => {
    const { result } = renderHook(() => useSigninForm());

    await act(async () => {
      result.current.setValue("email", "test@example.com", {
        shouldValidate: true,
      });
      result.current.setValue("password", "00000000", {
        shouldValidate: true,
      });
    });

    let isValid = false;
    await act(async () => {
      isValid = await result.current.trigger("email");
    });

    expect(isValid).toBe(true);

    await waitFor(() => {
      const emailError = result.current.getFieldState("email").error;
      const passwordError = result.current.getFieldState("password").error;

      expect(emailError).toBeUndefined();
      expect(passwordError).toBeUndefined();
    });
  });

  it("유효하지 않은 이메일로 에러", async () => {
    const { result } = renderHook(() => useSigninForm());

    await act(async () => {
      result.current.setValue("email", "test", {
        shouldValidate: true,
      });
    });

    let isValid = false;
    await act(async () => {
      isValid = await result.current.trigger("email");
    });

    expect(isValid).toBe(false);

    await waitFor(() => {
      const errorMessage = result.current.getFieldState("email").error?.message;
      expect(errorMessage).toBe("유효한 이메일을 입력해주세요");
    });
  });

  it("8자 미만 비밀번호로 에러", async () => {
    const { result } = renderHook(() => useSigninForm());

    await act(async () => {
      result.current.setValue("password", "0000", {
        shouldValidate: true,
      });
    });

    let isValid = false;
    await act(async () => {
      isValid = await result.current.trigger("password");
    });

    expect(isValid).toBe(false);

    await waitFor(() => {
      const errorMessage =
        result.current.getFieldState("password").error?.message;
      expect(errorMessage).toBe("비밀번호는 8자 이상이어야 합니다");
    });
  });
});
