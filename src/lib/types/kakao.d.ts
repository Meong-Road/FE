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

      class LatLngBounds {
        extend(latlng: LatLng): void;
      }

      class Map {
        constructor(container: HTMLElement, options: unknown);
        setBounds(bounds: LatLngBounds): void;
      }

      class Marker {
        constructor(options: { map: Map; position: LatLng });
        setMap(map: Map | null): void;
      }

      namespace services {
        enum Status {
          OK = "OK",
          ERROR = "ERROR",
        }

        interface PlaceSearchRes {
          address_name: string;
          place_name: string;
          x: string;
          y: string;
        }

        class Places {
          keywordSearch(
            keyword: string,
            callback: (data: PlaceSearchRes[], status: Status) => void,
          ): void;
        }

        class Geocoder {
          coord2Address(
            x: number,
            y: number,
            callback: (
              result: {
                address?: { address_name: string };
                road_address?: { address_name: string };
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
