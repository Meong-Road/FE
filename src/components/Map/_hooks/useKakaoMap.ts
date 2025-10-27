import { useEffect, useRef } from "react";

import { kakaoMapService } from "../_services/kakaoMapService";

interface Props {
  mapRef: React.RefObject<HTMLDivElement | null>;
  place: kakao.maps.services.PlaceType | null;
}

export default function useKakaoMap({ mapRef, place }: Props) {
  const map = useRef<kakao.maps.Map | null>(null);
  const marker = useRef<kakao.maps.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current || map.current) return;

    window.kakao.maps.load(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const locPosition = new window.kakao.maps.LatLng(lat, lng);

        const onMapClick = (latlng: kakao.maps.LatLng) => {
          if (!marker.current) return;

          marker.current.setPosition(latlng);

          kakaoMapService.reverseGeocode(latlng).then((place) => {
            console.log("ReverseGeocodePlace:", place);
          });
        };

        const { map: initialMap, marker: initialMarker } =
          kakaoMapService.initializeMap(
            mapRef.current!,
            locPosition,
            onMapClick,
          );

        map.current = initialMap;
        marker.current = initialMarker;
      });
    });
  }, [mapRef]);

  useEffect(() => {
    if (!place || !map.current) return;

    const latlng = new window.kakao.maps.LatLng(
      Number(place.y),
      Number(place.x),
    );

    if (!marker.current) {
      marker.current = kakaoMapService.createMarker(map.current, latlng);
    } else {
      marker.current.setPosition(latlng);
    }

    map.current.setCenter(latlng);
  }, [place]);

  const resetMap = () => {
    if (!map.current || !marker.current) return;

    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const locPosition = new window.kakao.maps.LatLng(lat, lng);

      map.current!.setCenter(locPosition);
      marker.current!.setPosition(locPosition);
    });
  };

  return { resetMap };
}
