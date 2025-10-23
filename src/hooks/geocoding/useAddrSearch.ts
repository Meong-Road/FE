import { useState } from "react";

import { getTopGeocode } from "@/lib/api/geocoding";
import { GeocodedAddressType } from "@/lib/types/geocodings";

export function useAddrSearch(onPick: (item: GeocodedAddressType) => void) {
  const [inputAddr, setInputAddr] = useState("");
  const [loading, setLoading] = useState(false);

  async function search() {
    const query = inputAddr.trim();
    if (query.length < 2) return;

    setLoading(true);

    try {
      const top = await getTopGeocode(query);
      if (!top) {
        console.log("Geocode 결과 없음");
        return;
      }
      console.log("주소: ", top);
      onPick(top);
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  }

  return { inputAddr, setInputAddr, loading, search };
}
