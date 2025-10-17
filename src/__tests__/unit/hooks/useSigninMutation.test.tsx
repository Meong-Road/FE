import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";

import { PostSigninRes } from "@/api/types/auth";
import { useSigninMutation } from "@/hooks/auth/useSigninMutation";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
      },
    },
  });

const renderHookWithQueryClient = <T,>(hook: () => T) => {
  const testQueryClient = createTestQueryClient();

  return renderHook(hook, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={testQueryClient}>
        {children}
      </QueryClientProvider>
    ),
  });
};

describe("useSigninMutation 로그인 성공 테스트", () => {
  it("로그인 성공 테스트", async () => {
    const { result } = renderHookWithQueryClient(() => useSigninMutation());

    result.current.mutate({
      email: "test@example.com",
      password: "00000000",
    });

    await waitFor(() => result.current.isSuccess);

    const data = result.current.data as PostSigninRes;

    expect(data.success).toEqual(true);
    expect(data.message).toEqual("로그인 성공");
    expect(data.result.user.email).toEqual("test@example.com"); // 이건 mutate 데이터
  });
});
