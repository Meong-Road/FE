declare global {
  interface Window {
    kakao: KakaoNamespace;
  }

  namespace kakao {
    namespace maps {
      function load(callback: () => void): void;

      class LatLng {
        constructor(lat: number, lng: number);
        getLat(): number;
        getLng(): number;
      }

      class Map {
        constructor(container: HTMLElement, options: unknown);
        setCenter(latlng: LatLng): void;
      }

      class Size {
        constructor(width: number, height: number);
      }

      class Point {
        constructor(x: number, y: number);
      }

      class MarkerImage {
        constructor(src: string, size: Size, options?: object);
      }

      class Marker {
        constructor(options: {
          map: Map;
          position: LatLng;
          image?: MarkerImage;
        });
        setMap(map: Map | null): void;
        setPosition(position: LatLng): void;
      }

      class CustomOverlay {
        constructor(options: {
          position: LatLng;
          content: string;
          yAnchor: number;
        });

        setMap(map: Map): void;
      }

      namespace services {
        enum Status {
          OK = "OK",
        }

        interface SearchedPlaceType {
          id: string;
          address_name: string;
          place_name: string;
          x: string;
          y: string;
        }

        interface ReverseGeocodePlaceType {
          address_name: string;
          region_1depth_name: string;
          region_2depth_name: string;
          latlng: {
            lat: number;
            lng: number;
          };
        }

        class Places {
          keywordSearch(
            keyword: string,
            callback: (data: SearchedPlaceType[], status: Status) => void,
          ): void;
        }

        class Geocoder {
          coord2Address(
            x: number,
            y: number,
            callback: (
              result: {
                address?: {
                  address_name: string;
                  region_1depth_name: string;
                  region_2depth_name: string;
                  region_3depth_name: string;
                  mountain_yn: string;
                  main_address_no: string;
                  sub_address_no: string;
                };
              }[],
              status: Status,
            ) => void,
          ): void;
        }
      }

      namespace event {
        interface MapClickEvent {
          latLng: kakao.maps.LatLng;
        }

        type MapClickHandler = (event: MapClickEvent) => void;

        function addListener(
          map: kakao.maps.Map,
          type: string,
          handler: MapClickHandler,
        ): void;
      }
    }
  }
}

export type KakaoLatLng = kakao.maps.LatLng;
export type KakaoMap = kakao.maps.Map;
export type KakaoSize = kakao.maps.Size;
export type KakaoPoint = kakao.maps.Point;
export type KakaoMarkerImage = kakao.maps.MarkerImage;
export type KakaoMarker = kakao.maps.Marker;
export type KakaoCustomOverlay = kakao.maps.CustomOverlay;

export type KakaoStatus = kakao.maps.services.Status;
export type KakaoSearchedPlaceType = kakao.maps.services.SearchedPlaceType;
export type KakaoReverseGeocodePlaceType =
  kakao.maps.services.ReverseGeocodePlaceType;
export type KakaoPlaces = kakao.maps.services.Places;
export type KakaoGeocoder = kakao.maps.services.Geocoder;

export type KakaoMapClickEvent = kakao.maps.event.MapClickEvent;
export type KakaoMapClickHandler = kakao.maps.event.MapClickHandler;

export type KakaoNamespace = typeof window.kakao;

export {};
