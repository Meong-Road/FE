import React from "react";
import { UseFormReturn } from "react-hook-form";

import {
  QuickGatheringFormSchema,
  useQuickGatheringForm,
} from "@/hooks/gathering/useQuickGatheringForm";
import {
  RegularGatheringFormSchema,
  useRegularGatheringForm,
} from "@/hooks/gathering/useRegularGatheringForm";

import { Form } from "../Form";

import GatheringActions from "./GatheringActions";
import GatheringBasicInfo from "./GatheringBasicInfo";
import GatheringDetails from "./GatheringDetails";
import GatheringLocation from "./GatheringLocation";

interface CreateGatheringFormProps {
  type: "quick" | "regular";
  onCancel: () => void;
  onSubmit: (
    data: QuickGatheringFormSchema | RegularGatheringFormSchema,
  ) => void;
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
      form={
        form as UseFormReturn<
          QuickGatheringFormSchema | RegularGatheringFormSchema
        >
      }
      onSubmit={onSubmit}
      className="bg-transparent !p-0"
    >
      <div className="flex flex-col gap-11">
        <GatheringBasicInfo />
        <GatheringLocation />
        <GatheringDetails type={type} />
        <GatheringActions
          onCancel={onCancel}
          form={
            form as UseFormReturn<
              QuickGatheringFormSchema | RegularGatheringFormSchema
            >
          }
        />
      </div>
    </Form>
  );
}
