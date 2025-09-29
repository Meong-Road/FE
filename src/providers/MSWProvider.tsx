"use client";

import { useEffect, useState } from "react";

import { initMocks } from "@/mocks";

export default function MSWProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMswReady, setMswReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initMocks();
      setMswReady(true);
    };

    if (!isMswReady) init();
  }, [isMswReady]);

  if (!isMswReady) return null;
  return <>{children}</>;
}
