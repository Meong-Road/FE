"use client";

import { useEffect, useRef } from "react";

import { kakaoMapService } from "@/components/Map/_services/kakaoMapService";
import { Card } from "@/components/ui/card";

interface GatheringLocationSectionProps {
  locationPayload: string; // '{"district":"중구","latlng":{"lat":37.5653736,"lng":126.9787885}}'
}

export default function GatheringLocationSection({
  locationPayload,
}: GatheringLocationSectionProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    kakaoMapService.createStaticMap(mapRef.current, locationPayload);
  }, [locationPayload]);

  return (
    <section className="mb-12">
      <div className="mb-2 ml-2 text-lg font-semibold">위치</div>
      <Card
        className="px-7 py-7"
        ref={mapRef}
        style={{ width: "100%", height: "350px" }}
      ></Card>
    </section>
  );
}
