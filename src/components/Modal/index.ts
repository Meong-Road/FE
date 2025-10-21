import AuthRequiredModal from "./AuthRequiredModal";
import { Modal as BaseModal } from "./Modal";
import { ModalBreedSelect } from "./ModalBreedSelect";
import { ModalCloseBtn } from "./ModalCloseBtn";
import { ModalContent } from "./ModalContent";
import { ModalDateSelect } from "./ModalDateSelect";
import { ModalTitle } from "./ModalTitle";

export const Modal = Object.assign(BaseModal, {
  Title: ModalTitle,
  BreedSelect: ModalBreedSelect,
  Content: ModalContent,
  DateSelect: ModalDateSelect,
  CloseBtn: ModalCloseBtn,
  AuthRequired: AuthRequiredModal,
});
