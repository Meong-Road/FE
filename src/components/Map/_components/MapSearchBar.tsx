import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

import { Form } from "@/components/Form";
import { useDebounce } from "@/hooks/useDebounce";

import { kakaoMapService } from "../_services/kakaoMapService";

interface Props {
  onSelect: (place: kakao.maps.services.PlaceType) => void;
}

export default function MapSearchBar({ onSelect }: Props) {
  const [input, setInput] = useState("");
  const [places, setPlaces] = useState<kakao.maps.services.PlaceType[]>([]);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const debouncedInput = useDebounce(input, { delay: 500 });

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    const ps = new window.kakao.maps.services.Places();
    const results = await kakaoMapService.searchPlaces(query, ps);

    setPlaces(results || []);
    setOpen(true);
  };

  useEffect(() => {
    if (debouncedInput.trim()) {
      handleSearch(debouncedInput);
    }
  }, [debouncedInput]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        !(target instanceof HTMLElement && target.closest("input"))
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSelect = (place: kakao.maps.services.PlaceType) => {
    onSelect(place);
    setInput("");
    setOpen(false);
  };

  const handleFocus = () => {
    if (!open && debouncedInput.trim()) {
      handleSearch(debouncedInput);
    }
  };

  return (
    <div className="mb-4 flex gap-2">
      <Form.Label className="text-lg font-semibold whitespace-nowrap" required>
        모임 위치
      </Form.Label>

      <div className="relative w-full">
        <Form.Input
          type="text"
          placeholder="지번, 도로명, 건물명으로 검색"
          className="w-full rounded-xl bg-[#edf4fb] px-4 py-2 pr-10"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={handleFocus}
        />
        <Search
          className="absolute top-1/2 right-4 -translate-y-1/2 text-[#737373]"
          size={20}
        />

        {open && (
          <div
            ref={dropdownRef}
            className="absolute z-2 mt-2 max-h-80 min-w-full overflow-y-auto rounded-xl border bg-white shadow-md"
          >
            {places.length > 0 ? (
              places.map((place) => (
                <div
                  key={place.id}
                  onClick={() => handleSelect(place)}
                  className="cursor-pointer px-4 py-2 hover:bg-[#FFE59E]"
                >
                  <div>{place.place_name}</div>
                  <div className="text-[#737373]">{place.address_name}</div>
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-[#737373]">검색 결과가 없어요</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
