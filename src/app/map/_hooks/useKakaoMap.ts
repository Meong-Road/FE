import { useEffect, useRef } from "react";

import { kakaoMapRepository } from "../_repositories/kakaoMapRepository";
import { kakaoMapService } from "../_services/kakaoMapService";

interface Props {
  mapRef: React.RefObject<HTMLDivElement | null>;
  input: string;
}

export default function useKakaoMap({ mapRef, input }: Props) {
  const map = useRef<kakao.maps.Map>(null);
  const places = useRef<kakao.maps.services.Places>(null);
  const markers = useRef<kakao.maps.Marker[]>([]);

  const clearMarkers = () => {
    markers.current.forEach((m) => m.setMap(null));
    markers.current = [];
  };

  useEffect(() => {
    if (!window.kakao || !mapRef.current) return;

    window.kakao.maps.load(() => {
      map.current = kakaoMapService.createMap(mapRef.current);
      places.current = kakaoMapService.createPlaces();

      kakaoMapService.bindMapClick(map.current, (latlng) => {
        clearMarkers();

        const newMarker = kakaoMapService.createMarker(map.current!, latlng);
        markers.current.push(newMarker);

        kakaoMapRepository.reverseGeocode(latlng).then((addr) => {
          console.log("lat/lng:", latlng.getLat(), latlng.getLng());
          console.log("도로명:", addr.road);
          console.log("지번:", addr.jibun);
        });
      });
    });
  }, []);

  useEffect(() => {
    if (!input || !places.current || !map.current) return;

    kakaoMapRepository.search(input, places.current).then((results) => {
      if (!results) return;

      clearMarkers();

      const bounds = new window.kakao.maps.LatLngBounds();

      results.forEach((place) => {
        const pos = new window.kakao.maps.LatLng(
          Number(place.y),
          Number(place.x),
        );
        const marker = kakaoMapService.createMarker(map.current!, pos);

        kakaoMapService.bindMarkerClick(marker, markers);
        markers.current.push(marker);

        bounds.extend(pos);
      });

      if (map.current) {
        map.current.setBounds(bounds);
      }
    });
  }, [input]);
}
