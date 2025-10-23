import { Coord, NaverMap, NaverMarker } from "../_types/geocodings";

export function createMapInstance(container: HTMLElement): NaverMap {
  const naver = window.naver;
  if (!naver) throw new Error("Naver Map script is not loaded yet.");

  return new naver.maps.Map(container, {
    center: new naver.maps.LatLng(37.5666805, 126.9784147),
    zoom: 16,
  });
}

export function setPosition(map: NaverMap, lat: number, lon: number) {
  const naver = window.naver;
  if (!naver) throw new Error("Naver Map script is not loaded yet.");

  const pos = new naver.maps.LatLng(lat, lon);
  map.setCenter(pos);
  map.setZoom(16, true);

  return pos;
}

export function createMarker(map: NaverMap, pos: unknown): NaverMarker {
  const naver = window.naver;
  if (!naver) throw new Error("Naver Map script is not loaded yet.");

  return new naver.maps.Marker({
    position: pos,
    map,
  });
}

export function updateMarkerPos(marker: NaverMarker, pos: unknown): void {
  marker.setPosition(pos);
}

export function setupMapClickHandler(
  map: NaverMap,
  onSelect: (lat: number, lon: number, rawCoord: unknown) => void,
): void {
  const naver = window.naver;
  if (!naver) throw new Error("Naver Map script is not loaded yet.");

  naver.maps.Event.addListener(map, "click", (e: { coord: unknown }) => {
    if (!e.coord) return;

    const coord = e.coord as Coord;
    const lat = coord.lat();
    const lon = coord.lng();
    onSelect(lat, lon, e.coord);
  });
}
