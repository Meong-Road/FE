import React, { useEffect, useState } from "react";

import MapSearchBar from "@/components/Map/_components/MapSearchBar";
import MapView from "@/components/Map/_components/MapView";
import { LocationType } from "@/lib/types/location"; // type 협의 필요

export default function GatheringLocation() {
  const [selectedPlace, setSelectedPlace] =
    useState<kakao.maps.services.PlaceType | null>(null);
  const [location, setLocation] = useState<LocationType | null>(null);

  useEffect(() => {
    if (!selectedPlace) return;
    console.log("selectedPlace:", selectedPlace);
  }, [selectedPlace]);

  return (
    <section>
      <MapSearchBar onSelect={setSelectedPlace} />
      <MapView place={selectedPlace} setLocation={setLocation} />

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
