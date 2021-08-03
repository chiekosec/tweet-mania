import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ModalWrapper from "./modal-wrapper";

const Modal = ({ children, selector, hC }) => {
  const modalRoot = document.querySelector(selector);
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current);

    return () => modalRoot.removeChild(elRef.current);
  }, [modalRoot]);

  return createPortal(
    <ModalWrapper hC={hC}>{children}</ModalWrapper>,
    elRef.current
  );
};

export default Modal;
