import {
  KakaoMap,
  KakaoMarker,
  KakaoSearchedPlaceType,
} from "@/lib/types/kakao";
import {
  createCustomOverlay,
  getDefaultLatLng,
  mapPlaces,
  moveMapAndMarker,
  parseLocationPayload,
} from "@/lib/utils/map";

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
    },
  } as typeof window.kakao;
});

describe("map 유틸 함수 테스트", () => {
  test("getDefaultLatLng: 서울시청 좌표를 반환해야 한다", () => {
    const latlng = getDefaultLatLng();

    expect(latlng).toBeInstanceOf(window.kakao.maps.LatLng);
    expect(latlng.getLat()).toBe(37.566826);
    expect(latlng.getLng()).toBe(126.9786567);
  });

  test("parseLocationPayload: 유효한 JSON 문자열을 파싱해야 한다", () => {
    const payload = JSON.stringify({
      address_name: "서울 중구 태평로1가 31",
      region_1depth_name: "서울",
      region_2depth_name: "중구",
      latlng: { lat: 37.566826, lng: 126.9786567 },
    });

    const result = parseLocationPayload(payload);
    expect(result.address_name).toBe("서울 중구 태평로1가 31");
    expect(result.latlng.lat).toBe(37.566826);
    expect(result.latlng.lng).toBe(126.9786567);
  });

  test("parseLocationPayload: JSON 파싱 실패 시 기본 좌표를 리턴해야 한다", () => {
    const result = parseLocationPayload("잘못된 문자열");

    expect(result.address_name).toBe("서울 중구 태평로1가 31");
    expect(result.latlng.lat).toBe(37.566826);
    expect(result.latlng.lng).toBe(126.9786567);
  });

  test("mapPlaces: 카카오맵 오브젝트에서 필요한 필드만 매핑되어야 한다", () => {
    const data: KakaoSearchedPlaceType[] = [
      {
        id: "1",
        address_name: "서울 중구 태평로1가 31",
        place_name: "서울특별시청",
        x: "126.9786567",
        y: "37.566826",
      },
    ];

    const result = mapPlaces(data);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
    expect(result[0].place_name).toBe("서울특별시청");
    expect(result[0]).not.toHaveProperty("road_address_name");
  });

  test("moveMapAndMarker: map.setCenter와 marker.setPosition이 호출되어야 한다", () => {
    const mockSetCenter = jest.fn();
    const mockSetPosition = jest.fn();

    const map = { setCenter: mockSetCenter } as KakaoMap;
    const marker = {
      setMap: jest.fn(),
      setPosition: mockSetPosition,
    } as KakaoMarker;
    const latlng = new window.kakao.maps.LatLng(37.566826, 126.9786567);

    moveMapAndMarker(map, marker, latlng);

    expect(mockSetCenter).toHaveBeenCalledWith(latlng);
    expect(mockSetPosition).toHaveBeenCalledWith(latlng);
  });

  test("createCustomOverlay: 주소를 포함한 HTML 문자열을 반환해야 한다", () => {
    const html = createCustomOverlay("서울 중구 태평로1가 31");
    expect(html).toContain("서울 중구");
  });
});
