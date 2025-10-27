// src/mocks/handlers/gatherings.ts
import { http, HttpResponse } from "msw";

import { FULL_API_ENDPOINTS } from "@/lib/constants/endpoints";
import {
  CreateGatheringType,
  DayOfWeek,
  EGatheringType,
  GatheringType,
  QuickGatheringType,
  RegularGatheringType,
} from "@/lib/types/gatherings";

import { createPaginatedRes } from "../data/common";
import {
  GATHERING_DETAILS,
  isLikedSet,
  PARTICIPANTS,
  QUICK_GATHERINGS,
  REGULAR_GATHERINGS,
} from "../data/gatherings";
import { mockCurrentUser } from "../data/users";

export const gatheringsHandlers = [
  //================= 모임 목록 조회 ================================
  http.get(`${FULL_API_ENDPOINTS.GATHERING}/regular`, (req) => {
    const url = new URL(req.request.url);
    const page = url.searchParams.get("page");
    const size = url.searchParams.get("size");
    const location = url.searchParams.get("location");
    // TODO const sort = url.searchParams.get("sort");

    console.log("page", page);
    console.log("location", location);

    const filtered = location
      ? REGULAR_GATHERINGS.filter((g) => g.location === location)
      : REGULAR_GATHERINGS;

    return HttpResponse.json(
      createPaginatedRes(filtered, {
        page: Number(page),
        size: Number(size),
      }),
    );
  }),

  http.get(`${FULL_API_ENDPOINTS.GATHERING}/quick`, (req) => {
    const url = new URL(req.request.url);
    const page = url.searchParams.get("page");
    const size = url.searchParams.get("size");
    const location = url.searchParams.get("location");
    // TODO const sort = url.searchParams.get("sort");

    const filtered = location
      ? QUICK_GATHERINGS.filter((g) => g.location === location)
      : QUICK_GATHERINGS;

    return HttpResponse.json(
      createPaginatedRes(filtered, {
        page: Number(page),
        size: Number(size),
      }),
    );
  }),

  //================= 내가 만든 모임 목록 조회 ================================
  http.get(`${FULL_API_ENDPOINTS.GATHERING}/my`, (req) => {
    const url = new URL(req.request.url);
    const page = Number(url.searchParams.get("page")) || 0;
    const size = Number(url.searchParams.get("size")) || 10;

    // 현재 사용자(id: 1)가 만든 모임 (hostId가 1인 모임)
    const myGatherings = [
      ...REGULAR_GATHERINGS.filter((g) => g.hostId === 1),
      ...QUICK_GATHERINGS.filter((g) => g.hostId === 1),
    ];

    const start = page * size;
    const end = start + size;
    const paginated = myGatherings.slice(start, end);

    return HttpResponse.json({
      success: true,
      code: 0,
      message: "내가 만든 모임 조회 성공",
      result: {
        content: paginated,
        page,
        size,
        totalElements: myGatherings.length,
        totalPages: Math.ceil(myGatherings.length / size),
        last: end >= myGatherings.length,
      },
      errorCode: null,
    });
  }),

  //================= 참여한 모임 목록 조회 ================================
  http.get(`${FULL_API_ENDPOINTS.GATHERING}/joined`, (req) => {
    const url = new URL(req.request.url);
    const page = Number(url.searchParams.get("page")) || 0;
    const size = Number(url.searchParams.get("size")) || 10;

    // isParticipating이 true인 모임
    const joinedGatherings = [
      ...REGULAR_GATHERINGS.filter((g) => g.isParticipating),
      ...QUICK_GATHERINGS.filter((g) => g.isParticipating),
    ];

    const start = page * size;
    const end = start + size;
    const paginated = joinedGatherings.slice(start, end);

    return HttpResponse.json({
      success: true,
      code: 0,
      message: "참여한 모임 조회 성공",
      result: {
        content: paginated,
        page,
        size,
        totalElements: joinedGatherings.length,
        totalPages: Math.ceil(joinedGatherings.length / size),
        last: end >= joinedGatherings.length,
      },
      errorCode: null,
    });
  }),

  //================= 모임 참여 여부 조회 ================================
  http.get(`${FULL_API_ENDPOINTS.GATHERING}/:id/participation`, (req) => {
    const id = req.params.id;
    const gathering =
      REGULAR_GATHERINGS.find((g) => g.id === Number(id)) ??
      QUICK_GATHERINGS.find((g) => g.id === Number(id));

    if (!gathering)
      return HttpResponse.json({
        success: false,
        code: 404,
        message: "모임을 찾을 수 없습니다",
        result: null,
        errorCode: "NOT_FOUND",
      });

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "성공",
      result: { isParticipated: gathering.isParticipating },
      errorCode: null,
    });
  }),

  //================= 모임 참여 ================================
  http.post(`${FULL_API_ENDPOINTS.GATHERING}/:id/join`, (req) => {
    const id = req.params.id;
    const gathering =
      REGULAR_GATHERINGS.find((g) => g.id === Number(id)) ??
      QUICK_GATHERINGS.find((g) => g.id === Number(id));

    if (!gathering)
      return HttpResponse.json({
        success: false,
        code: 404,
        message: "모임을 찾을 수 없습니다",
        result: null,
        errorCode: "NOT_FOUND",
      });

    if (gathering.isParticipating)
      return HttpResponse.json({
        success: false,
        code: 400,
        message: "이미 참여한 모임입니다",
        result: null,
        errorCode: "ALREADY_JOINED",
      });

    if (gathering.hostId === Number(mockCurrentUser.id))
      return HttpResponse.json({
        success: false,
        code: 400,
        message: "주최자는 참여할 수 없습니다",
        result: null,
        errorCode: "HOST_CANNOT_JOIN",
      });

    gathering.isParticipating = true;
    gathering.participantCount += 1;

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "성공",
      result: "모임에 참여했습니다",
      errorCode: null,
    });
  }),

  //================= 모임 참여 취소 ================================
  http.post(`${FULL_API_ENDPOINTS.GATHERING}/:id/leave`, (req) => {
    const id = req.params.id;
    const gathering =
      REGULAR_GATHERINGS.find((g) => g.id === Number(id)) ??
      QUICK_GATHERINGS.find((g) => g.id === Number(id));

    if (!gathering)
      return HttpResponse.json({
        success: false,
        code: 404,
        message: "모임을 찾을 수 없습니다",
        result: null,
        errorCode: "NOT_FOUND",
      });

    if (!gathering.isParticipating)
      return HttpResponse.json({
        success: false,
        code: 400,
        message: "이미 참여하지 않은 모임입니다",
        result: null,
        errorCode: "NOT_JOINED",
      });

    if (gathering.hostId === Number(mockCurrentUser.id))
      return HttpResponse.json({
        success: false,
        code: 400,
        message: "주최자는 참여 취소할 수 없습니다",
        result: null,
        errorCode: "HOST_CANNOT_LEAVE",
      });

    gathering.isParticipating = false;
    gathering.participantCount -= 1;

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "성공",
      result: "모임 참여 취소했습니다",
      errorCode: null,
    });
  }),

  //================= 찜한 모임 목록 조회 ================================
  http.get(`${FULL_API_ENDPOINTS.GATHERING}/bookmarks`, (req) => {
    const url = new URL(req.request.url);
    const type = url.searchParams.get("type");
    const page = Number(url.searchParams.get("page")) || 0;
    const size = Number(url.searchParams.get("size")) || 10;
    // const sort = url.searchParams.get("sort") || "createdAt";

    let bookmarkedGatherings = [];

    if (type === EGatheringType.REGULAR) {
      bookmarkedGatherings = REGULAR_GATHERINGS.filter((gathering) =>
        isLikedSet.has(gathering.id.toString()),
      );
    } else {
      bookmarkedGatherings = QUICK_GATHERINGS.filter((gathering) =>
        isLikedSet.has(gathering.id.toString()),
      );
    }

    const endIndex = (page + 1) * size;
    const currentPageData = bookmarkedGatherings.slice(0, endIndex);
    const hasNext = endIndex < bookmarkedGatherings.length;

    return HttpResponse.json({
      success: true,
      code: 0,
      message: "성공",
      result: {
        content: currentPageData,
        page: page,
        size: size,
        totalElements: bookmarkedGatherings.length,
        totalPages: Math.ceil(bookmarkedGatherings.length / size),
        last: !hasNext,
      },
      errorCode: null,
    });
  }),
  //================= 모임 참가자 목록 조회 ================================
  http.get(`${FULL_API_ENDPOINTS.GATHERING}/:id/participants`, (req) => {
    const id = req.params.id;

    const gathering = GATHERING_DETAILS(Number(id));

    if (!gathering)
      return HttpResponse.json({
        success: false,
        code: 404,
        message: "모임을 찾을 수 없습니다",
        result: null,
        errorCode: "NOT_FOUND",
      });

    const url = new URL(req.request.url);
    const page = url.searchParams.get("page");
    const size = url.searchParams.get("size");
    // TODO const sort = url.searchParams.get("sort");

    const participants = gathering.isParticipating
      ? [
          {
            userId: mockCurrentUser.id,
            gatheringId: gathering.id,
            joinedAt: new Date().toISOString(),
            user: mockCurrentUser,
          },
          ...PARTICIPANTS(gathering.id),
        ]
      : PARTICIPANTS(gathering.id);

    return HttpResponse.json(
      createPaginatedRes(participants, {
        page: Number(page),
        size: Number(size),
      }),
    );
  }),
  //================= 모임 상세 조회 ================================
  http.get(`${FULL_API_ENDPOINTS.GATHERING}/:id`, (req) => {
    const id = req.params.id;

    const gathering = GATHERING_DETAILS(Number(id));

    if (!gathering)
      return HttpResponse.json({
        success: false,
        code: 404,
        message: "모임을 찾을 수 없습니다",
        result: null,
        errorCode: "NOT_FOUND",
      });

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "성공",
      result: gathering,
      errorCode: null,
    });
  }),

  //================= 모임 찜하기 상태 조회 ================================
  http.get(`${FULL_API_ENDPOINTS.GATHERING}/:id/bookmarks`, (req) => {
    const id = req.params.id;

    if (!id)
      return HttpResponse.json({
        success: false,
        code: 404,
        message: "모임을 찾을 수 없습니다",
        result: null,
        errorCode: "NOT_FOUND",
      });

    return HttpResponse.json({
      success: true,
      code: 200,
      message: "성공",
      result: { isLiked: isLikedSet.has(id as string) },
      errorCode: null,
    });
  }),

  //================= 모임 찜하기 ================================
  http.post(`${FULL_API_ENDPOINTS.GATHERING}/:id/bookmarks`, (req) => {
    const id = req.params.id;

    if (!id)
      return HttpResponse.json({
        success: false,
        code: 404,
        message: "모임을 찾을 수 없습니다",
        result: null,
        errorCode: "NOT_FOUND",
      });

    if (isLikedSet.has(id as string))
      return HttpResponse.json({
        success: false,
        code: 400,
        message: "이미 찜하였습니다",
        result: null,
        errorCode: "ALREADY_BOOKMARKED",
      });

    isLikedSet.add(id as string);
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "성공",
      result: { isLiked: true },
      errorCode: null,
    });
  }),

  //================= 모임 찜 해제 ================================
  http.delete(`${FULL_API_ENDPOINTS.GATHERING}/:id/bookmarks`, (req) => {
    const id = req.params.id;

    if (!id)
      return HttpResponse.json({
        success: false,
        code: 404,
        message: "모임을 찾을 수 없습니다",
        result: null,
        errorCode: "NOT_FOUND",
      });

    if (!isLikedSet.has(id as string))
      return HttpResponse.json({
        success: false,
        code: 400,
        message: "이미 찜하지 않았습니다",
        result: null,
        errorCode: "NOT_BOOKMARKED",
      });

    isLikedSet.delete(id as string);
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "성공",
      result: { isLiked: false },
      errorCode: null,
    });
  }),
  //================= 모임 생성 ================================
  http.post(`${FULL_API_ENDPOINTS.GATHERING}`, async (req) => {
    try {
      const body = (await req.request.json()) as CreateGatheringType;

      const maxId = Math.max(
        ...REGULAR_GATHERINGS.map((g) => g.id),
        ...QUICK_GATHERINGS.map((g) => g.id),
      );
      const newId = maxId + 1;

      const hostId = Number(mockCurrentUser.id);

      const baseGathering = {
        id: newId,
        name: body.name,
        description: body.description || "",
        registrationEnd: body.registrationEnd,
        location: body.location,
        participantCount: 0,
        capacity: body.capacity,
        image: body.image,
        isPetRequired: body.isPetRequired,
        isParticipating: false,
        canceledAt: null,
        hostId,
      };

      let newGathering: GatheringType;

      if (body.type === EGatheringType.QUICK) {
        newGathering = {
          ...baseGathering,
          type: EGatheringType.QUICK,
          dateTime: body.dateTime,
        } as QuickGatheringType;

        QUICK_GATHERINGS.push(newGathering as QuickGatheringType);
      } else if (body.type === EGatheringType.REGULAR) {
        newGathering = {
          ...baseGathering,
          type: EGatheringType.REGULAR,
          days: body.days as DayOfWeek[],
        } as RegularGatheringType;

        REGULAR_GATHERINGS.push(newGathering as RegularGatheringType);
      } else {
        return HttpResponse.json({
          success: false,
          code: 400,
          message: "잘못된 모임 타입입니다",
          result: null,
          errorCode: "INVALID_GATHERING_TYPE",
        });
      }

      return HttpResponse.json({
        success: true,
        code: 200,
        message: "모임이 성공적으로 생성되었습니다",
        result: newGathering,
        errorCode: null,
      });
    } catch {
      return HttpResponse.json({
        success: false,
        code: 400,
        message: "요청 데이터를 처리할 수 없습니다",
        result: null,
        errorCode: "INVALID_REQUEST_DATA",
      });
    }
  }),
];
