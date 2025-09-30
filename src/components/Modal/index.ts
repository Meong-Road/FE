import { ModalBody } from "./ModalBody";
import { ModalClose } from "./ModalClose";
import { ModalContent } from "./ModalContent";
import { ModalFooter } from "./ModalFooter";
import { ModalHeader } from "./ModalHeader";
import { ModalOverlay } from "./ModalOverlay";
import { ModalPortal } from "./ModalPortal";
import { ModalRoot } from "./ModalRoot";

export {
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPortal,
  ModalRoot,
};

export const Modal = {
  Portal: ModalPortal,
  Root: ModalRoot,
  Overlay: ModalOverlay,
  Content: ModalContent,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  Close: ModalClose,
} as const;

export default Modal;
