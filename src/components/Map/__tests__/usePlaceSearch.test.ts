import { act, renderHook } from "@testing-library/react";

import { usePlaceSearch } from "../_hooks/usePlaceSearch";
import { kakaoMapService } from "../_services/kakaoMapService";

jest.mock("@/components/Map/_services/kakaoMapService.ts", () => ({
  kakaoMapService: {
    searchPlaces: jest.fn(),
  },
}));

const mockSearchPlaces = kakaoMapService.searchPlaces as jest.Mock;

beforeAll(() => {
  global.window.kakao = {
    maps: {
      services: {
        Places: jest.fn().mockImplementation(() => ({
          keywordSearch: jest.fn(),
        })),
      },
    },
  } as unknown as typeof window.kakao;
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("usePlaceSearch 훅 테스트", () => {
  test("키워드 검색 성공 시 결과 어레이를 리턴한다", async () => {
    const mockSuccess: kakao.maps.services.PlaceType[] = [
      {
        address_name: "서울 중구 태평로1가 31",
        place_name: "서울특별시청",
        road_address_name: "서울 중구 세종대로 110",
        x: "126.978652258823",
        y: "37.56682420267543",
      },
    ];

    mockSearchPlaces.mockResolvedValue(mockSuccess);
    const { result } = renderHook(() => usePlaceSearch());

    let places;
    await act(async () => {
      places = await result.current.placeSearch("서울시청");
    });

    expect(places).toEqual(mockSuccess);
  });

  test("키워드 검색 결과가 없거나 검색이 실패하는 경우에는 빈 어레이를 리턴한다", async () => {
    mockSearchPlaces.mockResolvedValue([]);
    const { result } = renderHook(() => usePlaceSearch());

    let places;
    await act(async () => {
      places = await result.current.placeSearch("결과가 없는 키워드");
    });

    expect(places).toEqual([]);
  });
});
