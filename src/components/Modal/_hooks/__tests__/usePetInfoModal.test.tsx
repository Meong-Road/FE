import { ReactNode } from "react";
import { useParams } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";

import { petsApi } from "@/api/pets";
import { useGetPet, usePostPet, usePutPet } from "@/hooks/queries/pets";

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

jest.mock("../../../../hooks/queries/pets", () => ({
  useGetPet: jest.fn(),
  usePostPet: jest.fn(),
  usePutPet: jest.fn(),
}));

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;
const mockGetPet = useGetPet as jest.MockedFunction<typeof useGetPet>;
const mockPostPet = usePostPet as jest.MockedFunction<typeof usePostPet>;
const mockPutPet = usePutPet as jest.MockedFunction<typeof usePutPet>;
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

    // 훅 모킹 초기화
    mockGetPet.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof useGetPet>);
    mockPostPet.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    } as unknown as ReturnType<typeof usePostPet>);
    mockPutPet.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    } as unknown as ReturnType<typeof usePutPet>);

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
      // edit-pet 모드에서는 enabled: true로 설정되어 있지만, 데이터가 없으면 로딩이 false
      mockGetPet.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: null,
      } as unknown as ReturnType<typeof useGetPet>);

      const { result } = renderHookWithType("edit-pet");
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("useEffect 테스트", () => {
    it("edit-pet 타입 모달일 때 기존 데이터를 불러오는지 테스트", async () => {
      const mockInitialPetData = createMockPetInfoResponse({ neuter: true });

      mockGetPet.mockReturnValue({
        data: mockInitialPetData,
        isLoading: false,
        error: null,
      } as unknown as ReturnType<typeof useGetPet>);

      const { result } = renderHookWithType("edit-pet");

      expect(mockGetPet).toHaveBeenCalledWith(1, { enabled: true });
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
      const mockInitialPetData = createMockPetInfoResponse();

      mockGetPet.mockReturnValue({
        data: mockInitialPetData,
        isLoading: false,
        error: null,
      } as unknown as ReturnType<typeof useGetPet>);

      const { result } = renderHookWithType("edit-pet");

      const changedData = {
        name: "마루",
        birthYear: "2024",
      };

      const hasChanges = result.current.hasChanges;
      expect(hasChanges?.(changedData)).toBe(true);
    });

    it("edit-pet 타입 모달에서 변경사항이 없을 때 false를 반환하는지 테스트", async () => {
      const mockInitialPetData = createMockPetInfoResponse({ neuter: null });

      mockGetPet.mockReturnValue({
        data: mockInitialPetData,
        isLoading: false,
        error: null,
      } as unknown as ReturnType<typeof useGetPet>);

      const { result } = renderHookWithType("edit-pet");

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
      const mockMutateAsync = jest
        .fn()
        .mockResolvedValue(createMockPetInfoResponse());
      mockPostPet.mockReturnValue({
        mutateAsync: mockMutateAsync,
        isPending: false,
      } as unknown as ReturnType<typeof usePostPet>);

      const { result } = renderHookWithType("first-login");

      const mockData = createMockFormData();
      await act(async () => {
        await result.current.handleSubmit(mockData);
      });

      expect(mockMutateAsync).toHaveBeenCalledWith(mockData);
      expect(mockOnClose).toHaveBeenCalled();
    });

    it("add-pet 타입일 때 postPetInfo API를 호출하는지 테스트", async () => {
      const mockMutateAsync = jest
        .fn()
        .mockResolvedValue(createMockPetInfoResponse());
      mockPostPet.mockReturnValue({
        mutateAsync: mockMutateAsync,
        isPending: false,
      } as unknown as ReturnType<typeof usePostPet>);

      const { result } = renderHookWithType("add-pet");

      const mockData = createMockFormData();
      await act(async () => {
        await result.current.handleSubmit(mockData);
      });

      expect(mockMutateAsync).toHaveBeenCalledWith(mockData);
      expect(mockOnClose).toHaveBeenCalled();
    });

    it("edit-pet 타입일 때 putPetInfo API를 호출하는지 테스트", async () => {
      const mockInitialPetData = createMockPetInfoResponse();
      const mockMutateAsync = jest
        .fn()
        .mockResolvedValue(
          createMockPetInfoResponse({ name: "마루", birthYear: "2024" }),
        );

      mockGetPet.mockReturnValue({
        data: mockInitialPetData,
        isLoading: false,
        error: null,
      } as unknown as ReturnType<typeof useGetPet>);
      mockPutPet.mockReturnValue({
        mutateAsync: mockMutateAsync,
        isPending: false,
      } as unknown as ReturnType<typeof usePutPet>);

      const { result } = renderHookWithType("edit-pet");

      const mockData = {
        name: "마루",
        birthYear: "2024",
      };

      await act(async () => {
        await result.current.handleSubmit(mockData);
      });

      expect(mockGetPet).toHaveBeenCalledWith(1, { enabled: true });
      expect(mockMutateAsync).toHaveBeenCalledWith({ id: 1, data: mockData });
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("API 에러 발생 시 에러 처리가 올바르게 되는지 테스트", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const mockMutateAsync = jest.fn().mockRejectedValue(new Error("API Error"));
    mockPostPet.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    } as unknown as ReturnType<typeof usePostPet>);

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

    const mockMutateAsync = jest.fn().mockReturnValue(delayedPromise);
    mockPostPet.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: true,
    } as unknown as ReturnType<typeof usePostPet>);

    const { result } = renderHookWithType("first-login");
    const mockData = createMockFormData();

    // API 호출 시작
    act(() => {
      result.current.handleSubmit(mockData);
    });

    // 로딩 상태 확인
    expect(result.current.isLoading).toBe(true);

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

      mockGetPet.mockReturnValue({
        data: mockData,
        isLoading: false,
        error: null,
      } as unknown as ReturnType<typeof useGetPet>);

      const { result } = renderHookWithType("edit-pet");

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

      mockGetPet.mockReturnValue({
        data: mockData,
        isLoading: false,
        error: null,
      } as unknown as ReturnType<typeof useGetPet>);

      const { result } = renderHookWithType("edit-pet");

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
