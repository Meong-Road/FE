import { useRouter } from "next/navigation";

interface UseHisToryNavigationOptions {
  preventBackNavigation?: boolean;
}

export function useHistoryNavigation(
  options: UseHisToryNavigationOptions = {},
) {
  const router = useRouter();
  const { preventBackNavigation = false } = options;

  /**
   * 뒤로가기 방지 && 이전 페이지로 이동
   */
  const navigateBack = () => {
    if (preventBackNavigation) {
      window.history.replaceState(null, "", window.location.href);
      router.back();
    } else router.back();
  };

  /**
   * 뒤로가기 방지 && 특정 경로로 이동
   * @param path 이동할 특정 경로
   */
  const navigateTo = (path: string) => {
    if (preventBackNavigation) {
      window.history.replaceState(null, "", window.location.href);
      router.push(path);
    } else router.push(path);
  };

  return {
    navigateBack,
    navigateTo,
  };
}
