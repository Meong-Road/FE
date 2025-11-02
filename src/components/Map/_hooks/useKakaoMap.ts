import { useEffect, useRef } from "react";

import {
  KakaoMap,
  KakaoMarker,
  KakaoReverseGeocodePlaceType,
  KakaoSearchedPlaceType,
} from "@/lib/types/kakao";

import { kakaoMapService } from "../_services/kakaoMapService";

interface Props {
  mapRef: React.RefObject<HTMLDivElement | null>;
  place: KakaoSearchedPlaceType | null;
  setLocation: (loc: KakaoReverseGeocodePlaceType) => void;
}

export default function useKakaoMap({ mapRef, place, setLocation }: Props) {
  const map = useRef<KakaoMap | null>(null);
  const marker = useRef<KakaoMarker | null>(null);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current || map.current) return;

      try {
        const { map: m, marker: mk } =
          await kakaoMapService.initMapWithCurrLocation(
            mapRef.current,
            setLocation,
          );

        map.current = m;
        marker.current = mk;
      } catch (error) {
        console.log("지도 초기화 실패:", error);
      }
    };

    initMap();
  }, [setLocation]);

  useEffect(() => {
    if (!place || !map.current || !marker.current) return;

    try {
      kakaoMapService.moveMarkerToPlace(
        map.current,
        marker.current,
        place,
        setLocation,
      );
    } catch (error) {
      console.log("마커 이동 실패:", error);
    }
  }, [place, setLocation]);

  const resetMap = async () => {
    if (!map.current || !marker.current) return;

    try {
      const location = await kakaoMapService.updateToCurrLocation(
        map.current,
        marker.current,
      );
      setLocation(location);
    } catch (error) {
      console.log("위치 reset 실패:", error);
    }
  };

  return { resetMap };
}
