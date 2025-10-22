import { GeocodedItem } from "../types/geocode";

async function geocode(query: string): Promise<GeocodedItem[]> {
  const res = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("");

  const data = await res.json();
  return Array.isArray(data?.items) ? (data.items as GeocodedItem[]) : [];
}

export async function getTopGeocode(
  query: string,
): Promise<GeocodedItem | null> {
  const items = await geocode(query);
  return items[0] ?? null;
}
