import { NextResponse } from "next/server";

import { reverseGeocodeToAddress } from "@/app/map/_services/mappers";
import { ncpHeaders } from "@/app/map/_services/ncp";

export async function GET(req: Request) {
  const urlObj = new URL(req.url);
  const lat = urlObj.searchParams.get("lat");
  const lon = urlObj.searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ items: [] });
  }

  const url = `https://maps.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${lon},${lat}&output=json&orders=roadaddr,addr`;
  const res = await fetch(url, {
    headers: ncpHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("API error", text);
    return;
  }

  const data = await res.json();
  const rawResults = data?.results ?? [];

  const items = rawResults.map(reverseGeocodeToAddress).filter(Boolean);

  return NextResponse.json({ items });
}
