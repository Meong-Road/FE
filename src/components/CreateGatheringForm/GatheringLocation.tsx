import React, { useState } from "react";

import MapSearchBar from "@/components/Map/_components/MapSearchBar";
import MapView from "@/components/Map/_components/MapView";
import { LocationType } from "@/lib/types/location"; // type 협의 필요 (리뷰에 같은 이름의 타입이 있음)

import { useLocationForm } from "../Map/_hooks/useLocationForm";

export default function GatheringLocation() {
  const [selectedPlace, setSelectedPlace] =
    useState<kakao.maps.services.PlaceType | null>(null);
  const [location, setLocation] = useState<LocationType | null>(null);

  useLocationForm(location);

  return (
    <section>
      <MapSearchBar onSelect={setSelectedPlace} />
      <MapView place={selectedPlace} setLocation={setLocation} />
    </section>
  );
}
