export interface RawGeocodeItem {
  x: string;
  y: string;
  roadAddress: string;
  jibunAddress: string;
}

export interface GeocodedAddressType {
  lat: number;
  lon: number;
  roadAddress: string;
  jibunAddress: string;
  district: string;
}

// 역지오코딩 API Res는 지번 주소만
export interface ReverseGeocodedAddressType {
  jibunAddress: string;
  district: string;
}

export interface GetReverseGeocodeReq {
  lat: number;
  lon: number;
}

// 완전하지 않음 작동은 함
export interface GetReverseGeocodeRes {
  region: {
    area1: { name: string };
    area2: { name: string };
    area3: { name: string };
    area4: { name: string };
  };
  land: {
    number1: string;
    number2: string;
  };
}

export interface Coord {
  lat: () => number;
  lng: () => number;
}

export interface NaverMap {
  setCenter: (pos: unknown) => void;
  setZoom: (level: number, animated?: boolean) => void;
}

export interface NaverMarker {
  setPosition: (pos: unknown) => void;
}

export interface NaverMapNS {
  Map: new (el: HTMLElement, options?: Record<string, unknown>) => NaverMap;
  LatLng: new (lat: number, lon: number) => unknown;
  Marker: new (options: { position: unknown; map: NaverMap }) => NaverMarker;
  Event: {
    addListener: (
      map: NaverMap,
      eventName: string,
      handler: (e: { coord: unknown }) => void,
    ) => void;
  };
}
