"use client";

import { useEffect, useRef } from "react";

import { getReverseGeocode } from "@/lib/api/geocoding";

type NaverMap = {
  setCenter: (pos: unknown) => void;
  setZoom: (level: number, animated?: boolean) => void;
};

type NaverMarker = {
  setPosition: (pos: unknown) => void;
};

type NaverMapNS = {
  Map: new (el: HTMLElement, options?: Record<string, unknown>) => NaverMap;
  LatLng: new (lat: number, lon: number) => unknown;
  Marker: new (options: { position: unknown; map: NaverMap }) => NaverMarker;
  Event: {
    addListener: (
      map: NaverMap,
      eventName: string,
      handler: (e: { coord: unknown }) => void,
    ) => void;
  };
};

declare global {
  interface Window {
    naver?: { maps: NaverMapNS };
  }
}

type Props = {
  lat: number | null;
  lon: number | null;
};

export function MapView({ lat, lon }: Props) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<NaverMap | null>(null);
  const markerRef = useRef<NaverMarker | null>(null);

  useEffect(() => {
    if (!boxRef.current || !window.naver?.maps) {
      return;
    }

    const { naver } = window;

    mapRef.current = new naver.maps.Map(boxRef.current, {
      center: new naver.maps.LatLng(37.5666805, 126.9784147),
      zoom: 16,
    });

    naver.maps.Event.addListener(
      mapRef.current,
      "click",
      async (e: { coord: unknown }) => {
        if (!e.coord) return;

        const coord = e.coord as { lat: () => number; lng: () => number };
        const lat = coord.lat();
        const lon = coord.lng();

        if (!markerRef.current) {
          markerRef.current = new naver.maps.Marker({
            position: e.coord,
            map: mapRef.current!,
          });
        } else {
          markerRef.current.setPosition(e.coord);
        }

        const result = await getReverseGeocode({ lat, lon });
        if (result) {
          console.log("역지오코딩 주소:", result);
        } else {
          console.log("주소 없음");
        }
      },
    );
  }, []);

  useEffect(() => {
    if (!window.naver?.maps || !mapRef.current) {
      return;
    }

    if (lat == null || lon == null) {
      return;
    }

    const { naver } = window;
    const pos = new naver.maps.LatLng(lat, lon);

    mapRef.current.setCenter(pos);
    mapRef.current.setZoom(16, true);

    if (!markerRef.current) {
      markerRef.current = new naver.maps.Marker({
        position: pos,
        map: mapRef.current,
      }) as NaverMarker;
    } else {
      markerRef.current.setPosition(pos);
    }
  }, [lat, lon]);

  return (
    <div
      ref={boxRef}
      className="w-full rounded-2xl border"
      style={{ height: 360 }}
    ></div>
  );
}
