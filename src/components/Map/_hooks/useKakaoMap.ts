import { useCallback, useEffect, useRef } from "react";

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

  /**
   * 지도에 표시된 모든 마커 제거
   */
  const clearMarkers = () => {
    markers.current.forEach((m) => m.setMap(null));
    markers.current = [];
  };

  /**
   * 지도 클릭 시 마커 생성 & 주소 조회
   * @param latlng 클릭한 좌표
   */
  const onMapClick = useCallback((latlng: kakao.maps.LatLng) => {
    clearMarkers();

    const newMarker = kakaoMapService.createMarker(map.current!, latlng);
    markers.current.push(newMarker);

    kakaoMapRepository.reverseGeocode(latlng).then((addr) => {
      console.log("lat/lng:", latlng.getLat(), latlng.getLng());
      console.log("도로명:", addr.road);
      console.log("지번:", addr.jibun);
    });
  }, []);

  /**
   * 키워드 검색 결과 마커 생성 & 지도 bounds 설정 (지도가 모든 마커들을 포함하도록)
   * @param results
   */
  const showSearchResults = useCallback(
    (results: kakao.maps.services.PlaceSearchRes[]) => {
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
    },
    [],
  );

  const resetMap = () => {
    if (!mapRef.current) return;

    clearMarkers();
    map.current = kakaoMapService.resetMap(mapRef.current, onMapClick);
  };

  /**
   * 초기 지도 및 서비스 오브젝트 생성, 지도 클릭 이벤트 등록
   */
  useEffect(() => {
    if (!window.kakao || !mapRef.current) return;

    window.kakao.maps.load(() => {
      map.current = kakaoMapService.createMap(mapRef.current!);
      places.current = kakaoMapService.createPlaces();

      kakaoMapService.bindMapClick(map.current, onMapClick);
    });
  }, [mapRef, onMapClick]);

  /**
   * 키워드 검색 수행
   */
  useEffect(() => {
    if (!input || !places.current || !map.current) return;

    kakaoMapRepository.search(input, places.current).then((results) => {
      if (results) {
        showSearchResults(results);
      }
    });
  }, [input, showSearchResults]);

  return {
    resetMap,
  };
}
