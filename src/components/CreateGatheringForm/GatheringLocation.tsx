import React, { useEffect, useState } from "react";

import MapSearchBar from "@/components/Map/_components/MapSearchBar";
import MapView from "@/components/Map/_components/MapView";
import { LocationType } from "@/lib/types/location"; // type 협의 필요

export default function GatheringLocation() {
  const [places, setPlaces] = useState<kakao.maps.services.PlaceType[] | []>(
    [],
  );
  const [location, setLocation] = useState<LocationType | null>(null);

  // debouncing 전 테스트용
  const top = places[0] ?? null;
  useEffect(() => {
    if (!top) return;
    console.log("top:", top);
  }, [top]);

  return (
    <section>
      <MapSearchBar onSearch={setPlaces} />
      <MapView place={top} setLocation={setLocation} />

      {/* temp */}
      {location && (
        <>
          <div>location: {location.district}</div>
          <div>
            lat/lng: {location.latlng.lat}, {location.latlng.lng}
          </div>
        </>
      )}
    </section>
  );
}
