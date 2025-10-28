import React, { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";

import {
  QuickGatheringFormSchema,
  RegularGatheringFormSchema,
} from "@/hooks/gathering/schemas";
import { useGatheringAutoSave } from "@/hooks/gathering/useGatheringAutoSave";
import { useQuickGatheringForm } from "@/hooks/gathering/useQuickGatheringForm";
import { useRegularGatheringForm } from "@/hooks/gathering/useRegularGatheringForm";
import { EGatheringType } from "@/lib/types/gatherings";

import { Form } from "../Form";

import GatheringActions from "./GatheringActions";
import GatheringBasicInfo from "./GatheringBasicInfo";
import GatheringDetails from "./GatheringDetails";
import GatheringLocation from "./GatheringLocation";

type GatheringFormSchema =
  | QuickGatheringFormSchema
  | RegularGatheringFormSchema;

interface CreateGatheringFormProps {
  type: EGatheringType;
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

  const form = useMemo(() => {
    return type === EGatheringType.QUICK ? quickForm : regularForm;
  }, [type, quickForm, regularForm]);

  useGatheringAutoSave({
    form: form as UseFormReturn<GatheringFormSchema>,
    type: type === EGatheringType.QUICK ? "quick" : "regular",
    enabled: true,
  });

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
          type={type}
        />
      </div>
    </Form>
  );
}
