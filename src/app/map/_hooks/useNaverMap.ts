import { useEffect, useRef } from "react";

import { getReverseGeocode } from "@/app/map/_repositories/geocoding.repository";

import {
  createMapInstance,
  createMarker,
  setPosition,
  setupMapClickHandler,
  updateMarkerPos,
} from "../_services/map.service";
import { NaverMap, NaverMarker } from "../_types/geocodings";

export function useNaverMap(lat: number | null, lon: number | null) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<NaverMap | null>(null);
  const markerRef = useRef<NaverMarker | null>(null);

  useEffect(() => {
    if (!boxRef.current) return;

    mapRef.current = createMapInstance(boxRef.current);

    setupMapClickHandler(mapRef.current, async (lat, lon, rawCoord) => {
      if (!markerRef.current) {
        markerRef.current = createMarker(mapRef.current!, rawCoord);
      } else {
        updateMarkerPos(markerRef.current, rawCoord);
      }

      const result = await getReverseGeocode({ lat, lon });
      console.log("역지오코딩 주소:", result ?? "없음");
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    if (lat == null || lon == null) return;

    const pos = setPosition(mapRef.current, lat, lon);

    if (!markerRef.current) {
      markerRef.current = createMarker(mapRef.current, pos);
    } else {
      updateMarkerPos(markerRef.current, pos);
    }
  }, [lat, lon]);

  return boxRef;
}
