import { useState } from "react";

import { GeocodedAddressType } from "@/app/map/_types/geocodings";

import { searchAddress } from "../_services/geocoding.service";

export function useAddrSearch(onPick: (address: GeocodedAddressType) => void) {
  const [inputAddr, setInputAddr] = useState("");
  const [loading, setLoading] = useState(false);

  async function search() {
    const query = inputAddr.trim();
    setLoading(true);

    try {
      const firstMatch = await searchAddress(query);
      if (!firstMatch) {
        console.log("Geocode 결과 없음");
        return;
      }
      console.log("주소: ", firstMatch);
      onPick(firstMatch);
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  }

  return { inputAddr, setInputAddr, loading, search };
}
