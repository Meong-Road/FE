/**
 * 역지오코딩 결과 인터페이스
 */
interface ReverseGeocodeRes {
  road: string;
  jibun: string;
}

export const kakaoMapRepository = {
  /**
   * 키워드로 장소 검색
   * @param keyword 검색할 키워드
   * @param placesService 장소 검색 서비스 인스턴스
   * @returns 검색 결과 어레이 | null
   */
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

  /**
   * 역지오코딩 응답을 파싱해 도로명과 지번 주소 추출
   * @param result 역지오코딩 응답 데이터
   * @returns 파싱된 도로명과 지번 주소
   */
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

  /**
   * 좌표를 주소로
   * @param latlng 주소로 변환할 좌표
   * @returns 도로명/지번 주소 오브젝트
   */
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
