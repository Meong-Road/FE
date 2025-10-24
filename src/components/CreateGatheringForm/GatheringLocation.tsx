import React, { useState } from "react";

import AddrSearchBar from "@/app/map/_components/AddrSearchBar";
import KakaoMap from "@/app/map/_components/KakaoMap";

export default function GatheringLocation() {
  const [input, setInput] = useState("");

  return (
    <section>
      <AddrSearchBar onSearch={setInput} />
      <KakaoMap input={input} />
    </section>
  );
}
