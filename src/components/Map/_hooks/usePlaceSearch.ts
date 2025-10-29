import { kakaoMapService } from "../_services/kakaoMapService";

export function usePlaceSearch() {
  const placeSearch = async (input: string) => {
    const ps = new window.kakao.maps.services.Places();

    try {
      const results = await kakaoMapService.searchPlaces(input, ps);
      return results ?? [];
    } catch (error) {
      console.log("장소 검색 중 에러:", error);
      return [];
    }
  };

  return { placeSearch };
}
