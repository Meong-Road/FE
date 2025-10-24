// temp page to test -> 삭제 예정
"use client";

import { useState } from "react";

import AddrSearchBar from "./_components/AddrSearchBar";
import KakaoMap from "./_components/KakaoMap";

export default function KakaoMapSearchPage() {
  const [input, setInput] = useState("");

  return (
    <div>
      <AddrSearchBar onSearch={setInput} />
      <KakaoMap input={input} />
    </div>
  );
}
