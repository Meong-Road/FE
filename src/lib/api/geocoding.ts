import {
  GeocodedAddressType,
  GetReverseGeocodeReq,
  ReverseGeocodedAddressType,
} from "../types/geocodings";

async function geocode(query: string): Promise<GeocodedAddressType[]> {
  const res = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("");

  const data = await res.json();
  return Array.isArray(data?.items)
    ? (data.items as GeocodedAddressType[])
    : [];
}

export async function getTopGeocode(
  query: string,
): Promise<GeocodedAddressType | null> {
  const items = await geocode(query);
  return items[0] ?? null;
}

export async function getReverseGeocode(
  req: GetReverseGeocodeReq,
): Promise<ReverseGeocodedAddressType | null> {
  const { lat, lon } = req;
  const res = await fetch(`/api/reverse-geocode?lat=${lat}&lon=${lon}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("");

  const data = await res.json();
  return Array.isArray(data?.items)
    ? ((data.items[0] as ReverseGeocodedAddressType) ?? null)
    : null;
}
