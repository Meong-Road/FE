import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { KakaoReverseGeocodePlaceType } from "@/lib/types/kakao";

export function useLocationForm(location: KakaoReverseGeocodePlaceType | null) {
  const form = useFormContext();

  useEffect(() => {
    if (!location) return;

    const formatted = JSON.stringify(location);
    form.setValue("location", formatted);
  }, [location]);
}
