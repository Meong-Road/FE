import { toast } from "sonner";

import {
  KakaoLatLng,
  KakaoMap,
  KakaoMapClickEvent,
  KakaoMarker,
  KakaoPlaces,
  KakaoReverseGeocodePlaceType,
  KakaoSearchedPlaceType,
  KakaoStatus,
} from "@/lib/types/kakao";
import {
  createCustomOverlay,
  getDefaultLatLng,
  mapPlaces,
  moveMapAndMarker,
  parseLocationPayload,
} from "@/lib/utils/map";

export const kakaoMapService = {
  /**
   * 카카오맵 SDK 대기
   */
  waitForKakaoMapLoad: (): Promise<void> => {
    return new Promise((resolve) => {
      if (window.kakao?.maps?.load) {
        window.kakao.maps.load(resolve);
        return;
      }

      const interval = setInterval(() => {
        if (window.kakao?.maps?.load) {
          clearInterval(interval);
          window.kakao.maps.load(resolve);
        }
      }, 100);
    });
  },

  /**
   * 현재 위치 좌표 리턴; 실패 시 기본 위치
   */
  getCurrentLatLng: async (): Promise<KakaoLatLng> => {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast.success("위치가 내 현재 위치로 변경되었습니다");
          resolve(
            new window.kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude,
            ),
          );
        },
        () => {
          toast.error("현재 위치를 가져올 수 없어 기본 위치로 이동합니다");
          const defaultLocation = getDefaultLatLng();
          resolve(defaultLocation);
        },
      );
    });
  },

  /**
   * 키워드로 장소 검색
   * @param keyword 검색할 키워드
   * @param ps 장소 검색 서비스 인스턴스
   * @returns 검색 결과 어레이
   */
  searchPlaces: (
    keyword: string,
    ps: KakaoPlaces,
  ): Promise<KakaoSearchedPlaceType[]> => {
    return new Promise((resolve) => {
      ps.keywordSearch(keyword, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve(mapPlaces(data));
        } else {
          resolve([]);
        }
      });
    });
  },

  /**
   * 좌표를 주소로 변환합니다
   * @param latlng 변환할 좌표
   * @returns 주소 정보 오브젝트
   */
  reverseGeocode: (
    latlng: KakaoLatLng,
  ): Promise<KakaoReverseGeocodePlaceType> => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const emptyResult: KakaoReverseGeocodePlaceType = {
      address_name: "",
      region_1depth_name: "",
      region_2depth_name: "",
      latlng: { lat: latlng.getLat(), lng: latlng.getLng() },
    };

    return new Promise((resolve) => {
      geocoder.coord2Address(
        latlng.getLng(),
        latlng.getLat(),
        (
          result: {
            address?: {
              address_name: string;
              region_1depth_name: string;
              region_2depth_name: string;
            };
          }[],
          status: KakaoStatus,
        ) => {
          if (
            status === window.kakao.maps.services.Status.OK &&
            result.length > 0
          ) {
            const item = result[0];
            resolve({
              address_name: item.address?.address_name ?? "",
              region_1depth_name: item.address?.region_1depth_name ?? "",
              region_2depth_name: item.address?.region_2depth_name ?? "",
              latlng: { lat: latlng.getLat(), lng: latlng.getLng() },
            });
          } else {
            resolve(emptyResult);
          }
        },
      );
    });
  },

  /**
   * 초기 카카오맵 생성
   * @param container 맵을 렌더링할 HTML 요소
   * @param center 중심 좌표
   * @returns 맵 인스턴스
   */
  createMap: (container: HTMLDivElement, center: KakaoLatLng): KakaoMap => {
    return new window.kakao.maps.Map(container, {
      center,
      level: 3,
      keyboardShortcuts: true,
    });
  },

  /**
   * 지정한 위치에 마커 생성
   * @param map 마커를 표시할 맵 인스턴스
   * @param position 마커 좌표
   * @returns 마커 인스턴스
   * @note 커스텀할 이미지는 public 폴더 안에 있어야 한다고 합니다
   */
  createMarker: (map: KakaoMap, position: KakaoLatLng): KakaoMarker => {
    const imageSrc = "/map-marker.svg";
    const imageSize = new kakao.maps.Size(24, 24);
    const imageOption = { offset: new kakao.maps.Point(12, 24) };
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption,
    );

    return new window.kakao.maps.Marker({ map, position, image: markerImage });
  },

  /**
   * 맵 클릭 시 좌표를 callback으로 전달하는 이벤트 바인딩
   * @param map 이벤트를 바인딩할 맵 인스턴스
   * @param callback 클릭한 좌표를 처리할 함수
   */
  bindMapClick: (
    map: KakaoMap,
    callback: (latlng: KakaoLatLng) => void,
  ): void => {
    window.kakao.maps.event.addListener(
      map,
      "click",
      (event: KakaoMapClickEvent) => {
        callback(event.latLng);
      },
    );
  },

  /**
   * 클릭한 장소로 맵을 이동시키고 location 갱신
   * @param map 맵 인스턴스
   * @param marker 마커 인스턴스
   * @param searchedPlace 이동할 장소
   * @param setLocation 위치 상태 갱신하는 함수
   * @returns
   */
  moveMarkerToPlace: (
    map: KakaoMap,
    marker: KakaoMarker,
    searchedPlace: KakaoSearchedPlaceType,
    setLocation: (loc: KakaoReverseGeocodePlaceType) => void,
  ): void => {
    const latlng = new window.kakao.maps.LatLng(
      Number(searchedPlace.y),
      Number(searchedPlace.x),
    );

    moveMapAndMarker(map, marker, latlng);
    toast.success("위치가 변경되었습니다");

    setLocation({
      address_name: searchedPlace.address_name,
      region_1depth_name: searchedPlace.address_name.split(" ")[0],
      region_2depth_name: searchedPlace.address_name.split(" ")[1] ?? "",
      latlng: { lat: Number(searchedPlace.y), lng: Number(searchedPlace.x) },
    });
  },

  /**
   * 유저의 현재 위치로 맵과 마커를 이동시키고 위치 정보를 리턴
   * @param map 맵 인스턴스
   * @param marker 마커 인스턴스
   * @returns 현재 위치 정보
   */
  updateToCurrLocation: async (
    map: KakaoMap,
    marker: KakaoMarker,
  ): Promise<KakaoReverseGeocodePlaceType> => {
    const latlng = await kakaoMapService.getCurrentLatLng();
    moveMapAndMarker(map, marker, latlng);

    return kakaoMapService.reverseGeocode(latlng);
  },

  /**
   * 정적인 카카오맵을 생성
   * @param container 맵을 렌더링할 HTML 요소
   * @param payload JSON 문자열
   * @returns 맵과 마커 인스턴스
   */
  createStaticMap: async (
    container: HTMLDivElement,
    payload: string,
  ): Promise<{ map: KakaoMap; marker: KakaoMarker }> => {
    const location = parseLocationPayload(payload);
    const { lat, lng } = location.latlng;

    await kakaoMapService.waitForKakaoMapLoad();

    const locPosition = new window.kakao.maps.LatLng(lat, lng);
    const mapOption = {
      center: locPosition,
      level: 3,
      draggable: false,
      scrollWheel: false,
      disableDoubleClick: true,
    };

    const map = new window.kakao.maps.Map(container, mapOption);
    const marker = kakaoMapService.createMarker(map, locPosition);
    const customOverlay = new kakao.maps.CustomOverlay({
      position: locPosition,
      content: createCustomOverlay(location.address_name),
      yAnchor: 1.8,
    });

    customOverlay.setMap(map);

    return { map, marker };
  },

  /**
   * localStorage에 저장된 위치 정보 복원
   *
   * @param draftKey localStorage key
   * @returns 복원된 좌표 또는 null
   */
  restoreSavedLocation: async (
    draftKey: string | null,
  ): Promise<KakaoLatLng | null> => {
    if (!draftKey) return null;

    try {
      const draft = localStorage.getItem(draftKey);
      if (!draft) return null;

      const parsed = JSON.parse(draft);
      const location = parsed?.location ? JSON.parse(parsed.location) : null;
      const coords = location?.latlng;

      if (coords?.lat && coords?.lng) {
        return new window.kakao.maps.LatLng(coords.lat, coords.lng);
      }
    } catch {
      return null;
    }

    return null;
  },

  /**
   * 복원 가능한 위치가 있으면 리턴, 없으면 현재 위치 리턴
   *
   * @param draftKey localStorage key
   * @returns 지도 초기화에 필요한 latlng, location 정보
   */
  resolveInitialLocation: async (
    draftKey: string | null,
  ): Promise<{
    latlng: KakaoLatLng;
    location: KakaoReverseGeocodePlaceType;
  }> => {
    const restored = await kakaoMapService.restoreSavedLocation(draftKey);

    if (restored) {
      toast.success("임시 저장된 위치가 복원되었습니다");
      return {
        latlng: restored,
        location: await kakaoMapService.reverseGeocode(restored),
      };
    }

    const current = await kakaoMapService.getCurrentLatLng();
    return {
      latlng: current,
      location: await kakaoMapService.reverseGeocode(current),
    };
  },

  /**
   * 지도 & 마커를 초기화하고 저장된 위치 또는 현재 위치를 반영
   *
   * @param container 지도를 렌더링할 HTML 요소
   * @param onMapClick 위치 변경 시 실행할 콜백
   * @param draftKey localStorage key
   * @returns 초기 map, marker, location 정보
   */
  initMapWithSession: async (
    container: HTMLDivElement,
    onMapClick: (loc: KakaoReverseGeocodePlaceType) => void,
    draftKey: string | null,
  ): Promise<{
    map: KakaoMap;
    marker: KakaoMarker;
    location: KakaoReverseGeocodePlaceType;
  }> => {
    await kakaoMapService.waitForKakaoMapLoad();

    const { latlng, location } =
      await kakaoMapService.resolveInitialLocation(draftKey);

    const map = kakaoMapService.createMap(container, latlng);
    const marker = kakaoMapService.createMarker(map, latlng);

    kakaoMapService.bindMapClick(map, async (clickedLatLng) => {
      marker.setPosition(clickedLatLng);
      const clickedLocation =
        await kakaoMapService.reverseGeocode(clickedLatLng);
      toast.success("위치가 변경되었습니다");
      onMapClick(clickedLocation);
    });

    onMapClick(location);

    return { map, marker, location };
  },
};
