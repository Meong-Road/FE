import { useEffect, useState } from "react";

interface UseMinimumRenderingProps {
  minRenderTime?: number;
}

function useMinimumRendering({
  minRenderTime = 400,
}: UseMinimumRenderingProps) {
  const [isMinRenderTimePassed, setIsMinRenderTimePassed] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinRenderTimePassed(false);
    }, minRenderTime);

    return () => clearTimeout(timer);
  }, [minRenderTime]);

  return { isRendering: isMinRenderTimePassed };
}

export default useMinimumRendering;
