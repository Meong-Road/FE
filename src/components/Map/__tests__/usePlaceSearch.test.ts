import { act, renderHook } from "@testing-library/react";

import { KakaoSearchedPlaceType } from "@/lib/types/kakao";

import { usePlaceSearch } from "../_hooks/usePlaceSearch";
import { kakaoMapService } from "../_services/kakaoMapService";

jest.mock("../_services/kakaoMapService", () => ({
  kakaoMapService: {
    searchPlaces: jest.fn(),
  },
}));

declare global {
  interface Window {
    kakao: {
      maps: {
        services: {
          Places: jest.Mock;
        };
      };
    };
  }
}

describe("usePlaceSearch 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    window.kakao = {
      maps: {
        services: {
          Places: jest.fn(),
        },
      },
    };
  });

  test("키워드가 비어있을 경우 kakaoMapService.searchPlaces가 호출되지 않아야 한다", async () => {
    const { result } = renderHook(() => usePlaceSearch());

    await act(async () => {
      await result.current.search("  ");
    });

    expect(kakaoMapService.searchPlaces).not.toHaveBeenCalled();
    expect(result.current.results).toEqual([]);
  });

  test("유효한 키워드 입력 시 kakaoMapService.searchPlaces가 호출되고 결과가 설정되어야 한다", async () => {
    const mockPlaces: KakaoSearchedPlaceType[] = [
      {
        id: "1",
        place_name: "서울특별시청",
        address_name: "서울 중구 태평로1가 31",
        x: "126.978652258823",
        y: "37.56682420267543",
      },
      {
        id: "2",
        place_name: "서울특별시청 서소문2청사",
        address_name: "서울 중구 서소문동 143",
        x: "126.97522381133409",
        y: "37.563120438716645",
      },
    ];

    (kakaoMapService.searchPlaces as jest.Mock).mockResolvedValueOnce(
      mockPlaces,
    );

    const { result } = renderHook(() => usePlaceSearch());

    await act(async () => {
      await result.current.search("서울시청");
    });

    expect(kakaoMapService.searchPlaces).toHaveBeenCalled();
    expect(result.current.results).toEqual(mockPlaces);
  });

  test("검색 결과가 없을 경우 results가 빈 배열로 설정되어야 한다", async () => {
    (kakaoMapService.searchPlaces as jest.Mock).mockResolvedValueOnce([]);

    const { result } = renderHook(() => usePlaceSearch());

    await act(async () => {
      await result.current.search("존재하지 않는 장소");
    });

    expect(kakaoMapService.searchPlaces).toHaveBeenCalled();
    expect(result.current.results).toEqual([]);
  });
});
