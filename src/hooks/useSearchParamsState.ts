"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface UseSearchParamsStateOptions {
  [key: string]: string | undefined;
}

export function useSearchParamsState(
  defaults: UseSearchParamsStateOptions = {},
) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const params = useMemo(() => {
    const result: Record<string, string | undefined> = defaults;
    for (const key of searchParams.keys()) {
      const param = searchParams.get(key);
      if (param) result[key] = param;
    }
    return result;
  }, [searchParams, defaults]);

  const setParams = (newParams: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { params, setParams };
}
