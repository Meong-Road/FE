import { useEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";

import { storageUtils } from "@/lib/utils/storage";

import { useDebounce } from "../useDebounce";

import {
  QuickGatheringFormSchema,
  RegularGatheringFormSchema,
} from "./schemas";

interface UseGatheringAutoSaveOptions {
  form: UseFormReturn<QuickGatheringFormSchema | RegularGatheringFormSchema>;
  type: "quick" | "regular";
  enabled?: boolean;
}

export function useGatheringAutoSave({
  form,
  type,
  enabled,
}: UseGatheringAutoSaveOptions) {
  const hasRestoredRef = useRef(false);
  const skipSaveRef = useRef(true); // 복원 직후 자동저장 막기

  useEffect(() => {
    if (!enabled) return;

    hasRestoredRef.current = false;
    skipSaveRef.current = true;

    const storageKey = `gathering-draft-${type}`;
    const savedData = storageUtils.getItem(storageKey);
    console.log("[autoSave] restore effect run", { type });
    console.log("[autoSave] savedData from storage", savedData);

    if (!savedData) {
      // 저장된 데이터가 없으면 바로 저장 허용
      skipSaveRef.current = false;
      console.log("[autoSave] no saved data, allowing save immediately");
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
      console.log(`${type} 모임 작성 내용이 자동으로 복원되었습니다.`);

      // 1.5초 뒤부터 저장 허용
      setTimeout(() => {
        skipSaveRef.current = false;
        console.log("[autoSave] now allowing save again");
      }, 1500);
    } else {
      skipSaveRef.current = false;
    }
  }, [enabled, form, type]);

  const { watch } = form;
  const formData = watch();

  const debouncedFormData = useDebounce(formData, { delay: 1000, enabled });

  useEffect(() => {
    if (!enabled) return;
    if (skipSaveRef.current) return; // 복원 직후에는 저장 금지

    const hasContent = Object.values(debouncedFormData).some((value) => {
      if (typeof value === "string") return value.trim() !== "";
      if (typeof value === "boolean") return true;
      if (typeof value === "number") return value > 0;
      if (Array.isArray(value)) return value.length > 0;
      if (value instanceof File) return true;
      if (typeof value === "object" && value !== null)
        return Object.values(value).some((v) => v !== null && v !== undefined);
      return value !== null && value !== undefined;
    });

    if (hasContent) {
      const storageKey = `gathering-draft-${type}`;
      storageUtils.setItem(storageKey, debouncedFormData);
      console.log(`${type} 모임 작성 내용이 자동저장되었습니다.`);
    }
  }, [debouncedFormData, enabled, type]);

  const clearDraft = () => {
    const storageKey = `gathering-draft-${type}`;
    storageUtils.removeItem(storageKey);
  };

  return { clearDraft };
}
