interface ReverseGeocodeRes {
  road: string;
  jibun: string;
}

export const kakaoMapRepository = {
  search(
    keyword: string,
    placesService: kakao.maps.services.Places,
  ): Promise<kakao.maps.services.PlaceSearchRes[] | null> {
    return new Promise((resolve) => {
      placesService.keywordSearch(keyword, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve(data);
        } else {
          resolve(null);
        }
      });
    });
  },

  parseResult(
    result: {
      road_address?: { address_name: string };
      address?: { address_name: string };
    }[] = [],
  ): ReverseGeocodeRes {
    return {
      road: result[0]?.road_address?.address_name || "없음",
      jibun: result[0]?.address?.address_name || "없음",
    };
  },

  reverseGeocode(latlng: kakao.maps.LatLng): Promise<ReverseGeocodeRes> {
    return new Promise((resolve) => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.coord2Address(
        latlng.getLng(),
        latlng.getLat(),
        (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            resolve(this.parseResult(result));
          } else {
            resolve({ road: "", jibun: "" });
          }
        },
      );
    });
  },
};
