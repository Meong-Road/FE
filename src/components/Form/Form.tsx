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
        className={cn("bg-card w-full space-y-4", "p-6 sm:p-12", className)}
        {...rest}
      >
        {children}
      </form>
    </FormProvider>
  );
}
