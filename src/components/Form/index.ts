import { Form as BaseForm } from "./Form";
import { Checkbox } from "./FormCheckbox";
import { Control } from "./FormControl";
import { Description } from "./FormDescription";
import { DuplicateCheckButton } from "./FormDuplicateCheckButton";
import { Field } from "./FormField";
import { ImageUpload } from "./FormImageUpload";
import { Input } from "./FormInput";
import { Item } from "./FormItem";
import { Label } from "./FormLabel";
import { LoginLink } from "./FormLoginLink";
import { Message } from "./FormMessage";
import { Radio } from "./FormRadio";
import { Select } from "./FormSelect";
import { SignupLink } from "./FormSignupLink";
import { SocialButtons } from "./FormSocialButtons";
import { SubmitButton } from "./FormSubmitButton";
import { Textarea } from "./FormTextarea";
import { Title } from "./FormTitle";

export const Form = Object.assign(BaseForm, {
  Field,
  Item,
  Label,
  Control,
  Description,
  Message,
  SubmitButton,
  Input,
  Title,
  SocialButtons,
  LoginLink,
  SignupLink,
  Select,
  ImageUpload,
  Radio,
  DuplicateCheckButton,
  Textarea,
  Checkbox,
});

export * from "./types";
