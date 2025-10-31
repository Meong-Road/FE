import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export function useLocationForm(
  location: kakao.maps.services.ReverseGeocodePlaceType | null,
) {
  const form = useFormContext();

  useEffect(() => {
    if (!location) return;

    const formatted = JSON.stringify(location);
    form.setValue("location", formatted);

    console.log("location:", location);
    console.log("백엔드 payload:", formatted);
  }, [location]);
}
