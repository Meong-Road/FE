import { NextResponse } from "next/server";

import { rawsToGeocode } from "@/lib/utils/geocoding/mappers";
import { ncpHeaders } from "@/lib/utils/geocoding/ncp";

export async function GET(req: Request) {
  const inputAddr = new URL(req.url).searchParams.get("q") ?? "";
  const query = inputAddr.trim();

  if (query.length < 2) {
    return NextResponse.json({ items: [] });
  }

  const url = `https://maps.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: ncpHeaders(), cache: "no-store" });

  if (!res.ok) {
    return;
  }

  const data = await res.json();
  const items = rawsToGeocode(data?.addresses ?? []);

  return NextResponse.json({ items });
}
