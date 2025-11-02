import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

import { Form } from "@/components/Form";
import { useDebounce } from "@/hooks/useDebounce";

import { useOutsideClick } from "../_hooks/useOutsideClick";
import { usePlaceSearch } from "../_hooks/usePlaceSearch";

interface Props {
  onSelect: (place: kakao.maps.services.SearchedPlaceType) => void;
}

export default function MapSearchBar({ onSelect }: Props) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const debouncedInput = useDebounce(input, { delay: 500 });
  const { results, search } = usePlaceSearch();

  useEffect(() => {
    if (debouncedInput.trim()) {
      search(debouncedInput);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [debouncedInput, search]);

  useOutsideClick(dropdownRef, () => setOpen(false));

  const handleSelect = (place: kakao.maps.services.SearchedPlaceType) => {
    onSelect(place);
    setInput("");
    setOpen(false);
  };

  const handleFocus = () => {
    if (!open && debouncedInput.trim()) {
      setOpen(true);
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
            {results.length > 0 ? (
              results.map((result) => (
                <div
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className="cursor-pointer px-4 py-2 hover:bg-[#FFE59E]"
                >
                  <div>{result.place_name}</div>
                  <div className="text-[#737373]">{result.address_name}</div>
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
