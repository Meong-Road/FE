import { LocationType } from "@/lib/types/location";

export const kakaoMapService = {
  mapPlaces(
    data: kakao.maps.services.PlaceType[],
  ): kakao.maps.services.PlaceType[] {
    return data.map((place) => ({
      address_name: place.address_name,
      place_name: place.place_name,
      road_address_name: place.road_address_name,
      x: place.x,
      y: place.y,
    }));
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

  updateToCurrLocation(
    map: kakao.maps.Map,
    marker: kakao.maps.Marker,
  ): Promise<LocationType> {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const locPosition = new window.kakao.maps.LatLng(lat, lng);

        map.setCenter(locPosition);
        marker.setPosition(locPosition);

        const place = await this.reverseGeocode(locPosition);
        resolve({ district: place.address, latlng: { lat, lng } });
      });
    });
  },

  /**
   * 초기 카카오 지도 생성
   * @param container 지도를 렌더링할 HTML 요소
   * @returns 지도 인스턴스
   */
  createMap(container: HTMLDivElement, center: kakao.maps.LatLng) {
    return new window.kakao.maps.Map(container, { center, level: 3 });
  },

  /**
   * 지정한 위치에 마커 생성
   * @param map 마커를 표시할 지도 인스턴스
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
   * 지도 클릭 시 좌표를 callback으로 전달하는 이벤트 바인딩
   * @param map 이벤트를 바인딩할 지도 인스턴스
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

  initMapWithCurrLocation(
    container: HTMLDivElement,
    onMapClick: (loc: LocationType) => void,
  ): Promise<{
    map: kakao.maps.Map;
    marker: kakao.maps.Marker;
    location: LocationType;
  }> {
    return new Promise((resolve) => {
      window.kakao.maps.load(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const locPosition = new window.kakao.maps.LatLng(lat, lng);

          const map = this.createMap(container, locPosition);
          const marker = this.createMarker(map, locPosition);

          const place = await this.reverseGeocode(locPosition);

          this.bindMapClick(map, async (latlng) => {
            marker.setPosition(latlng);

            const clickedPlace = await this.reverseGeocode(latlng);

            const newLocation: LocationType = {
              district: clickedPlace.address,
              latlng: {
                lat: latlng.getLat(),
                lng: latlng.getLng(),
              },
            };

            onMapClick(newLocation);
          });

          resolve({
            map,
            marker,
            location: {
              district: place.address,
              latlng: { lat, lng },
            },
          });
        });
      });
    });
  },
};
