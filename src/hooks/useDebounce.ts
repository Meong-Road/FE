import { useEffect, useState } from "react";

interface UseDebounceOptions {
  delay: number;
  enabled?: boolean;
}

export function useDebounce<T>(value: T, options: UseDebounceOptions): T {
  const { delay = 500, enabled = true } = options;
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    if (!enabled) return;

    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay, enabled, value]);

  return debounceValue;
}
