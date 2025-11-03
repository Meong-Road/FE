import { useFormContext } from "react-hook-form";
import { renderHook } from "@testing-library/react";

import { KakaoReverseGeocodePlaceType } from "@/lib/types/kakao";

import { useLocationForm } from "../_hooks/useLocationForm";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn(),
}));

const mockSetValue = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  (useFormContext as jest.Mock).mockReturnValue({
    setValue: mockSetValue,
  });
});

describe("useLocationForm 훅 테스트", () => {
  test("location이 null인 경우 setValue가 호출되지 않아야 한다", () => {
    renderHook(() => useLocationForm(null));

    expect(mockSetValue).not.toHaveBeenCalled();
  });

  test("location이 유효한 경우 setValue가 JSON 문자열로 호출되어야 한다", () => {
    const mockLocation: KakaoReverseGeocodePlaceType = {
      address_name: "서울특별시 중구 태평로1가 31",
      region_1depth_name: "서울특별시",
      region_2depth_name: "중구",
      latlng: {
        lat: 37.56682420267543,
        lng: 126.978652258823,
      },
    };

    renderHook(() => useLocationForm(mockLocation));

    expect(mockSetValue).toHaveBeenCalled();
    expect(mockSetValue).toHaveBeenCalledWith(
      "location",
      JSON.stringify(mockLocation),
    );
  });

  test("location이 변경되면 useLocationForm이 다시 호출되어야 한다", () => {
    const mockInitialLocation: KakaoReverseGeocodePlaceType = {
      address_name: "서울 중구 태평로1가 31",
      region_1depth_name: "서울",
      region_2depth_name: "중구",
      latlng: {
        lat: 37.56682420267543,
        lng: 126.978652258823,
      },
    };

    const mockUpdatedLocation: KakaoReverseGeocodePlaceType = {
      address_name: "서울 중구 서소문동 143",
      region_1depth_name: "서울",
      region_2depth_name: "중구",
      latlng: {
        lat: 37.563120438716645,
        lng: 126.97522381133409,
      },
    };

    renderHook(() => useLocationForm(mockInitialLocation));
    expect(mockSetValue).toHaveBeenCalledTimes(1);

    renderHook(() => useLocationForm(mockUpdatedLocation));
    expect(mockSetValue).toHaveBeenCalledTimes(2);
  });
});
