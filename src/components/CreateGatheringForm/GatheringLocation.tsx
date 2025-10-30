import React, { useState } from "react";

import MapSearchBar from "@/components/Map/_components/MapSearchBar";
import MapView from "@/components/Map/_components/MapView";

import { useLocationForm } from "../Map/_hooks/useLocationForm";

export default function GatheringLocation() {
  const [selectedPlace, setSelectedPlace] =
    useState<kakao.maps.services.PlaceType | null>(null);
  const [location, setLocation] =
    useState<kakao.maps.services.ReverseGeocodePlaceType | null>(null);

  useLocationForm(location);

  return (
    <section>
      <MapSearchBar onSelect={setSelectedPlace} />
      <MapView place={selectedPlace} setLocation={setLocation} />
    </section>
  );
}
