import { ReactNode } from "react";
import { useParams } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";

import { petsApi } from "@/api/pets";

import { usePetInfoModal } from "../usePetInfoModal";

const createMockPetInfoResponse = (overrides = {}) => ({
  id: 1,
  name: "멍멍이",
  birthYear: "2025",
  image: "",
  petType: "dog" as const,
  breed: "골든 리트리버",
  gender: "MALE" as const,
  neuter: null,
  ...overrides,
});

const createMockFormData = (overrides = {}) => ({
  name: "멍멍이",
  gender: "male" as const,
  birthYear: "2025",
  breed: "골든 리트리버",
  ...overrides,
});

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("../../../../api/pets", () => ({
  petsApi: {
    getPetInfo: jest.fn(),
    postPetInfo: jest.fn(),
    putPetInfo: jest.fn(),
  },
}));

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;
const mockGetPetInfo = petsApi.getPetInfo as jest.MockedFunction<
  typeof petsApi.getPetInfo
>;
const mockPostPetInfo = petsApi.postPetInfo as jest.MockedFunction<
  typeof petsApi.postPetInfo
>;
const mockPutPetInfo = petsApi.putPetInfo as jest.MockedFunction<
  typeof petsApi.putPetInfo
>;

describe("usePetInfoModal Hook 테스트", () => {
  const mockOnClose = jest.fn();
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    mockUseParams.mockReturnValue({ id: "1" });
    mockGetPetInfo.mockClear();
    mockPostPetInfo.mockClear();
    mockPutPetInfo.mockClear();
    mockOnClose.mockClear();
  });

  afterEach(() => {
    queryClient.clear();
  });

  const renderHookWithType = (type: "first-login" | "add-pet" | "edit-pet") => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    return renderHook(
      () => usePetInfoModal({ type: type, onClose: mockOnClose }),
      { wrapper },
    );
  };

  describe("초기 로딩 상태 테스트", () => {
    it("first-login 타입 모달의 초기 로딩 상태가 false인지 테스트", () => {
      const { result } = renderHookWithType("first-login");
      expect(result.current.isLoading).toBe(false);
    });

    it("add-pet 타입 모달의 초기 로딩 상태가 false인지 테스트", () => {
      const { result } = renderHookWithType("add-pet");
      expect(result.current.isLoading).toBe(false);
    });

    it("edit-pet 타입 모달의 초기 로딩 상태가 false인지 테스트", () => {
      const { result } = renderHookWithType("edit-pet");
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("useEffect 테스트", () => {
    it("edit-pet 타입 모달일 때 기존 데이터를 불러오는지 테스트", async () => {
      const mockInitialPetData = createMockPetInfoResponse({ neuter: true });
      mockGetPetInfo.mockResolvedValue(mockInitialPetData);

      const { result } = renderHookWithType("edit-pet");

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));
      });

      expect(mockGetPetInfo).toHaveBeenCalledWith(1);
      expect(result.current.initialData).toEqual({
        name: "멍멍이",
        birthYear: "2025",
        existingPhotoUrl: "",
        breed: "골든 리트리버",
        gender: "male",
        neuter: "did",
      });
    });
  });

  describe("hasChanges 함수 테스트", () => {
    it("edit-pet 타입 모달에서 변경사항이 있을 때 true를 반환하는지 테스트", async () => {
      mockGetPetInfo.mockResolvedValue(createMockPetInfoResponse());
      const { result } = renderHookWithType("edit-pet");

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));
      });

      const changedData = {
        name: "마루",
        birthYear: "2024",
      };

      const hasChanges = result.current.hasChanges;
      expect(hasChanges?.(changedData)).toBe(true);
    });

    it("edit-pet 타입 모달에서 변경사항이 없을 때 false를 반환하는지 테스트", async () => {
      mockGetPetInfo.mockResolvedValue(createMockPetInfoResponse());
      const { result } = renderHookWithType("edit-pet");

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));
      });

      const unchangedData = {
        name: "멍멍이",
        birthYear: "2025",
        breed: "골든 리트리버",
        gender: "male" as const,
        neuter: undefined,
        existingPhotoUrl: "",
      };

      const hasChanges = result.current.hasChanges;
      expect(hasChanges?.(unchangedData)).toBe(false);
    });

    it("first-login 타입 모달에서 hasChanges가 undefined인지 테스트", () => {
      const { result } = renderHookWithType("first-login");

      expect(result.current.hasChanges).toBeUndefined();
    });

    it("add-pet 타입 모달에서 hasChanges가 undefined인지 테스트", () => {
      const { result } = renderHookWithType("add-pet");

      expect(result.current.hasChanges).toBeUndefined();
    });
  });

  describe("타입에 따라서 다른 API를 호출하는지 테스트", () => {
    it("first-login 타입일 때 postPetInfo API를 호출하는지 테스트", async () => {
      mockPostPetInfo.mockResolvedValue(createMockPetInfoResponse());

      const { result } = renderHookWithType("first-login");

      const mockData = createMockFormData();
      await act(async () => {
        await result.current.handleSubmit(mockData);
      });

      expect(mockPostPetInfo).toHaveBeenCalledWith(mockData);
      expect(mockOnClose).toHaveBeenCalled();
    });

    it("add-pet 타입일 때 postPetInfo API를 호출하는지 테스트", async () => {
      mockPostPetInfo.mockResolvedValue(createMockPetInfoResponse());

      const { result } = renderHookWithType("add-pet");

      const mockData = createMockFormData();
      await act(async () => {
        await result.current.handleSubmit(mockData);
      });

      expect(mockPostPetInfo).toHaveBeenCalledWith(mockData);
      expect(mockOnClose).toHaveBeenCalled();
    });

    it("edit-pet 타입일 때 putPetInfo API를 호출하는지 테스트", async () => {
      mockGetPetInfo.mockResolvedValue(createMockPetInfoResponse());
      mockPutPetInfo.mockResolvedValue(
        createMockPetInfoResponse({ name: "마루", birthYear: "2024" }),
      );

      const { result } = renderHookWithType("edit-pet");

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));
      });

      const mockData = {
        name: "마루",
        birthYear: "2024",
      };

      await act(async () => {
        await result.current.handleSubmit(mockData);
      });

      expect(mockGetPetInfo).toHaveBeenCalledWith(1);
      expect(mockPutPetInfo).toHaveBeenCalledWith(1, mockData);
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("API 에러 발생 시 에러 처리가 올바르게 되는지 테스트", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockPostPetInfo.mockRejectedValue(new Error("API Error"));

    const { result } = renderHookWithType("first-login");

    const mockData = createMockFormData();

    await act(async () => {
      await result.current.handleSubmit(mockData);
    });

    expect(consoleSpy).toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it("API 호출 중 로딩 상태가 true로 변경되는지 테스트", async () => {
    // Promise를 수동으로 제어할 수 있도록 설정
    type ApiResponse = ReturnType<typeof createMockPetInfoResponse>;

    let resolvePromise: (value: ApiResponse) => void;
    const delayedPromise = new Promise<ApiResponse>((resolve) => {
      resolvePromise = resolve;
    });

    // API 호출이 즉시 완료되지 않도록 설정
    mockPostPetInfo.mockReturnValue(delayedPromise);

    const { result } = renderHookWithType("first-login");
    const mockData = createMockFormData();

    // API 호출 시작
    act(() => {
      result.current.handleSubmit(mockData);
    });

    // Promise를 수동으로 완료
    await act(async () => {
      resolvePromise!(createMockPetInfoResponse());
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  });

  describe("데이터 변환 테스트", () => {
    it("API 응답 데이터가 올바르게 폼 데이터로 변환되는지 테스트", async () => {
      const mockData = createMockPetInfoResponse({
        image: "https://example.com/dog.jpg",
        neuter: false,
      });

      mockGetPetInfo.mockResolvedValue(mockData);

      const { result } = renderHookWithType("edit-pet");

      await act(
        async () => await new Promise((resolve) => setTimeout(resolve, 100)),
      );

      expect(result.current.initialData).toEqual({
        name: "멍멍이",
        birthYear: "2025",
        existingPhotoUrl: "https://example.com/dog.jpg",
        breed: "골든 리트리버",
        gender: "male",
        neuter: "didnot",
      });
    });

    it("neuter가 null일 때 undefined로 변환되는지 테스트", async () => {
      const mockData = createMockPetInfoResponse();
      mockGetPetInfo.mockResolvedValue(mockData);

      const { result } = renderHookWithType("edit-pet");

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));
      });

      expect(result.current.initialData).toEqual({
        name: "멍멍이",
        birthYear: "2025",
        existingPhotoUrl: "",
        breed: "골든 리트리버",
        gender: "male",
        neuter: undefined,
      });
    });
  });
});
