import {
  GeocodedAddressType,
  GetReverseGeocodeReq,
  ReverseGeocodedAddressType,
} from "../_types/geocodings";

export async function getGeocode(
  query: string,
): Promise<GeocodedAddressType[]> {
  const res = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("");

  const data = await res.json();
  return Array.isArray(data?.geocodedAddrs)
    ? (data.geocodedAddrs as GeocodedAddressType[])
    : [];
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
  return Array.isArray(data?.parsedAddrs)
    ? ((data.parsedAddrs[0] as ReverseGeocodedAddressType) ?? null)
    : null;
}
