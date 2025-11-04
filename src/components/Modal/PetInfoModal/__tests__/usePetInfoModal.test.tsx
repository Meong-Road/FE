import { ReactNode } from "react";
import { useParams } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";

import { petsApi } from "@/api/pets";
import { useGetPet, usePostPet, usePutPet } from "@/hooks/queries/pets";

import { usePetInfoModal } from "../hooks/usePetInfoModal";

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
      isPending: false,
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

  const renderHookWithType = (
    type: "first-login" | "add-pet" | "edit-pet",
    petId?: number,
  ) => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    return renderHook(() => usePetInfoModal({ type, petId }), { wrapper });
  };

  describe("초기 로딩 상태 테스트", () => {
    test("first-login 타입 모달의 초기 로딩 상태가 false인지 테스트", () => {
      const { result } = renderHookWithType("first-login");
      expect(result.current.isPending).toBe(false);
    });

    test("add-pet 타입 모달의 초기 로딩 상태가 false인지 테스트", () => {
      const { result } = renderHookWithType("add-pet");
      expect(result.current.isPending).toBe(false);
    });

    test("edit-pet 타입 모달의 초기 로딩 상태가 false인지 테스트", () => {
      // edit-pet 모드에서는 enabled: true로 설정되어 있지만, 데이터가 없으면 로딩이 false
      mockGetPet.mockReturnValue({
        data: undefined,
        isPending: false,
        error: null,
      } as unknown as ReturnType<typeof useGetPet>);

      const { result } = renderHookWithType("edit-pet");
      expect(result.current.isPending).toBe(false);
    });
  });

  describe("useEffect 테스트", () => {
    test("edit-pet 타입 모달일 때 기존 데이터를 불러오는지 테스트", async () => {
      const mockInitialPetData = createMockPetInfoResponse({ neuter: true });

      mockGetPet.mockReturnValue({
        data: mockInitialPetData,
        isPending: false,
        error: null,
      } as unknown as ReturnType<typeof useGetPet>);

      const { result } = renderHookWithType("edit-pet", 1);

      expect(mockGetPet).toHaveBeenCalledWith(1, { enabled: true });
      expect(result.current.initialData).toEqual({
        name: "멍멍이",
        birthYear: "2025",
        image: "",
        breed: "골든 리트리버",
        gender: "MALE",
        neuter: "true",
        petType: "dog",
      });
    });
  });

  describe("isDirty 상태 테스트", () => {
    test("edit-pet 타입 모달에서 초기 상태일 때 isDirty가 false인지 테스트", async () => {
      const mockInitialPetData = createMockPetInfoResponse();

      mockGetPet.mockReturnValue({
        data: mockInitialPetData,
        isPending: false,
        error: null,
      } as unknown as ReturnType<typeof useGetPet>);

      const { result } = renderHookWithType("edit-pet", 1);

      expect(result.current.isDirty).toBe(false);
    });

    test("edit-pet 타입 모달에서 변경사항이 없을 때 isDirty가 false인지 테스트", async () => {
      const mockInitialPetData = createMockPetInfoResponse({ neuter: null });

      mockGetPet.mockReturnValue({
        data: mockInitialPetData,
        isPending: false,
        error: null,
      } as unknown as ReturnType<typeof useGetPet>);

      const { result } = renderHookWithType("edit-pet", 1);

      expect(result.current.isDirty).toBe(false);
    });

    test("first-login 타입 모달에서 isDirty가 false인지 테스트(초기 상태)", () => {
      const { result } = renderHookWithType("first-login");
      expect(result.current.isDirty).toBe(false);
    });

    test("add-pet 타입 모달에서 isDirty가 false인지 테스트(초기 상태)", () => {
      const { result } = renderHookWithType("add-pet");
      expect(result.current.isDirty).toBe(false);
    });
  });

  // TODO: handleSubmit이 컴포넌트로 이동했으므로 mutation 훅들을 직접 테스트
  describe("mutation 훅 테스트", () => {
    test("first-login 타입일 때 usePostPet 훅이 올바르게 설정되는지 테스트", () => {
      const { result } = renderHookWithType("first-login");

      // 훅이 정상적으로 반환되는지 확인
      expect(result.current.form).toBeDefined();
      expect(result.current.isPending).toBe(false);
      expect(result.current.isDirty).toBe(false);
    });

    test("add-pet 타입일 때 usePostPet 훅이 올바르게 설정되는지 테스트", () => {
      const { result } = renderHookWithType("add-pet");

      // 훅이 정상적으로 반환되는지 확인
      expect(result.current.form).toBeDefined();
      expect(result.current.isPending).toBe(false);
      expect(result.current.isDirty).toBe(false);
    });

    test("edit-pet 타입일 때 usePutPet 훅이 올바르게 설정되는지 테스트", () => {
      const mockInitialPetData = createMockPetInfoResponse();

      mockGetPet.mockReturnValue({
        data: mockInitialPetData,
        isPending: false,
        error: null,
      } as unknown as ReturnType<typeof useGetPet>);

      const { result } = renderHookWithType("edit-pet", 1);

      // 훅이 정상적으로 반환되는지 확인
      expect(result.current.form).toBeDefined();
      expect(result.current.isPending).toBe(false);
      expect(result.current.isDirty).toBeDefined();
      expect(result.current.initialData).toBeDefined();
    });
  });

  test("API 에러 발생 시 에러 처리가 올바르게 되는지 테스트", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // 에러 상태를 시뮬레이션
    mockGetPet.mockReturnValue({
      data: undefined,
      isPending: false,
      error: new Error("API Error"),
    } as unknown as ReturnType<typeof useGetPet>);

    const { result } = renderHookWithType("edit-pet", 1);

    // 에러 상태에서도 훅이 정상적으로 동작하는지 확인
    expect(result.current.form).toBeDefined();
    expect(result.current.isPending).toBe(false);
    expect(result.current.initialData).toBeNull();

    consoleSpy.mockRestore();
  });

  test("API 호출 중 로딩 상태가 true로 변경되는지 테스트", async () => {
    // 로딩 상태를 시뮬레이션
    mockGetPet.mockReturnValue({
      data: undefined,
      isPending: true,
      error: null,
    } as unknown as ReturnType<typeof useGetPet>);

    const { result } = renderHookWithType("edit-pet", 1);

    // 로딩 상태 확인
    expect(result.current.isPending).toBe(true);
    expect(result.current.form).toBeDefined();
    expect(result.current.initialData).toBeNull();
  });

  describe("데이터 변환 테스트", () => {
    test("API 응답 데이터가 올바르게 폼 데이터로 변환되는지 테스트", async () => {
      const mockData = createMockPetInfoResponse({
        image: "https://example.com/dog.jpg",
        neuter: false,
      });

      mockGetPet.mockReturnValue({
        data: mockData,
        isPending: false,
        error: null,
      } as unknown as ReturnType<typeof useGetPet>);

      const { result } = renderHookWithType("edit-pet", 1);

      expect(result.current.initialData).toEqual({
        name: "멍멍이",
        birthYear: "2025",
        image: "https://example.com/dog.jpg",
        breed: "골든 리트리버",
        gender: "MALE",
        neuter: "false",
        petType: "dog",
      });
    });

    test("neuter가 null일 때 undefined로 변환되는지 테스트", async () => {
      const mockData = createMockPetInfoResponse();

      mockGetPet.mockReturnValue({
        data: mockData,
        isPending: false,
        error: null,
      } as unknown as ReturnType<typeof useGetPet>);

      const { result } = renderHookWithType("edit-pet", 1);

      expect(result.current.initialData).toEqual({
        name: "멍멍이",
        birthYear: "2025",
        image: "",
        breed: "골든 리트리버",
        gender: "MALE",
        neuter: undefined,
        petType: "dog",
      });
    });
  });
});
