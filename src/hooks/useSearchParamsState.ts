"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

interface UseSearchParamsStateOptions {
  [key: string]: string;
}

export function useSearchParamsState(defaults: UseSearchParamsStateOptions) {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const result: Record<string, string> = {};

    for (const [key, defaultValue] of Object.entries(defaults)) {
      result[key] = searchParams.get(key) ?? defaultValue;
    }

    return result;
  }, [searchParams, defaults]);
}
