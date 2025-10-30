import { toast } from "sonner";

import { LocationType } from "@/lib/types/location";

export const kakaoMapService = {
  /**
   * 카카오맵 SDK 로드
   */
  waitForKakaoMapLoad(): Promise<void> {
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
   * 카카오맵 데이터를 필요한 필드만 추출해 매핑
   * @param data 카카오맵 검색 결과
   * @returns 필터링된 데이터 어레이
   */
  mapPlaces(
    data: kakao.maps.services.PlaceType[],
  ): kakao.maps.services.PlaceType[] {
    return data.map((place) => ({
      id: place.id,
      address_name: place.address_name,
      place_name: place.place_name,
      road_address_name: place.road_address_name,
      x: place.x,
      y: place.y,
    }));
  },

  formatLocation(location: LocationType): string {
    const parts = location.district.split(" ");
    const district = parts[1]?.includes("구") ? parts[1] : "기타";

    return JSON.stringify({
      district,
      latlng: {
        lat: location.latlng.lat,
        lng: location.latlng.lng,
      },
    });
  },

  /**
   * 키워드로 장소 검색
   * @param keyword 검색할 키워드
   * @param ps 장소 검색 서비스 인스턴스
   * @returns 검색 결과 어레이
   */
  searchPlaces(
    keyword: string,
    ps: kakao.maps.services.Places,
  ): Promise<kakao.maps.services.PlaceType[]> {
    return new Promise((resolve) => {
      ps.keywordSearch(keyword, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve(
            this.mapPlaces(
              data as unknown as kakao.maps.services.PlaceType[], // ?
            ),
          );
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
  reverseGeocode(
    latlng: kakao.maps.LatLng,
  ): Promise<kakao.maps.services.ReverseGeocodePlaceType> {
    return new Promise((resolve) => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.coord2Address(
        latlng.getLng(),
        latlng.getLat(),
        (result, status) => {
          if (
            status === window.kakao.maps.services.Status.OK &&
            result.length > 0
          ) {
            const item = result[0];
            resolve({
              address: item.address?.address_name ?? "",
              road_address: item.road_address?.address_name ?? "",
              x: latlng.getLng().toString(),
              y: latlng.getLat().toString(),
            });
          } else {
            resolve({
              address: "",
              road_address: "",
              x: latlng.getLng().toString(),
              y: latlng.getLat().toString(),
            });
          }
        },
      );
    });
  },

  /**
   * 유저의 현재 위치로 맵과 마커를 이동시키고 위치 정보를 리턴
   * @param map 맵 인스턴스
   * @param marker 마커 인스턴스
   * @returns 현재 위치 정보
   */
  updateToCurrLocation(
    map: kakao.maps.Map,
    marker: kakao.maps.Marker,
  ): Promise<LocationType> {
    const DEFAULT_LOCATION = new window.kakao.maps.LatLng(
      37.566826,
      126.9786567,
    );

    const move = async (latlng: kakao.maps.LatLng): Promise<LocationType> => {
      map.setCenter(latlng);
      marker.setPosition(latlng);

      const place = await this.reverseGeocode(latlng);
      return {
        district: place.address,
        latlng: {
          lat: latlng.getLat(),
          lng: latlng.getLng(),
        },
      };
    };

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const locPosition = new window.kakao.maps.LatLng(lat, lng);

          const location = await move(locPosition);
          resolve(location);
        },
        async (error) => {
          toast.error("현재 위치를 가져올 수 없어 기본 위치로 이동합니다");

          const location = await move(DEFAULT_LOCATION);
          resolve(location);
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
  createMap(container: HTMLDivElement, center: kakao.maps.LatLng) {
    return new window.kakao.maps.Map(container, { center, level: 3 });
  },

  /**
   * 지정한 위치에 마커 생성
   * @param map 마커를 표시할 맵 인스턴스
   * @param position 마커 좌표
   * @returns 마커 인스턴스
   */
  createMarker(map: kakao.maps.Map, position: kakao.maps.LatLng) {
    const imageSrc = "/map-marker.svg"; // public 폴더 안에 있어야 한다고 합니다
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
  bindMapClick(
    map: kakao.maps.Map,
    callback: (latlng: kakao.maps.LatLng) => void,
  ) {
    window.kakao.maps.event.addListener(map, "click", (e: unknown) => {
      const event = e as { latLng: kakao.maps.LatLng };
      callback(event.latLng);
    });
  },

  /**
   * 클릭한 장소로 맵을 이동시키고 location 갱신
   * @param map 맵 인스턴스
   * @param marker 마커 인스턴스
   * @param place 이동할 장소
   * @param setLocation 위치 상태 갱신하는 함수
   * @returns
   */
  moveMarkerToPlace(
    map: kakao.maps.Map,
    marker: kakao.maps.Marker | null,
    place: kakao.maps.services.PlaceType,
    setLocation: (loc: LocationType) => void,
  ) {
    const latlng = new window.kakao.maps.LatLng(
      Number(place.y),
      Number(place.x),
    );
    if (!marker) return;

    marker.setPosition(latlng);
    map.setCenter(latlng);

    setLocation({
      district: place.address_name,
      latlng: { lat: Number(place.y), lng: Number(place.x) },
    });
  },

  /**
   * 현재 위치 기준으로 맵과 마커 초기화
   * @param container 맵을 렌더링할 HTML 요소
   * @param onMapClick 맵 클릭 시 실행할 콜백
   * @returns 맵, 마커, 위치 정보
   */
  initMapWithCurrLocation(
    container: HTMLDivElement,
    onMapClick: (loc: LocationType) => void,
  ): Promise<{
    map: kakao.maps.Map;
    marker: kakao.maps.Marker;
    location: LocationType;
  }> {
    const DEFAULT_LOCATION = new window.kakao.maps.LatLng(
      37.566826,
      126.9786567,
    );

    const setupMap = async (latlng: kakao.maps.LatLng) => {
      const map = this.createMap(container, latlng);
      const marker = this.createMarker(map, latlng);
      const place = await this.reverseGeocode(latlng);

      this.bindMapClick(map, async (clickedLatLng) => {
        marker.setPosition(clickedLatLng);
        const clickedPlace = await this.reverseGeocode(clickedLatLng);

        toast.success("위치가 변경되었습니다");

        onMapClick({
          district: clickedPlace.address,
          latlng: {
            lat: clickedLatLng.getLat(),
            lng: clickedLatLng.getLng(),
          },
        });
      });

      return {
        map,
        marker,
        location: {
          district: place.address,
          latlng: { lat: latlng.getLat(), lng: latlng.getLng() },
        },
      };
    };

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const locPosition = new window.kakao.maps.LatLng(lat, lng);

          const result = await setupMap(locPosition);
          resolve(result);
        },
        async (error) => {
          toast.error("현재 위치를 가져올 수 없습니다");

          const result = await setupMap(DEFAULT_LOCATION);
          resolve(result);
        },
      );
    });
  },
};
