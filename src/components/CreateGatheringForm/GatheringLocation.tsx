import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import MapSearchBar from "@/components/Map/_components/MapSearchBar";
import MapView from "@/components/Map/_components/MapView";
import { LocationType } from "@/lib/types/location"; // type 협의 필요

function formatLocation(location: LocationType): string {
  const parts = location.district.split(" ");
  const district = parts[1]?.includes("구") ? parts[1] : "기타";

  return JSON.stringify({
    district,
    latlng: {
      lat: location.latlng.lat,
      lng: location.latlng.lng,
    },
  });
}

export default function GatheringLocation() {
  const form = useFormContext();
  const [selectedPlace, setSelectedPlace] =
    useState<kakao.maps.services.PlaceType | null>(null);
  const [location, setLocation] = useState<LocationType | null>(null);

  useEffect(() => {
    if (!location) return;

    const formatted = formatLocation(location);
    form.setValue("location", formatted);
  }, [location]);

  const currLocation = form.watch("location");

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
          <div>백엔드 payload:{currLocation}</div>
        </>
      )}
    </section>
  );
}
