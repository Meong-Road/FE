import React, { useEffect, useState } from "react";

import MapSearchBar from "@/components/Map/_components/MapSearchBar";
import MapView from "@/components/Map/_components/MapView";

export default function GatheringLocation() {
  const [input, setInput] = useState("");
  const [places, setPlaces] = useState<kakao.maps.services.PlaceType[] | []>(
    [],
  );

  // debouncing 전 테스트용
  const top = places.length > 0 ? places[0] : null;
  useEffect(() => {
    if (places.length > 0) {
      console.log("top", top);
    }
  }, [top]);

  return (
    <section>
      <MapSearchBar input={input} setInput={setInput} onSearch={setPlaces} />
      <MapView place={top} />
    </section>
  );
}
