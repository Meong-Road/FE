import React from "react";
import { UseFormReturn } from "react-hook-form";

import {
  QuickGatheringFormSchema,
  RegularGatheringFormSchema,
} from "@/hooks/gathering/schemas";
import { EGatheringType } from "@/lib/types/gatherings";
import { cn } from "@/lib/utils";

import { Form } from "../Form";
import { Button } from "../ui/button";

interface GatheringActionsProps {
  onCancel: () => void;
  form: UseFormReturn<QuickGatheringFormSchema | RegularGatheringFormSchema>;
  type: string;
}

export default function GatheringActions({
  onCancel,
  form,
  type,
}: GatheringActionsProps) {
  const gatheringType = type === EGatheringType.QUICK ? "번개" : "정기";

  return (
    <section className="mx-auto mt-12.5 flex w-1/2 items-center justify-center gap-6 sm:mt-27">
      <Button
        type="button"
        onClick={onCancel}
        className={cn(
          "h-12 min-w-32 flex-1",
          "border-primary border bg-white",
          "rounded-2xl",
          "text-primary text-base font-semibold md:text-lg",
          "select-none",
          "hover:bg-primary/5",
        )}
      >
        나가기
      </Button>
      <Form.SubmitButton
        label={`${gatheringType} 모임 만들기`}
        className="mt-0 flex-1"
        disabled={!form.formState.isValid}
      >
        {gatheringType} 모임 만들기
      </Form.SubmitButton>
    </section>
  );
}
