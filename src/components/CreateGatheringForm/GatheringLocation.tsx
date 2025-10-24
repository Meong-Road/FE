import React, { useState } from "react";

import AddrSearchBar from "@/components/Map/_components/AddrSearchBar";
import KakaoMap from "@/components/Map/_components/KakaoMap";

export default function GatheringLocation() {
  const [input, setInput] = useState("");

  return (
    <section>
      <AddrSearchBar onSearch={setInput} />
      <KakaoMap input={input} />
    </section>
  );
}
