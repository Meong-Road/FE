const DEFAULT = {
  lat: 37.5666805,
  lng: 126.9784147,
};

export const kakaoMapService = {
  createMap(container: HTMLDivElement | null) {
    if (!container) {
      throw new Error("the container is null");
    }
    const center = new window.kakao.maps.LatLng(DEFAULT.lat, DEFAULT.lng);
    return new window.kakao.maps.Map(container, { center, level: 3 });
  },

  createMarker(map: kakao.maps.Map, position: kakao.maps.LatLng) {
    return new window.kakao.maps.Marker({ map, position });
  },

  createPlaces() {
    return new window.kakao.maps.services.Places();
  },

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
