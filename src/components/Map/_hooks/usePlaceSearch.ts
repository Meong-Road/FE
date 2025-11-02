import { useCallback, useState } from "react";

import { KakaoSearchedPlaceType } from "@/lib/types/kakao";

import { kakaoMapService } from "../_services/kakaoMapService";

export function usePlaceSearch() {
  const [results, setResults] = useState<KakaoSearchedPlaceType[]>([]);

  const search = useCallback(async (keyword: string) => {
    if (!keyword.trim()) return;

    const ps = new window.kakao.maps.services.Places();
    const places = await kakaoMapService.searchPlaces(keyword, ps);
    setResults(places || []);
  }, []);

  return { results, search };
}
