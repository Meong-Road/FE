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
    if (!mapRef.current || map.current) return;

    window.kakao.maps.load(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const locPosition = new window.kakao.maps.LatLng(lat, lng);

        kakaoMapService.reverseGeocode(locPosition).then((place) => {
          setLocation({
            district: place.address,
            latlng: { lat, lng },
          });
        });

        const onMapClick = (latlng: kakao.maps.LatLng) => {
          if (!marker.current) return;

          marker.current.setPosition(latlng);

          kakaoMapService.reverseGeocode(latlng).then((place) => {
            // console.log("ReverseGeocodePlace:", place);
            setLocation({
              district: place.address,
              latlng: { lat: latlng.getLat(), lng: latlng.getLng() },
            });
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
  }, [mapRef, setLocation]);

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

    setLocation({
      district: place.address_name,
      latlng: { lat: Number(place.y), lng: Number(place.x) },
    });
  }, [place, setLocation]);

  const resetMap = () => {
    if (!map.current || !marker.current) return;

    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const locPosition = new window.kakao.maps.LatLng(lat, lng);

      map.current!.setCenter(locPosition);
      marker.current!.setPosition(locPosition);

      kakaoMapService.reverseGeocode(locPosition).then((place) => {
        setLocation({
          district: place.address,
          latlng: { lat, lng },
        });
      });
    });
  };

  return { resetMap };
}
