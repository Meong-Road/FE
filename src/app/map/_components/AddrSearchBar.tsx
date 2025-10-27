import { useState } from "react";

interface Props {
  onSearch: (input: string) => void;
}

export default function AddrSearchBar({ onSearch }: Props) {
  const [input, setInput] = useState("");

  return (
    <div className="mb-4 flex gap-2">
      <input
        className="flex-1 rounded-2xl border px-4 py-2"
        placeholder="예: 마로니에공원"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="rounded-2xl bg-black px-4 py-2 text-white"
        onClick={() => onSearch(input)}
      >
        검색
      </button>
    </div>
  );
}
