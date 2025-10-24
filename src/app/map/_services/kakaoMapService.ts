const DEFAULT_CENTER = {
  // 서울시청 좌표
  lat: 37.5666805,
  lng: 126.9784147,
};

export const kakaoMapService = {
  /**
   * 초기 카카오 지도 생성
   * @param container 지도를 렌더링할 HTML 요소
   * @returns 지도 인스턴스
   */
  createMap(container: HTMLDivElement) {
    const center = new window.kakao.maps.LatLng(
      DEFAULT_CENTER.lat,
      DEFAULT_CENTER.lng,
    );
    return new window.kakao.maps.Map(container, { center, level: 3 });
  },

  /**
   * 지정한 위치에 마커 생성
   * @param map 마커를 표시할 지도 인스턴스
   * @param position 마커 좌표
   * @returns 마커 인스턴스
   */
  createMarker(map: kakao.maps.Map, position: kakao.maps.LatLng) {
    return new window.kakao.maps.Marker({ map, position });
  },

  /**
   * @returns: 장소 검색 서비스 인스턴스
   */
  createPlaces() {
    return new window.kakao.maps.services.Places();
  },

  /**
   * 마커 클릭 시 다른 마커들 제거하고 현재만 유지하는 이벤트 바인딩
   * @param marker 이벤트를 바인딩할 마커
   * @param markersRef 현재 마커 목록
   */
  bindMarkerClick(
    marker: kakao.maps.Marker,
    markersRef: React.RefObject<kakao.maps.Marker[]>,
  ) {
    window.kakao.maps.event.addListener(marker, "click", () => {
      markersRef.current.forEach((m) => {
        if (m !== marker) m.setMap(null);
      });
      markersRef.current = [marker];
    });
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
};
