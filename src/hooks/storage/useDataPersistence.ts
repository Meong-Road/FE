import { useEffect } from "react";

import { storageUtils } from "@/lib/utils/storage";

import { useDebounce } from "../useDebounce";

interface UseDataPersistenceOptions<T> {
  storageKey: string;
  data?: T;
  enabled?: boolean;
  debounceMs?: number;
  storageType?: "localStorage" | "sessionStorage";
}

/**
 * 데이터 지속성 훅
 *
 * 폼 데이터나 사용자 입력을 자동으로 스토리지에 저장하고,
 * 필요시 저장된 데이터를 조회하거나 삭제할 수 있는 기능을 제공합니다.
 *
 * @template T - 저장할 데이터의 타입
 * @param options - 훅 설정 옵션
 * @param options.storageKey - 스토리지에 저장될 키 (필수)
 * @param options.data - 저장할 데이터
 * @param options.enabled - 자동 저장 활성화 여부 (기본값: true)
 * @param options.debounceMs - debounce 지연시간 (밀리초, 기본값: 500)
 * @param options.storageType - 사용할 스토리지 타입 (기본값: "localStorage")
 *
 * @returns 저장된 데이터 조회 및 삭제 함수를 포함한 객체
 * @returns getStoredData - 저장된 데이터를 조회하는 함수
 * @returns clearStoredData - 저장된 데이터를 삭제하는 함수
 *
 * @see {@link useDebounce} - debounce 기능을 위한 훅
 * @see {@link storageUtils} - 스토리지 작업을 위한 유틸리티
 */
export function useDataPersistence<T>({
  storageKey,
  data,
  enabled = true,
  debounceMs = 500,
  storageType = "localStorage",
}: UseDataPersistenceOptions<T>) {
  const debouncedData = useDebounce(data, {
    delay: debounceMs,
    enabled: enabled && !!data,
  });

  useEffect(() => {
    if (debouncedData)
      storageUtils.setItem(storageKey, debouncedData, storageType);
  }, [debouncedData, storageKey, storageType]);

  return {
    getStoredData: (): T | null =>
      storageUtils.getItem<T>(storageKey, storageType),
    clearStoredData: () => storageUtils.removeItem(storageKey, storageType),
  };
}
