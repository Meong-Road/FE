"use client";

import * as React from "react";
import type { FieldValues } from "react-hook-form";
import { FormProvider } from "react-hook-form";

import { cn } from "@/lib/utils";

import type { FormRootProps } from "./types";

export function Form<TFieldValues extends FieldValues = FieldValues>(
  props: FormRootProps<TFieldValues>,
) {
  const { form, onSubmit, className, children, ...rest } = props;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className={cn(
          "bg-card w-full max-w-xl min-w-xs space-y-4 rounded-[40px] md:space-y-6",
          "p-7 md:p-14",
          className,
        )}
        {...rest}
      >
        {children}
      </form>
    </FormProvider>
  );
}
