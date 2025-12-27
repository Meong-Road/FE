"use client";

import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface UseSearchParamsStateOptions {
  [key: string]: string | undefined;
}

export function useSearchParamsState(
  defaults: UseSearchParamsStateOptions = {},
) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    const result: Record<string, string | undefined> = defaults;
    for (const key of searchParams.keys()) {
      const param = searchParams.get(key);
      if (param) result[key] = param;
    }
    return result;
  }, [searchParams, defaults]);

  const setParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      params.set(key, value);
    });
    window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
  };

  return { params, setParams };
}
