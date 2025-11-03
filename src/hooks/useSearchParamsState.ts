"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

interface UseSearchParamsStateOptions {
  [key: string]: string | undefined;
}

export function useSearchParamsState(
  defaults: UseSearchParamsStateOptions = {},
) {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const result: Record<string, string | undefined> = defaults;

    for (const key of searchParams.keys()) {
      const param = searchParams.get(key);
      if (param) result[key] = param;
    }

    return result;
  }, [searchParams, defaults]);
}
