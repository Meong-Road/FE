import { useState } from "react";
import { Search } from "lucide-react";

import { Form } from "@/components/Form";

interface Props {
  onSearch: (input: string) => void;
}

export default function AddrSearchBar({ onSearch }: Props) {
  const [input, setInput] = useState("");

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
        />
        <button
          className="absolute top-1/2 right-4 -translate-y-1/2 text-[#737373]"
          onClick={() => onSearch(input)}
        >
          <Search size={20} />
        </button>
      </div>
    </div>
  );
}
