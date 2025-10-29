import { useEffect, useRef } from "react";

import { LocationType } from "@/lib/types/location";

import { kakaoMapService } from "../_services/kakaoMapService";

interface Props {
  mapRef: React.RefObject<HTMLDivElement | null>;
  place: kakao.maps.services.PlaceType | null;
  setLocation: (loc: LocationType) => void;
}

export default function useKakaoMap({ mapRef, place, setLocation }: Props) {
  const map = useRef<kakao.maps.Map | null>(null);
  const marker = useRef<kakao.maps.Marker | null>(null);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current || map.current) return;

      try {
        await kakaoMapService.waitForKakaoMapLoad();

        const {
          map: m,
          marker: mk,
          location,
        } = await kakaoMapService.initMapWithCurrLocation(
          mapRef.current,
          setLocation,
        );

        map.current = m;
        marker.current = mk;
        setLocation(location);
      } catch (error) {
        console.log("지도 초기화 실패:", error);
      }
    };

    initMap();
  }, [mapRef, setLocation]);

  useEffect(() => {
    if (!place || !map.current) return;

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
      const loc = await kakaoMapService.updateToCurrLocation(
        map.current,
        marker.current,
      );
      setLocation(loc);
    } catch (error) {
      console.log("위치 reset 실패:", error);
    }
  };

  return { resetMap };
}
