import React, { useState } from "react";

import MapSearchBar from "@/components/Map/_components/MapSearchBar";
import MapView from "@/components/Map/_components/MapView";
import {
  KakaoReverseGeocodePlaceType,
  KakaoSearchedPlaceType,
} from "@/lib/types/kakao";

import { useLocationForm } from "../Map/_hooks/useLocationForm";

export default function GatheringLocation() {
  const [selectedPlace, setSelectedPlace] =
    useState<KakaoSearchedPlaceType | null>(null);
  const [location, setLocation] = useState<KakaoReverseGeocodePlaceType | null>(
    null,
  );

  useLocationForm(location);

  return (
    <section>
      <MapSearchBar onSelect={setSelectedPlace} />
      <MapView place={selectedPlace} setLocation={setLocation} />
    </section>
  );
}
