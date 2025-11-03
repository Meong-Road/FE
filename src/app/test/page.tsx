"use client";

import { useSearchParamsState } from "@/hooks/useSearchParamsState";

function TestPage() {
  const { test, test2, test3, ...props } = useSearchParamsState({
    test: "test",
  });
  return (
    <div>
      {test} {test2} {test3}{" "}
      {...Object.entries(props).map(([key, value]) => (
        <div key={key}>
          {key}: {value}
        </div>
      ))}
    </div>
  );
}

export default TestPage;
