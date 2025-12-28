"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface UseSearchParamsStateOptions {
  [key: string]: string | undefined;
}

export function useSearchParamsState(
  defaults: UseSearchParamsStateOptions = {},
) {
  console.log("useSearchParamsState");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const params = useMemo(() => {
    const result: Record<string, string | undefined> = { ...defaults };
    for (const key of searchParams.keys()) {
      const param = searchParams.get(key);
      if (param) result[key] = param;
    }
    return result;
  }, [defaults, searchParams]);

  const setParams = useCallback(
    (newParams: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(newParams).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return { params, setParams };
}
