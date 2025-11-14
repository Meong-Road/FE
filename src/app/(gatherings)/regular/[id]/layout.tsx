import { Metadata } from "next";
import { headers } from "next/headers";

import { gatheringApi } from "@/api/gatherings";
import { GatheringType } from "@/lib/types/gatherings";

interface LayoutProps {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

async function getSiteUrl(): Promise<string> {
  // 서버 사이드에서 요청 헤더로부터 호스트 가져오기
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";

  if (host) {
    return `${protocol}://${host}`;
  }

  // 환경 변수가 있으면 사용
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // 기본값 (프로덕션 URL)
  return "https://meong-road.site";
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { id } = await params;
  const siteUrl = await getSiteUrl();

  try {
    const response = await gatheringApi.getGathering({ id: Number(id) });
    const gathering = response.result as GatheringType;

    if (!gathering) {
      return {
        title: "멍로드 | 모임을 찾을 수 없습니다",
      };
    }

    const imageUrl = gathering.image
      ? gathering.image.startsWith("http")
        ? gathering.image
        : `${siteUrl}${gathering.image}`
      : `${siteUrl}/images/dog.svg`;

    const locationText = () => {
      try {
        const loc =
          typeof gathering.location === "string"
            ? JSON.parse(gathering.location)
            : gathering.location;
        return (
          loc?.region_2depth_name ||
          loc?.district ||
          loc?.address_name ||
          "위치 정보 없음"
        );
      } catch {
        return typeof gathering.location === "string"
          ? gathering.location
          : "위치 정보 없음";
      }
    };

    const description = gathering.description
      ? `${gathering.description.substring(0, 150)}${
          gathering.description.length > 150 ? "..." : ""
        }`
      : `${locationText()}에서 진행되는 ${gathering.name} 모임입니다.`;

    return {
      title: `${gathering.name} | 멍로드`,
      description,
      openGraph: {
        title: gathering.name,
        description,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: gathering.name,
          },
        ],
        type: "website",
        siteName: "멍로드",
        locale: "ko_KR",
      },
    };
  } catch {
    console.error("Failed to fetch gathering for metadata");
    return {
      title: "모임 상세 | 멍로드",
    };
  }
}

export default async function RegularGatheringDetailLayout({
  children,
}: LayoutProps) {
  return <>{children}</>;
}
