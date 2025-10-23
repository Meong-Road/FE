import { NextResponse } from "next/server";

import { rawsToGeocode } from "@/app/map/_services/geocoding.service";
import { ncpHeaders } from "@/app/map/_utils/ncp";

export async function GET(req: Request) {
  const query = new URL(req.url).searchParams.get("q") ?? "";

  if (query.length < 2) {
    return NextResponse.json({ geocodedAddrs: [] });
  }

  const url = `https://maps.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: ncpHeaders(), cache: "no-store" });

  if (!res.ok) {
    const text = await res.text();
    console.error("API error", text);
    return;
  }

  const data = await res.json();
  const geocodedAddrs = rawsToGeocode(data?.addresses ?? []);

  return NextResponse.json({ geocodedAddrs });
}
