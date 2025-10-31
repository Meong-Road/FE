interface KaKaoMapNamespace {
  load(callback: () => void): void;
}

interface KakaoNamespace {
  maps: typeof kakao.maps & KaKaoMapNamespace;
}

declare global {
  interface Window {
    kakao: KakaoNamespace;
  }

  namespace kakao {
    namespace maps {
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

        interface PlaceType {
          id: string;
          address_name: string;
          place_name: string;
          road_address_name: string;
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
            callback: (data: PlaceType[], status: Status) => void,
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
        function addListener(
          target: unknown,
          type: string,
          handler: (...args: unknown[]) => void,
        ): void;
      }
    }
  }
}

export {};
