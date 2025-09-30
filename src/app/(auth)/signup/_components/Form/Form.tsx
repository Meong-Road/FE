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
          "w-full max-w-xl min-w-sm space-y-6 rounded-md border border-gray-100 px-14 py-12",
          className,
        )}
        {...rest}
      >
        {children}
      </form>
    </FormProvider>
  );
}
