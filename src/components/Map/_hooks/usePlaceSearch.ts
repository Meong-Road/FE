import { useCallback, useState } from "react";

import { kakaoMapService } from "../_services/kakaoMapService";

export function usePlaceSearch() {
  const [results, setResults] = useState<
    kakao.maps.services.SearchedPlaceType[]
  >([]);

  const search = useCallback(async (keyword: string) => {
    if (!keyword.trim()) return;

    const ps = new window.kakao.maps.services.Places();
    const places = await kakaoMapService.searchPlaces(keyword, ps);
    setResults(places || []);
  }, []);

  return { results, search };
}
