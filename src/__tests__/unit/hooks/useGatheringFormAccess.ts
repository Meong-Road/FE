import { renderHook } from "@testing-library/react";
import { toast } from "sonner";

import { useGatheringFormAccess } from "@/hooks/gathering/useGatheringFormAccess";
import { storageUtils } from "@/lib/utils/storage";

const mockReplace = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

jest.mock("@/lib/utils/storage");

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
  },
}));

const mockStorageUtils = storageUtils as jest.Mocked<typeof storageUtils>;
const mockToastError = toast.error as jest.MockedFunction<typeof toast.error>;

describe("useGatheringFormAccess", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockStorageUtils.getItem.mockReturnValue(null);
    mockStorageUtils.removeItem.mockImplementation(() => {});
  });

  describe("접근 권한이 있을 때", () => {
    test("canEnter가 allowedType(quick)과 일치하면 sessionStorage에서 제거해야 한다", () => {
      mockStorageUtils.getItem.mockReturnValue("quick");

      renderHook(() =>
        useGatheringFormAccess({
          allowedType: "quick",
        }),
      );

      expect(mockStorageUtils.getItem).toHaveBeenCalledWith(
        "canEnterCreatePage",
        "sessionStorage",
      );
      expect(mockStorageUtils.removeItem).toHaveBeenCalledWith(
        "canEnterCreatePage",
        "sessionStorage",
      );
    });

    test("canEnter가 allowedType(regular)과 일치하면 sessionStorage에서 제거해야 한다", () => {
      mockStorageUtils.getItem.mockReturnValue("regular");

      renderHook(() =>
        useGatheringFormAccess({
          allowedType: "regular",
        }),
      );

      expect(mockStorageUtils.getItem).toHaveBeenCalledWith(
        "canEnterCreatePage",
        "sessionStorage",
      );
      expect(mockStorageUtils.removeItem).toHaveBeenCalledWith(
        "canEnterCreatePage",
        "sessionStorage",
      );
    });

    test("접근 권한이 있으면 토스트나 리다이렉트를 하지 않아야 한다", () => {
      mockStorageUtils.getItem.mockReturnValue("quick");

      renderHook(() =>
        useGatheringFormAccess({
          allowedType: "quick",
        }),
      );

      expect(mockToastError).not.toHaveBeenCalled();
      expect(mockReplace).not.toHaveBeenCalled();
    });
  });

  describe("접근 권한이 없을 때", () => {
    test("canEnter가 allowedType과 일치하지 않으면 에러 토스트를 표시하고 리다이렉트해야 한다", () => {
      mockStorageUtils.getItem.mockReturnValue("quick");

      renderHook(() =>
        useGatheringFormAccess({
          allowedType: "regular",
        }),
      );

      expect(mockToastError).toHaveBeenCalledWith("올바른 경로로 접근해주세요");
      expect(mockReplace).toHaveBeenCalledWith("/");
      expect(mockStorageUtils.removeItem).not.toHaveBeenCalled();
    });

    test("quick 타입에서 regular가 저장되어 있으면 리다이렉트 해야 한다", () => {
      mockStorageUtils.getItem.mockReturnValue("regular");

      renderHook(() =>
        useGatheringFormAccess({
          allowedType: "quick",
        }),
      );

      expect(mockToastError).toHaveBeenCalledWith("올바른 경로로 접근해주세요");
      expect(mockReplace).toHaveBeenCalledWith("/");
      expect(mockStorageUtils.removeItem).not.toHaveBeenCalled();
    });
  });

  describe("커스텀 redirectPath", () => {
    test("기본 redirectPath는 /이어야 한다", () => {
      mockStorageUtils.getItem.mockReturnValue("regular");

      renderHook(() =>
        useGatheringFormAccess({
          allowedType: "quick",
        }),
      );

      expect(mockReplace).toHaveBeenCalledWith("/");
    });

    test("커스텀 redirectPath를 지정할 수 있어야 한다", () => {
      mockStorageUtils.getItem.mockReturnValue("regular");

      renderHook(() =>
        useGatheringFormAccess({
          allowedType: "quick",
          redirectPath: "/custom-path",
        }),
      );

      expect(mockReplace).toHaveBeenCalledWith("/custom-path");
    });

    test("커스텀 redirectPath로 리다이렉트할 때도 토스트를 표시해야 한다", () => {
      mockStorageUtils.getItem.mockReturnValue("regular");

      renderHook(() =>
        useGatheringFormAccess({
          allowedType: "quick",
          redirectPath: "/custom-path",
        }),
      );

      expect(mockToastError).toHaveBeenCalledWith("올바른 경로로 접근해주세요");
      expect(mockReplace).toHaveBeenCalledWith("/custom-path");
    });
  });

  describe("중복 체크 방지", () => {
    test("이미 체크한 경우에는 다시 체크하지 않아야 한다", () => {
      mockStorageUtils.getItem.mockReturnValue("quick");

      const { rerender } = renderHook(
        ({ allowedType }) =>
          useGatheringFormAccess({
            allowedType,
          }),
        {
          initialProps: { allowedType: "quick" as const },
        },
      );

      expect(mockStorageUtils.getItem).toHaveBeenCalledTimes(1);
      expect(mockStorageUtils.removeItem).toHaveBeenCalledTimes(1);

      rerender({ allowedType: "quick" });

      expect(mockStorageUtils.getItem).toHaveBeenCalledTimes(1);
      expect(mockStorageUtils.removeItem).toHaveBeenCalledTimes(1);
    });

    test("hasChecked가 true이면 sessionStorage를 다시 읽지 않아야 한다", () => {
      mockStorageUtils.getItem.mockReturnValue("quick");

      const { rerender } = renderHook(
        ({ redirectPath }) =>
          useGatheringFormAccess({
            allowedType: "quick",
            redirectPath,
          }),
        {
          initialProps: { redirectPath: "/" },
        },
      );

      expect(mockStorageUtils.getItem).toHaveBeenCalledTimes(1);

      rerender({ redirectPath: "/other" });

      expect(mockStorageUtils.getItem).toHaveBeenCalledTimes(1);
    });
  });
});
