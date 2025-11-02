import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

import { Form } from "@/components/Form";
import { useDebounce } from "@/hooks/useDebounce";

import { useOutsideClick } from "../_hooks/useOutsideClick";
import { usePlaceSearch } from "../_hooks/usePlaceSearch";

import { MapSearchList } from "./MapSearchList";

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
    if (!debouncedInput.trim()) {
      setOpen(false);
      return;
    }

    search(debouncedInput);
    setOpen(true);
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

      <div ref={dropdownRef} className="relative w-full">
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

        {open && <MapSearchList results={results} onSelect={handleSelect} />}
      </div>
    </div>
  );
}
