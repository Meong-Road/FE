import { NextResponse } from "next/server";

import { normalizeAddresses } from "@/lib/utils/map/geocoding";
import { ncpHeaders } from "@/lib/utils/map/ncp";

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
  const items = normalizeAddresses(data?.addresses ?? []);

  return NextResponse.json({ items });
}
