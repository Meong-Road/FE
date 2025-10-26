"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { gatheringApi } from "@/api/gatherings";
import { PostGatheringReq } from "@/api/types/gatherings";
import { PATH } from "@/lib/constants/path";
import { EGatheringType } from "@/lib/types/gatherings";
import { storageUtils } from "@/lib/utils/storage";

import { QUERY_KEYS } from "../queryKey";

export function usePostGathering() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (gathering: PostGatheringReq) =>
      gatheringApi.postGathering(gathering),
    onSuccess: (data) => {
      if (data.success) {
        const gatheringType =
          data.result.type === EGatheringType.QUICK ? "quick" : "regular";
        storageUtils.removeItem(`gathering-draft-${gatheringType}`);

        const messeageType =
          data.result.type === EGatheringType.QUICK ? "번개" : "정기";
        toast.success(`${messeageType} 모임 생성에 성공했습니다`);

        const redirectPath =
          data.result.type === EGatheringType.QUICK ? PATH.QUICK : PATH.REGULAR;
        router.push(`${redirectPath}/${data.result.id}`);
      }

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.gatherings.all(),
      });
    },
    onError: (error) => {
      console.error("모임 생성 실패", error);
      toast.error("모임 생성 중 오류가 발생했습니다");
    },
  });
}
