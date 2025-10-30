import { Modal as BaseModal } from "./Modal";
import { ModalCloseBtn } from "./ModalCloseBtn";
import { ModalContent } from "./ModalContent";
import { ModalTitle } from "./ModalTitle";

export const Modal = Object.assign(BaseModal, {
  Content: ModalContent,
  CloseBtn: ModalCloseBtn,
  Title: ModalTitle,
});
