import { Form as BaseForm } from "./Form";
import { Control } from "./FormControl";
import { Description } from "./FormDescription";
import { Field } from "./FormField";
import { Input } from "./FormInput";
import { Item } from "./FormItem";
import { Label } from "./FormLabel";
import { Message } from "./FormMessage";
import { SubmitButton } from "./FormSubmitButton";

export const Form = Object.assign(BaseForm, {
  Field,
  Item,
  Label,
  Control,
  Description,
  Message,
  SubmitButton,
  Input,
});

export * from "./types";
