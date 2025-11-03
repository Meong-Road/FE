import {
  KakaoLatLng,
  KakaoMap,
  KakaoMarker,
  KakaoSearchedPlaceType,
} from "../types/kakao";

/**
 * 기본 좌표 (서울시청) 리턴
 */
export const getDefaultLatLng = (): KakaoLatLng => {
  return new window.kakao.maps.LatLng(37.566826, 126.9786567);
};

/**
 * JSON 문자열 위치 정보 파싱; 실패 시 기본 좌표 리턴
 */
export const parseLocationPayload = (
  payload: string,
): {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  latlng: { lat: number; lng: number };
} => {
  try {
    const parsed = JSON.parse(payload);

    // 구버전: district로 들어감
    if ("district" in parsed) {
      return {
        address_name: parsed.district ?? "",
        region_1depth_name: "서울",
        region_2depth_name: parsed.district ?? "",
        latlng: parsed.latlng ?? { lat: 37.566826, lng: 126.9786567 },
      };
    }

    // 신버전
    return parsed;
  } catch {
    // 구구버전: 위치 정보 없음
    return {
      address_name: "서울 중구 태평로1가 31",
      region_1depth_name: "서울",
      region_2depth_name: "중구",
      latlng: { lat: 37.566826, lng: 126.9786567 },
    };
  }
};

/**
 * 카카오맵 오브젝트에서 필요한 필드만 필터링 -> 매핑
 */
export const mapPlaces = (
  data: KakaoSearchedPlaceType[],
): KakaoSearchedPlaceType[] => {
  return data.map((place) => ({
    id: place.id,
    address_name: place.address_name,
    place_name: place.place_name,
    x: place.x,
    y: place.y,
  }));
};

/**
 * 마커와 맵 이동
 */
export const moveMapAndMarker = (
  map: KakaoMap,
  marker: KakaoMarker,
  latlng: KakaoLatLng,
): void => {
  map.setCenter(latlng);
  marker.setPosition(latlng);
};

/**
 * 주소 오버레이
 */
export const createCustomOverlay = (address: string): string => {
  return `
    <div style="
      background-color: #FFE59E;
      padding: 8px 12px;
      border-radius: 12px;
      color: #FF8400;
      font-weight: 500;
      font-size: 14px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    ">
      ${address}
    </div>
  `;
};
