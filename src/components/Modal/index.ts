import { ModalBreedSelect } from "./ModalBreedSelect";
import { ModalButton } from "./ModalButton";
import { ModalDateSelect } from "./ModalDateSelect";
import { ModalForm } from "./ModalForm";
import { ModalFormWrapper } from "./ModalFormWrapper";
import { ModalImageUpload } from "./ModalImageUpload";
import { ModalLayout } from "./ModalLayout";
import { ModalRadioInput } from "./ModalRadioInput";
import { ModalSelect } from "./ModalSelect";
import { ModalTextInput } from "./ModalTextInput";
import { ModalTitle } from "./ModalTitle";

const Modal = {
  Layout: ModalLayout,
  Title: ModalTitle,
  Form: ModalForm,
  Button: ModalButton,
  BreedSelect: ModalBreedSelect,
  FormWrapper: ModalFormWrapper,
  ImageUpload: ModalImageUpload,
  RadioInput: ModalRadioInput,
  Select: ModalSelect,
  TextInput: ModalTextInput,
  DateSelect: ModalDateSelect,
};

export default Modal;
