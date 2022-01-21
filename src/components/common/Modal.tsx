import { ReactElement } from "react";

type ModalType = {
    children: ReactElement
};

const Modal = ({ children }: ModalType) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div className="w-full h-full z-10">
                {children}
            </div>
        </div>
    );
};

export default Modal;