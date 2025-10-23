import { Modal as BaseModal } from "./Modal";
import { ModalBreedSelect } from "./ModalBreedSelect";
import { ModalCloseBtn } from "./ModalCloseBtn";
import { ModalContent } from "./ModalContent";
import { ModalDateSelect } from "./ModalDateSelect";
import { ModalTitle } from "./ModalTitle";

export const Modal = Object.assign(BaseModal, {
  Content: ModalContent,
  CloseBtn: ModalCloseBtn,
  Title: ModalTitle,
  DateSelect: ModalDateSelect,
  BreedSelect: ModalBreedSelect,
});
