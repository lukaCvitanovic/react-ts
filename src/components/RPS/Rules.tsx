import rulesImg from '@/assets/images/RPS/image-rules.svg';
import ButtonRPS from '@/components/RPS/ButtonRPS';
import { Transition } from "react-transition-group";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type RulesProps = {
    onClose: Function,
    omitModalTransition?: Function,
};

const Rules = ({ onClose, omitModalTransition }: RulesProps) => {
    const [inProp, setInProp] = useState(false);
    useEffect(() => {
        if (omitModalTransition) omitModalTransition(true);
        setInProp(true);
    }, []);

    const closeModalTransition = () => {
        if (omitModalTransition) omitModalTransition(false);
        setInProp(false);
    };

    const closeModalButton = () => {
        return (
            <ButtonRPS
                variant="gray"
                onClick={closeModalTransition}
            >
                <FontAwesomeIcon
                    icon={faTimes as IconProp}
                    className="fa-2x"
                />
            </ButtonRPS>
        );
    };

    // Transition
    const durationMS = 500;
    const defaultClass = 'transition-transform duration-[500ms] ease-in-out';
    const transitionClasses = {
        unmounted: 'translate-x-full',
        entering: 'translate-x-0',
        entered: 'translate-x-0',
        exiting: 'translate-x-full',
        exited: 'translate-x-full',
    };

    return (
        <Transition
            in={inProp}
            timeout={durationMS}
            onExited={() => onClose()}
        >
            {(state) => {
                const currentClass = `h-full ${defaultClass} ${transitionClasses[state]}`;
                return (
                    <div
                        className={currentClass}
                    >
                        <div className="flex items-center justify-center h-full">
                            <div className="bg-white h-full w-full md:h-fit md:w-fit flex flex-col items-center justify-between p-10 md:rounded-lg">
                                <div className="w-full mt-10 md:mt-0 flex flex-col md:flex-row items-center justify-between">
                                    <span className="text-dark text-4xl font-bold uppercase">Rules</span>
                                    <div className="hidden md:flex items-center">
                                        {closeModalButton()}
                                    </div>
                                </div>
                                <img
                                    src={rulesImg}
                                    alt="rules"
                                    className="md:mt-14 px-8"
                                />
                                <div className="md:hidden">
                                    {closeModalButton()}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Transition>
    );
};

export default Rules;