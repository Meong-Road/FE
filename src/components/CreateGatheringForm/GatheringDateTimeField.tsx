import React from "react";

import { EGatheringType } from "@/lib/types/gatherings";

import QuickDateTimeField from "./QuickDateTimeField";
import RegularDateTimeField from "./RegularDateTimeField";

interface GatheringDateTimeFieldProps {
  type: EGatheringType;
}

export default function GatheringDateTimeField({
  type,
}: GatheringDateTimeFieldProps) {
  if (type === EGatheringType.QUICK) {
    return <QuickDateTimeField />;
  } else {
    return <RegularDateTimeField />;
  }
}
