import React from "react";

import QuickDateTimeField from "./QuickDateTimeField";
import RegularDateTimeField from "./RegularDateTimeField";

interface GatheringDateTimeFieldProps {
  type: "quick" | "regular";
}

export default function GatheringDateTimeField({
  type,
}: GatheringDateTimeFieldProps) {
  if (type === "quick") {
    return <QuickDateTimeField />;
  } else {
    return <RegularDateTimeField />;
  }
}
