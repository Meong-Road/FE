import React from "react";
import { UseFormReturn } from "react-hook-form";

import {
  QuickGatheringFormSchema,
  RegularGatheringFormSchema,
} from "@/hooks/gathering/schemas";
import { cn } from "@/lib/utils";

import { Form } from "../Form";
import { Button } from "../ui/button";

interface GatheringActionsProps {
  onCancel: () => void;
  form: UseFormReturn<QuickGatheringFormSchema | RegularGatheringFormSchema>;
}

export default function GatheringActions({
  onCancel,
  form,
}: GatheringActionsProps) {
  return (
    <section className="mx-auto mt-27 flex w-1/2 items-center justify-center gap-6">
      <Button
        type="button"
        onClick={onCancel}
        className={cn(
          "h-12 flex-1",
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
        label="정기 모임 만들기"
        className="mt-0 flex-1"
        disabled={!form.formState.isValid}
      >
        정기 모임 만들기
      </Form.SubmitButton>
    </section>
  );
}
