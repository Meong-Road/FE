import { GeocodedItem } from "@/lib/types/geocode";

export function extractDistrict(address: string): string {
  /**
   * 서울특별시 강남구 논현로 565 휴먼터치빌 -> "강남구"
   * 서울특별시 강남구 역삼동 606-18 휴먼터치빌 -> "강남구"
   */
  const parts = address.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return parts[1];
  } else {
    return "";
  }
}

export function normalizeAddress(raw: {
  x: string;
  y: string;
  roadAddress: string;
  jibunAddress: string;
}): GeocodedItem {
  const lat = Number(raw.y);
  const lon = Number(raw.x);
  const roadAddress: string = raw.roadAddress;
  const jibunAddress: string = raw.jibunAddress;
  const district: string = extractDistrict(roadAddress);

  return { lat, lon, roadAddress, jibunAddress, district };
}

export function normalizeAddresses(
  raws: {
    x: string;
    y: string;
    roadAddress: string;
    jibunAddress: string;
  }[],
): GeocodedItem[] {
  return raws.map(normalizeAddress);
}
