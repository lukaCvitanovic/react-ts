import { ReactElement } from "react";
import { Transition } from "react-transition-group";

type ModalType = {
    children: ReactElement,
    transitionFlag?: boolean
};

// TODO - implement modal transition via context

const Modal = ({ children, transitionFlag }: ModalType) => {
    const durationMS = 200;

    const transitionClasses = {
        unmounted: 'md:opacity-0',
        entering: 'md:opacity-70',
        entered: 'md:opacity-70',
        exiting: 'md:opacity-0',
        exited: 'md:opacity-0',
    };

    return (
        <Transition
            in={transitionFlag}
            timeout={durationMS}
        >
            {(state) => {
                const currentClass = `absolute inset-0 transition-opacity duration-200 md:bg-black ${transitionClasses[state]}`;
                return (
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className={currentClass}></div>
                        <div className="w-full h-full z-10">
                            {children}
                        </div>
                    </div>
                );
            }}
        </Transition>
    );
};

export default Modal;