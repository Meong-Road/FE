import { useEffect, useMemo, useRef } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";

import { storageUtils } from "@/lib/utils/storage";

import { useDebounce } from "../useDebounce";

import {
  QuickGatheringFormSchema,
  RegularGatheringFormSchema,
} from "./schemas";

type GatheringFormData = QuickGatheringFormSchema | RegularGatheringFormSchema;

interface UseGatheringAutoSaveOptions {
  form: UseFormReturn<GatheringFormData>;
  type: "quick" | "regular";
  enabled?: boolean;
}

export function useGatheringAutoSave({
  form,
  type,
  enabled,
}: UseGatheringAutoSaveOptions) {
  const hasRestoredRef = useRef(false);
  const skipSaveRef = useRef(true); // 복원 직후 자동저장 제한
  const previousDateRef = useRef<GatheringFormData | null>(null);

  useEffect(() => {
    if (!enabled) return;

    hasRestoredRef.current = false;
    skipSaveRef.current = true;
    previousDateRef.current = null;

    const storageKey = `gathering-draft-${type}`;
    const savedData = storageUtils.getItem(storageKey);

    if (!savedData) {
      // 저장된 데이터가 없으면 바로 저장 허용
      skipSaveRef.current = false;
      return;
    }

    const hasSavedContent = Object.values(savedData).some((value) => {
      if (typeof value === "string") return value.trim() !== "";
      if (typeof value === "boolean") return true;
      if (typeof value === "number") return value > 0;
      if (Array.isArray(value)) return value.length > 0;
      if (value instanceof File) return true;
      if (typeof value === "object" && value !== null)
        return Object.values(value).some((v) => v !== null && v !== undefined);
      return value !== null && value !== undefined;
    });

    if (hasSavedContent) {
      form.reset(savedData);
      hasRestoredRef.current = true;
      skipSaveRef.current = true; // 복원 직후 저장 금지

      // 1.5초 뒤부터 저장 허용
      setTimeout(() => {
        skipSaveRef.current = false;
      }, 1500);
    } else {
      skipSaveRef.current = false;
    }
  }, [enabled, form, type]);

  // 필요한 필드만 useWatch로 관찰
  const watched = useWatch({
    control: form.control,
    name: [
      "capacity",
      "dateTime",
      "days",
      "description",
      "isPetRequired",
      "location",
      "name",
      "registrationEnd",
    ],
  });
  const signature = useMemo(() => JSON.stringify(watched), [watched]);
  const debouncedSignature = useDebounce(signature, { delay: 1000, enabled });

  // 데이터가 살제로 변경되었는지 확인하는 함수
  const hasDataChanged = (
    current: GatheringFormData,
    previous: GatheringFormData | null,
  ) => {
    if (!previous) return true;

    // 이미지 필드는 제외하고 비교
    const { image: _currentImage, ...currentWithoutImage } = current;
    const { image: _previousImage, ...previousWithoutImage } = previous;

    return (
      JSON.stringify(currentWithoutImage) !==
      JSON.stringify(previousWithoutImage)
    );
  };

  useEffect(() => {
    if (!enabled) return;
    if (skipSaveRef.current) return; // 복원 직후에는 저장 금지

    // 최신 값을 읽어 비교하고 저장
    const current = form.getValues();

    if (!hasDataChanged(current, previousDateRef.current)) return;

    const { image: _image, ...dataToSave } = current;

    const hasContent = Object.values(dataToSave).some((value) => {
      if (typeof value === "string") return value.trim() !== "";
      if (typeof value === "boolean") return true;
      if (typeof value === "number") return value > 0;
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === "object" && value !== null)
        return Object.values(value).some((v) => v !== null && v !== undefined);
      return value !== null && value !== undefined;
    });

    if (hasContent) {
      const storageKey = `gathering-draft-${type}`;
      storageUtils.setItem(storageKey, dataToSave);
      previousDateRef.current = current;
    }
  }, [debouncedSignature, enabled, form, type]);

  const clearDraft = () => {
    const storageKey = `gathering-draft-${type}`;
    storageUtils.removeItem(storageKey);
    previousDateRef.current = null;
  };

  return { clearDraft };
}
