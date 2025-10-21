import { EGatheringType, RegularGatheringType } from "@/lib/types/gatherings";
import { LocationType, ReviewScore, ReviewType } from "@/lib/types/reviews";

import { USERS } from "./users";

/**
 * @description
 * 고품질의 반려견 산책 모임 후기 mock 데이터입니다.
 */
export const mockReviews: ReviewType[] = [
  {
    id: 1,
    userId: 1,
    gatheringId: 1,
    score: 5,
    comment:
      "호스트님이 정말 친절하시고 리드를 잘해주셔서 어색함 없이 즐거웠어요! 저희 강아지도 새 친구들을 많이 사귀어서 신났네요 🐶❤️",
    createdAt: "2025-10-06T11:30:10.342Z",
    gathering: {
      id: 1,
      type: EGatheringType.REGULAR,
      name: "매주 주말, 서울숲 댕댕이 산책회",
      description:
        "서울숲의 상쾌한 공기를 마시며 반려견과 함께 힐링하는 시간을 가져요. 사회성 기르기에도 최고!",
      days: '["SAT", "SUN"]',
      location: "성동구",
      participantCount: 8,
      capacity: 15,
      image:
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=600&fit=crop",
      isPetRequired: true,
      isParticipating: true,
      canceledAt: null,
      registrationEnd: "2025-10-04T23:59:59.000Z",
      hostId: 10,
    },
    user: USERS[0],
  },
  {
    id: 2,
    userId: 2,
    gatheringId: 2,
    score: 4,
    comment:
      "좋은 분들과 함께해서 즐거웠어요. 다만 길이 조금 좁아서 대형견들은 조금 불편했을 수도 있겠네요.",
    createdAt: "2025-10-05T19:00:00.000Z",
    gathering: {
      id: 2,
      type: EGatheringType.REGULAR,
      name: "댕댕이와 함께하는 석촌호수 야간산책 🌙",
      description:
        "아름다운 석촌호수 야경을 보며 반려견과 낭만적인 밤 산책을 즐겨보세요.",
      days: '["WED"]',
      location: "송파구",
      participantCount: 5,
      capacity: 10,
      image:
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop",
      isPetRequired: true,
      isParticipating: true,
      canceledAt: null,
      registrationEnd: "2025-10-04T12:00:00.000Z",
      hostId: 11,
    },
    user: USERS[1],
  },
  {
    id: 3,
    userId: 3,
    gatheringId: 3,
    score: 5,
    comment:
      "에너지 넘치는 댕댕이들이 많아서 저희 집 쫄보도 덩달아 신나게 놀았어요! 다음에도 꼭 참여하고 싶습니다 👍",
    createdAt: "2025-10-04T17:30:00.000Z",
    gathering: {
      id: 3,
      type: EGatheringType.REGULAR,
      name: "에너자이저 댕댕이 모여라! 올림픽공원 달리기",
      description:
        "넓은 올림픽공원에서 마음껏 뛰어놀고 싶은 강아지들을 위한 정기 모임입니다. 스트레스 확 풀어요!",
      days: '["SAT"]',
      location: "송파구",
      participantCount: 12,
      capacity: 20,
      image:
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop",
      isPetRequired: true,
      isParticipating: true,
      canceledAt: null,
      registrationEnd: "2025-10-03T12:00:00.000Z",
      hostId: 12,
    },
    user: USERS[2],
  },
  {
    id: 4,
    userId: 4,
    gatheringId: 4,
    score: 3,
    comment:
      "날씨가 너무 더워서 강아지들이 힘들어했어요. 다음엔 좀 더 시원한 시간대에 모이면 좋겠습니다 🥵",
    createdAt: "2025-10-03T14:45:00.000Z",
    gathering: {
      id: 4,
      type: EGatheringType.REGULAR,
      name: "반포한강공원 피크닉 번개",
      description:
        "돗자리 펴고 맛있는 간식도 나눠먹고, 이야기도 나누는 힐링 번개 모임입니다.",
      days: '["FRI"]',
      location: "서초구",
      participantCount: 6,
      capacity: 12,
      image:
        "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800&h=600&fit=crop",
      isPetRequired: false,
      isParticipating: true,
      canceledAt: null,
      registrationEnd: "2025-10-02T23:59:00.000Z",
      hostId: 13,
    },
    user: USERS[3],
  },
  {
    id: 5,
    userId: 5,
    gatheringId: 5,
    score: 5,
    comment:
      "소규모로 진행되어서 더 좋았어요. 강아지들도 서로 금방 친해지고, 견주님들과도 깊은 대화를 나눌 수 있었습니다.",
    createdAt: "2025-10-02T20:00:00.000Z",
    gathering: {
      id: 5,
      type: EGatheringType.REGULAR,
      name: "[소형견 전용] 연남동 카페거리 소셜링",
      description:
        "5kg 미만 소형견 친구들 모여라! 연남동 카페거리에서 산책도 하고 펫프렌들리 카페에서 쉬어가요.",
      days: '["THU"]',
      location: "마포구",
      participantCount: 4,
      capacity: 6,
      image:
        "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800&h=600&fit=crop",
      isPetRequired: true,
      isParticipating: true,
      canceledAt: null,
      registrationEnd: "2025-10-01T23:59:00.000Z",
      hostId: 14,
    },
    user: USERS[4],
  },
  ...Array.from({ length: 15 }, (_, i) => {
    const id = i + 6;
    const locationNames = [
      "여의도한강공원",
      "북서울꿈의숲",
      "용산가족공원",
      "하늘공원",
      "선유도공원",
      "도산공원",
    ];
    const locationDistricts: LocationType[] = [
      "영등포구",
      "강북구",
      "용산구",
      "마포구",
      "영등포구",
      "강남구",
    ];
    const userNames = [
      "정수빈",
      "강지훈",
      "윤채원",
      "임도윤",
      "한유주",
      "신재이",
    ];
    const petNames = ["코코", "두부", "보리", "레오", "라떼", "밤비"];
    const gatheringTypes = [
      "포토 스팟 투어 📸",
      "노즈워크 산책",
      "어질리티 체험",
      "해질녘 노을 산책",
      "새벽 공기 마시기",
      "브런치 카페 번개",
    ];
    const gatheringImages = [
      "https://images.unsplash.com/photo-1541599468348-e96984315921?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&h=600&fit=crop",
    ];
    const profileImages = [
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1548142813-c348350df52b?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=200&h=200&fit=crop",
    ];
    const comments = [
      "시간 가는 줄 몰랐어요! 다음에 또 뵈어요~",
      "우리 강아지가 집에 와서 꿀잠 자네요. 엄청 만족스러웠나봐요!",
      "호스트님이 간식도 나눠주시고, 정말 감사했습니다!",
      "산책 코스가 정말 좋았어요. 처음 가보는 곳인데 마음에 쏙 드네요.",
      "조금 쌀쌀했지만 다들 매너도 좋으시고 따뜻한 시간이었습니다.",
      "다음에 또 모여요! 너무 즐거웠습니다 🐾",
    ];

    const day = 20 - i;
    const dayStr = String(day).padStart(2, "0");
    const hour = 10 + (i % 8);
    const hourStr = String(hour).padStart(2, "0");
    const gatheringDate = new Date(`2025-09-${dayStr}T${hourStr}:00:00.000Z`);
    const reviewDate = new Date(gatheringDate.getTime() + 24 * 60 * 60 * 1000); // 모임 다음 날 후기 작성

    const score = ((i % 4) + 2) as ReviewScore;

    const gathering: RegularGatheringType = {
      id,
      type: EGatheringType.REGULAR,
      name: `${locationNames[i % locationNames.length]} ${gatheringTypes[i % gatheringTypes.length]}`,
      description: "함께 산책하며 즐거운 추억을 만들어요.",
      days: '["SAT"]',
      location: locationDistricts[i % locationDistricts.length],
      participantCount: (i % 7) + 3,
      capacity: 10 + (i % 5),
      image: gatheringImages[i % gatheringImages.length],
      isPetRequired: i % 4 !== 0,
      isParticipating: i % 2 === 0,
      canceledAt: null,
      registrationEnd: new Date(
        gatheringDate.getTime() - 2 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      hostId: id,
    };

    return {
      id,
      userId: id,
      gatheringId: id,
      score,
      comment: comments[i % comments.length],
      createdAt: reviewDate.toISOString(),
      gathering,
      user: {
        id,
        email: `user${id}@test.com`,
        name: userNames[i % userNames.length],
        nickName: `${petNames[i % petNames.length]} 견주`,
        image: profileImages[i % profileImages.length],
        isPetInfoSubmitted: i % 3 !== 0,
        createdAt: `2025-09-${String(8 + (i % 10)).padStart(2, "0")}T08:00:00.000Z`,
        updatedAt: `2025-09-${String(9 + (i % 10)).padStart(2, "0")}T08:00:00.000Z`,
      },
    };
  }),
];
