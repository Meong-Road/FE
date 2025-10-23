import React from "react";
import { UseFormReturn } from "react-hook-form";

import {
  QuickGatheringFormSchema,
  RegularGatheringFormSchema,
} from "@/hooks/gathering/schemas";
import { useQuickGatheringForm } from "@/hooks/gathering/useQuickGatheringForm";
import { useRegularGatheringForm } from "@/hooks/gathering/useRegularGatheringForm";

import { Form } from "../Form";

import GatheringActions from "./GatheringActions";
import GatheringBasicInfo from "./GatheringBasicInfo";
import GatheringDetails from "./GatheringDetails";
import GatheringLocation from "./GatheringLocation";

type GatheringFormSchema =
  | QuickGatheringFormSchema
  | RegularGatheringFormSchema;

interface CreateGatheringFormProps {
  type: "quick" | "regular";
  onCancel: () => void;
  onSubmit: (data: GatheringFormSchema) => void;
}

export default function CreateGatheringForm({
  type,
  onCancel,
  onSubmit,
}: CreateGatheringFormProps) {
  const quickForm = useQuickGatheringForm();
  const regularForm = useRegularGatheringForm();

  const form = type === "quick" ? quickForm : regularForm;

  return (
    <Form
      form={form as UseFormReturn<GatheringFormSchema>}
      onSubmit={onSubmit}
      className="bg-transparent !p-0"
    >
      <div className="flex flex-col gap-11">
        <GatheringBasicInfo />
        <GatheringLocation />
        <GatheringDetails type={type} />
        <GatheringActions
          onCancel={onCancel}
          form={form as UseFormReturn<GatheringFormSchema>}
        />
      </div>
    </Form>
  );
}
