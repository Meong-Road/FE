// src/mocks/handlers/gatherings.ts
import { http, HttpResponse } from "msw";

import { EGatheringType } from "@/lib/types/gathering";

import { PAGINATION_DATA } from "../data/common";
import {
  GATHERING_DETAILS,
  isLikedSet,
  QUICK_GATHERINGS,
  REGULAR_GATHERINGS,
} from "../data/gatherings";

export const gatheringsHandlers = [
  //================= 모임 목록 조회 ================================
  http.get("/api/gatherings", (req) => {
    const url = new URL(req.request.url);
    const type = url.searchParams.get("type");
    const pageSize = url.searchParams.get("pageSize");

    if (type === EGatheringType.QUICK) {
      return HttpResponse.json(
        PAGINATION_DATA(QUICK_GATHERINGS, {
          pageSize: Number(pageSize),
        }),
      );
    }
    return HttpResponse.json(
      PAGINATION_DATA(REGULAR_GATHERINGS, {
        pageSize: Number(pageSize),
      }),
    );
  }),

  //================= 모임 상세 조회 ================================
  http.get("/api/gatherings/:id", (req) => {
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
      result: GATHERING_DETAILS,
      errorCode: null,
    });
  }),

  //================= 모임 찜하기 상태 조회 ================================
  http.get("/api/gatherings/:id/bookmarks", (req) => {
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
      success: false,
      code: 404,
      message: "성공",
      result: { isLiked: isLikedSet.has(id as string) },
      errorCode: "NOT_FOUND",
    });
  }),

  //================= 모임 찜하기 ================================
  http.post("/api/gatherings/:id/bookmarks", (req) => {
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
      // ! 임시
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
  http.delete("/api/gatherings/:id/bookmarks", (req) => {
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
      // ! 임시
      return HttpResponse.json({
        success: false,
        code: 400,
        message: "이미 찜하지 않았습니다",
        result: null,
        errorCode: "NOT_BOOKMARKED",
      });

    isLikedSet.delete(id as string);
  }),

  http.get("/api/gatherings/:id", (req) => {
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
      result: GATHERING_DETAILS,
      errorCode: null,
    });
  }),
];
