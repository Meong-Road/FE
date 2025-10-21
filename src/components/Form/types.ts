import type {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

export type FormRootProps<TFieldValues extends FieldValues = FieldValues> =
  Omit<React.ComponentProps<"form">, "onSubmit"> & {
    form: UseFormReturn<TFieldValues>;
    onSubmit: SubmitHandler<TFieldValues>;
  };
