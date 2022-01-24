import rulesImg from '@/assets/images/image-rules.svg';
import ButtonRPS from '@/components/RPS/ButtonRPS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MouseEventHandler } from 'react';

const Rules = ({ onClose }: { onClose: MouseEventHandler }) => {
    const closeModalButton = () => {
        return (
            <ButtonRPS
                variant="gray"
                onClick={onClose}
            >
                <FontAwesomeIcon
                    icon={faTimes}
                    className="fa-2x"
                />
            </ButtonRPS>
        );
    };

    return (
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
    );
};

export default Rules;