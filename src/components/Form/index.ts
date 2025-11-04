import { Form as BaseForm } from "./Form";
import { FormBreedSelect } from "./FormBreedSelect";
import { Checkbox } from "./FormCheckbox";
import { FormComboboxSelect } from "./FormComboboxSelect";
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
import { FormRatingInput as RatingInput } from "./FormRatingInput";
import { Select } from "./FormSelect";
import { SignupLink } from "./FormSignupLink";
import { SocialButtons } from "./FormSocialButtons";
import { SubmitButton } from "./FormSubmitButton";
import { Textarea } from "./FormTextarea";
import { Title } from "./FormTitle";
import { FormYearSelect } from "./FormYearSelect";

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
  ComboboxSelect: FormComboboxSelect,
  BreedSelect: FormBreedSelect,
  YearSelect: FormYearSelect,
  ImageUpload,
  Radio,
  RatingInput,
  DuplicateCheckButton,
  Textarea,
  Checkbox,
});

export * from "./types";
