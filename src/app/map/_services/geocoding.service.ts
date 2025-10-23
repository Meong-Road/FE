import {
  GeocodedAddressType,
  GetReverseGeocodeRes,
  RawGeocodeItem,
  ReverseGeocodedAddressType,
} from "@/app/map/_types/geocodings";

import { getGeocode } from "../_repositories/geocoding.repository";

function extractDistrict(address: string): string {
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

export function rawToGeocode(raw: RawGeocodeItem): GeocodedAddressType {
  const lat = Number(raw.y);
  const lon = Number(raw.x);
  const roadAddress: string = raw.roadAddress;
  const jibunAddress: string = raw.jibunAddress;
  const district: string = extractDistrict(roadAddress);

  return { lat, lon, roadAddress, jibunAddress, district };
}

export function rawsToGeocode(raws: RawGeocodeItem[]): GeocodedAddressType[] {
  return raws.map(rawToGeocode);
}

export async function getTopGeocode(
  query: string,
): Promise<GeocodedAddressType | null> {
  const items = await getGeocode(query);
  return items[0] ?? null;
}

export async function searchAddress(
  query: string,
): Promise<GeocodedAddressType | null> {
  if (query.length < 2) return null;

  return await getTopGeocode(query);
}

// 완전하지 않음 작동은 함
export function reverseGeocodeToAddress(
  raw: GetReverseGeocodeRes,
): ReverseGeocodedAddressType | null {
  const area1 = raw?.region?.area1?.name; // 서울특별시, 전라남도
  const area2 = raw?.region?.area2?.name; // 강남구, 광양시
  const area3 = raw?.region?.area3?.name; // 역삼동, 광양읍
  const area4 = raw?.region?.area4?.name; // 읍내리

  const num1 = raw?.land?.number1; // 토지 본번호
  const num2 = raw?.land?.number2; // 토지 부번호

  if (!area1 || area1 !== "서울특별시") return null;

  const addressParts = [area1, area2, area3, area4].filter(Boolean);
  const jibunAddress = `${addressParts.join(" ")} ${num1}${num2 ? "-" + num2 : ""}`;

  return {
    jibunAddress,
    district: area2,
  };
}
