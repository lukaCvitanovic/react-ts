import { ReactElement } from "react";
import { createPortal } from "react-dom";

const ModalPortal = ({ children }: { children: ReactElement }) => {
    const targetElement = document.getElementById('modal-root');
    return (targetElement ? createPortal(children, targetElement) : null);
};

export default ModalPortal;