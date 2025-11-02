import { act, renderHook, waitFor } from "@testing-library/react";

import {
  KakaoMap,
  KakaoMarker,
  KakaoReverseGeocodePlaceType,
} from "@/lib/types/kakao";

import useKakaoMap from "../_hooks/useKakaoMap";
import { kakaoMapService } from "../_services/kakaoMapService";

jest.mock("../_services/kakaoMapService");

const mockMapRef = { current: document.createElement("div") };
const mockMap = {} as KakaoMap;
const mockMarker = {} as KakaoMarker;
const mockSetLocation = jest.fn();

beforeAll(() => {
  global.window.kakao = {
    maps: {
      LatLng: class {
        lat: number;
        lng: number;
        constructor(lat: number, lng: number) {
          this.lat = lat;
          this.lng = lng;
        }
        getLat() {
          return this.lat;
        }
        getLng() {
          return this.lng;
        }
      },
      Map: class {
        setCenter = jest.fn();
      },
      Marker: class {
        setMap = jest.fn();
        setPosition = jest.fn();
      },
      event: {
        addListener: jest.fn(),
      },
      services: {
        Status: { OK: "OK" },
      },
    },
  } as typeof window.kakao;
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("useKakaoMap 훅 테스트", () => {
  test("초기 렌더링 시 kakaoMapService.initMapWithCurrLocation이 호출되어야 한다", async () => {
    (kakaoMapService.initMapWithCurrLocation as jest.Mock).mockResolvedValue({
      map: mockMap,
      marker: mockMarker,
    });

    renderHook(() =>
      useKakaoMap({
        mapRef: mockMapRef,
        place: null,
        setLocation: mockSetLocation,
      }),
    );

    await waitFor(() =>
      expect(kakaoMapService.initMapWithCurrLocation).toHaveBeenCalled(),
    );
  });

  // TODO: 두 번째 useEffect 내용 테스트

  test("resetMap을 호출하면 updateToCurrLocation이 실행되고 setLocation이 호출되어야 한다", async () => {
    const mockLocation: KakaoReverseGeocodePlaceType = {
      address_name: "서울 강남구 역삼동 606-18",
      region_1depth_name: "서울",
      region_2depth_name: "강남구",
      latlng: { lat: 37.50648850325766, lng: 127.03378957878822 },
    };

    (kakaoMapService.initMapWithCurrLocation as jest.Mock).mockResolvedValue({
      map: mockMap,
      marker: mockMarker,
    });
    (kakaoMapService.updateToCurrLocation as jest.Mock).mockResolvedValue(
      mockLocation,
    );

    const { result } = renderHook(() =>
      useKakaoMap({
        mapRef: mockMapRef,
        place: null,
        setLocation: mockSetLocation,
      }),
    );

    await waitFor(() =>
      expect(kakaoMapService.initMapWithCurrLocation).toHaveBeenCalled(),
    );

    await act(async () => {
      await result.current.resetMap();
    });

    await waitFor(() =>
      expect(kakaoMapService.updateToCurrLocation).toHaveBeenCalled(),
    );

    expect(kakaoMapService.updateToCurrLocation).toHaveBeenCalledWith(
      mockMap,
      mockMarker,
    );
    expect(mockSetLocation).toHaveBeenCalledWith(mockLocation);
  });

  test("map 또는 marker가 없으면 resetMap이 실행되지 않아야 한다", async () => {
    const { result } = renderHook(() =>
      useKakaoMap({
        mapRef: { current: null },
        place: null,
        setLocation: mockSetLocation,
      }),
    );

    await act(async () => {
      await result.current.resetMap();
    });

    expect(kakaoMapService.updateToCurrLocation).not.toHaveBeenCalled();
  });
});
