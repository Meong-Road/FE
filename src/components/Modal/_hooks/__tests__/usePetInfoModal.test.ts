import { useParams } from "next/navigation";
import { act, renderHook } from "@testing-library/react";

import { getPetInfo, postPetInfo, putPetInfo } from "@/api/pets";

import { usePetInfoModal } from "../usePetInfoModal";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("../../../../api/pets", () => ({
  getPetInfo: jest.fn(),
  postPetInfo: jest.fn(),
  putPetInfo: jest.fn(),
}));

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;
const mockGetPetInfo = getPetInfo as jest.MockedFunction<typeof getPetInfo>;
const mockPostPetInfo = postPetInfo as jest.MockedFunction<typeof postPetInfo>;
const mockPutPetInfo = putPetInfo as jest.MockedFunction<typeof putPetInfo>;

describe("usePetInfoModal Hook 테스트", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockUseParams.mockReturnValue({ id: "1" });
    mockGetPetInfo.mockClear();
    mockPostPetInfo.mockClear();
    mockPutPetInfo.mockClear();
    mockOnClose.mockClear();
  });

  describe("초기 로딩 상태 테스트", () => {
    it("first-login 타입 모달의 초기 로딩 상태가 false인지 테스트", () => {
      const { result } = renderHook(() =>
        usePetInfoModal({ type: "first-login", onClose: mockOnClose }),
      );

      expect(result.current.isLoading).toBe(false);
    });

    it("add-pet 타입 모달의 초기 로딩 상태가 false인지 테스트", () => {
      const { result } = renderHook(() =>
        usePetInfoModal({ type: "add-pet", onClose: mockOnClose }),
      );

      expect(result.current.isLoading).toBe(false);
    });

    it("edit-pet 타입 모달의 초기 로딩 상태가 false인지 테스트", () => {
      const { result } = renderHook(() =>
        usePetInfoModal({ type: "edit-pet", onClose: mockOnClose }),
      );

      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("타입에 따라서 다른 API를 호출하는지 테스트", () => {
    it("first-login 타입일 때 postPetInfo API를 호출하는지 테스트", async () => {
      mockPostPetInfo.mockResolvedValue({
        id: 1,
        name: "멍멍이",
        birthYear: "2025",
        image: "",
        petType: "dog",
        breed: "골든 리트리버",
        gender: "MALE",
        neuter: null,
      });

      const { result } = renderHook(() =>
        usePetInfoModal({ type: "first-login", onClose: mockOnClose }),
      );

      const mockData = {
        name: "멍멍이",
        gender: "male" as const,
        birthYear: "2025",
        breed: "골든 리트리버",
      };

      await act(async () => {
        await result.current.handleSubmit(mockData);
      });

      expect(mockPostPetInfo).toHaveBeenCalledWith(mockData);
      expect(mockOnClose).toHaveBeenCalled();
    });

    it("add-pet 타입일 때 postPetInfo API를 호출하는지 테스트", async () => {
      mockPostPetInfo.mockResolvedValue({
        id: 1,
        name: "멍멍이",
        birthYear: "2025",
        image: "",
        petType: "dog",
        breed: "골든 리트리버",
        gender: "MALE",
        neuter: null,
      });

      const { result } = renderHook(() =>
        usePetInfoModal({ type: "add-pet", onClose: mockOnClose }),
      );

      const mockData = {
        name: "멍멍이",
        gender: "male" as const,
        birthYear: "2025",
        breed: "골든 리트리버",
      };

      await act(async () => {
        await result.current.handleSubmit(mockData);
      });

      expect(mockPostPetInfo).toHaveBeenCalledWith(mockData);
      expect(mockOnClose).toHaveBeenCalled();
    });

    it("edit-pet 타입일 때 putPetInfo API를 호출하는지 테스트", async () => {
      mockGetPetInfo.mockResolvedValue({
        id: 1,
        name: "멍멍이",
        birthYear: "2025",
        image: "",
        petType: "dog",
        breed: "골든 리트리버",
        gender: "MALE",
        neuter: null,
      });

      mockPutPetInfo.mockResolvedValue({
        id: 1,
        name: "마루",
        birthYear: "2024",
        image: "",
        petType: "dog",
        breed: "골든 리트리버",
        gender: "MALE",
        neuter: null,
      });

      const { result } = renderHook(() =>
        usePetInfoModal({ type: "edit-pet", onClose: mockOnClose }),
      );

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
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

    const { result } = renderHook(() =>
      usePetInfoModal({ type: "first-login", onClose: mockOnClose }),
    );

    const mockData = {
      name: "멍멍이",
      gender: "male" as const,
      birthYear: "2025",
      breed: "골든 리트리버",
    };

    await act(async () => {
      await result.current.handleSubmit(mockData);
    });

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("API 호출 중 로딩 상태가 true로 변경되는지 테스트", async () => {
    let resolvePromise: (value: {
      id: number;
      name: string;
      birthYear: string;
      image: string;
      petType: string;
      breed: string;
      gender: "MALE" | "FEMALE";
      neuter: boolean | null;
    }) => void;

    const delayedPromise = new Promise<{
      id: number;
      name: string;
      birthYear: string;
      image: string;
      petType: string;
      breed: string;
      gender: "MALE" | "FEMALE";
      neuter: boolean | null;
    }>((resolve) => {
      resolvePromise = resolve;
    });

    mockPostPetInfo.mockReturnValue(delayedPromise);

    const { result } = renderHook(() =>
      usePetInfoModal({ type: "first-login", onClose: mockOnClose }),
    );

    const mockData = {
      name: "멍멍이",
      gender: "male" as const,
      birthYear: "2025",
      breed: "골든 리트리버",
    };

    act(() => {
      result.current.handleSubmit(mockData);
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      resolvePromise!({
        id: 1,
        name: "멍멍이",
        birthYear: "2025",
        image: "",
        petType: "dog",
        breed: "골든 리트리버",
        gender: "MALE",
        neuter: null,
      });
    });

    expect(result.current.isLoading).toBe(false);
  });
});
