import { useHistoryNavigation } from "../useHistoryNavigation";

export function useGatheringFormNavigation() {
  const { navigateBack, navigateTo } = useHistoryNavigation({
    preventBackNavigation: true,
  });

  /**
   * 모임 생성 중 나가기를 눌렀을 때, 뒤로가기를 방지
   */
  const handleCancel = () => {
    navigateBack();
  };

  /**
   * 모임 생성하기를 누르고 모임 생성이 성공했을 때, 뒤로가기를 방지하면서 생성한 모임 상세페이지로 이동
   * @param gatheringId 생성한 모임의 id
   * @param type 생성한 모임의 type
   */
  const handleSuccess = (gatheringId: number, type: "quick" | "regular") => {
    navigateTo(`gathering/${type}/${gatheringId}`);
  };

  return { handleCancel, handleSuccess };
}
