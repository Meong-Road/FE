import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { LocationType } from "@/lib/types/location";

import { kakaoMapService } from "../_services/kakaoMapService";

export function useLocationForm(location: LocationType | null) {
  const form = useFormContext();

  useEffect(() => {
    if (!location) return;

    const formatted = kakaoMapService.formatLocation(location);
    form.setValue("location", formatted);

    console.log("location:", location);
    console.log("백엔드 payload:", formatted);
  }, [location]);
}
